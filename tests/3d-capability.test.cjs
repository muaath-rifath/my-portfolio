const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(
  readFileSync(require.resolve('../hooks/use-3d-capability.ts'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;

function mount({ renderer = 'ANGLE (Intel UHD Graphics)', reduced = false, missing = false, throws = false, debug = true } = {}) {
  const result = { supported: null, probes: 0, released: 0 };
  let listener;
  let cleanup;
  const media = {
    matches: reduced,
    addEventListener: (_, callback) => { listener = callback; },
    removeEventListener: (_, callback) => { assert.equal(callback, listener); listener = null; },
  };
  const context = {
    RENDERER: 1,
    getParameter: () => renderer,
    getExtension: name => name === 'WEBGL_lose_context'
      ? { loseContext: () => { result.released++; } }
      : debug ? { UNMASKED_RENDERER_WEBGL: 2 } : null,
  };
  const sandbox = {
    exports: {},
    require: () => ({
      useState: () => [null, value => { result.supported = value; }],
      useEffect: effect => { cleanup = effect(); },
    }),
    window: { matchMedia: () => media },
    document: { createElement: () => ({ getContext: (type, options) => {
      result.probes++;
      assert.equal(type, 'webgl2');
      assert.equal(options.failIfMajorPerformanceCaveat, true);
      if (throws) throw new Error('WebGL unavailable');
      return missing ? null : context;
    } }) },
  };
  vm.runInNewContext(source, sandbox);
  sandbox.exports.use3dCapability();
  return { result, change: value => { media.matches = value; listener(); }, unmount: () => { cleanup(); assert.equal(listener, null); } };
}

test('hardware rendering remains enabled and the probe is released', () => {
  const hook = mount();
  assert.deepEqual(hook.result, { supported: true, probes: 1, released: 1 });
  hook.change(true);
  assert.equal(hook.result.supported, false);
  hook.change(false);
  assert.equal(hook.result.supported, true);
  assert.equal(hook.result.probes, 1);
  hook.unmount();
});

for (const renderer of ['ANGLE (Google, Vulkan (SwiftShader Device))', 'llvmpipe', 'softpipe', 'Software Rasterizer', 'Software Renderer', 'Microsoft Basic Render Driver']) {
  test(`retains poster for ${renderer}`, () => {
    const hook = mount({ renderer });
    assert.equal(hook.result.supported, false);
    assert.equal(hook.result.released, 1);
    hook.unmount();
  });
}

test('reduced motion skips WebGL until motion is enabled', () => {
  const hook = mount({ reduced: true });
  assert.deepEqual(hook.result, { supported: false, probes: 0, released: 0 });
  hook.change(false);
  assert.deepEqual(hook.result, { supported: true, probes: 1, released: 1 });
  hook.unmount();
});

test('missing or throwing WebGL retains the poster', () => {
  for (const options of [{ missing: true }, { throws: true }]) {
    const hook = mount(options);
    assert.equal(hook.result.supported, false);
    hook.unmount();
  }
});

test('privacy restrictions on renderer information do not disable hardware', () => {
  const hook = mount({ debug: false, renderer: 'WebKit WebGL' });
  assert.equal(hook.result.supported, true);
  hook.unmount();
});
