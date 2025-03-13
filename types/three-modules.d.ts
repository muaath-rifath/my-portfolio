import * as THREE from 'three';

declare module 'three/examples/jsm/controls/OrbitControls.js' {
  export class OrbitControls {
    constructor(camera: THREE.Camera, domElement: HTMLElement);
    enableDamping: boolean;
    dampingFactor: number;
    rotateSpeed: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    enableZoom: boolean;
    update(): void;
    dispose(): void;
  }
}

declare module 'three/examples/jsm/loaders/FontLoader.js' {
  export class FontLoader {
    constructor();
    load(url: string, onLoad: (font: any) => void): void;
  }
}

declare module 'three/examples/jsm/geometries/TextGeometry.js' {
  export class TextGeometry extends THREE.ExtrudeGeometry {
    constructor(text: string, parameters: {
      font: any;
      size?: number;
      height?: number;
      curveSegments?: number;
      bevelEnabled?: boolean;
      bevelThickness?: number;
      bevelSize?: number;
      bevelOffset?: number;
      bevelSegments?: number;
    });
  }
}
