'use client';

import { lightModelPalette } from '@/lib/model-palette';

import { useLayoutEffect, useMemo, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDarkMode } from '@/hooks/useDarkMode';

type Device = 'laptop' | 'phone' | 'tablet';

/** A single opaque display surface keeps detailed UI free of depth fighting. */
export default function DeviceScreen({ device, width, height, radius = 0.5, position }: {
    device: Device; width: number; height: number; radius?: number; position: [number, number, number];
}) {
    const dark = useDarkMode();
    const material = useRef<THREE.MeshBasicMaterial>(null);
    const { gl, invalidate } = useThree();
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        const x = -width / 2, y = -height / 2, r = Math.min(radius, width / 2, height / 2);
        s.moveTo(x + r, y); s.lineTo(x + width - r, y);
        s.quadraticCurveTo(x + width, y, x + width, y + r);
        s.lineTo(x + width, y + height - r); s.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
        s.lineTo(x + r, y + height); s.quadraticCurveTo(x, y + height, x, y + height - r);
        s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
        return s;
    }, [width, height, radius]);

    useLayoutEffect(() => {
        const texture = drawDashboard(device, dark, width / height);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
        const target = material.current;
        if (target) { target.map = texture; target.needsUpdate = true; }
        invalidate();
        return () => { if (target) target.map = null; texture.dispose(); };
    }, [device, dark, width, height, gl, invalidate]);

    return <mesh name={`${device}-dashboard`} position={position}>
        <shapeGeometry args={[shape]} onUpdate={geometry => {
            const vertices = geometry.attributes.position;
            const uv = geometry.attributes.uv;
            for (let i = 0; i < vertices.count; i++) uv.setXY(i, vertices.getX(i) / width + 0.5, vertices.getY(i) / height + 0.5);
            uv.needsUpdate = true;
        }} />
        <meshBasicMaterial ref={material} color="white" toneMapped={false} />
    </mesh>;
}

/** Draw once per theme change; no network fonts or per-frame canvas uploads. */
function drawDashboard(device: Device, dark: boolean, aspect: number) {
    const canvas = document.createElement('canvas');
    canvas.width = device === 'laptop' ? 1536 : 1024;
    canvas.height = Math.round(canvas.width / aspect);
    const c = canvas.getContext('2d')!;
    // Design coordinates keep type and strokes consistent at every texture size.
    const W = device === 'laptop' ? 1200 : 760;
    const H = W / aspect;
    c.scale(canvas.width / W, canvas.width / W);
    const p = dark
        ? { bg: '#102019', card: '#1c3025', raised: '#263e30', border: '#395644', text: '#e8f7e9', muted: '#9bb8a5', accent: '#7ce6a5', secondary: '#88cddd', amber: '#e5c77a' }
        : { bg: lightModelPalette.screen, card: lightModelPalette.screenCard, raised: lightModelPalette.screenRaised, border: '#bacfc0', text: '#163b29', muted: '#597767', accent: lightModelPalette.accent, secondary: lightModelPalette.secondary, amber: '#9a742b' };
    const rect = (x: number, y: number, w: number, h: number, fill: string, r = 12) => {
        c.beginPath(); c.roundRect(x, y, w, h, r); c.fillStyle = fill; c.fill();
    };
    const text = (value: string, x: number, y: number, size = 18, color = p.text, weight = 500) => {
        c.fillStyle = color; c.font = `${weight} ${size}px sans-serif`; c.fillText(value, x, y);
    };
    const line = (x: number, y: number, x2: number, y2: number, color = p.border, width = 1) => {
        c.beginPath(); c.moveTo(x, y); c.lineTo(x2, y2); c.strokeStyle = color; c.lineWidth = width; c.stroke();
    };
    const dot = (x: number, y: number, color = p.accent, radius = 5) => {
        c.beginPath(); c.arc(x, y, radius, 0, Math.PI * 2); c.fillStyle = color; c.fill();
    };
    const badge = (label: string, x: number, y: number, w = 108) => {
        rect(x, y, w, 30, p.raised, 15); dot(x + 14, y + 15, p.accent, 3); text(label, x + 25, y + 21, 13, p.accent, 600);
    };
    const chart = (x: number, y: number, w: number, h: number, seed = 0, color = p.accent) => {
        for (let i = 0; i < 4; i++) line(x, y + h * i / 3, x + w, y + h * i / 3);
        const points = Array.from({ length: 32 }, (_, i) => [x + i * w / 31, y + h * (0.48 + Math.sin(i * 0.62 + seed) * 0.16 + Math.cos(i * 1.8 + seed) * 0.1 - i * 0.004)]);
        c.beginPath(); c.moveTo(x, y + h); points.forEach(([px, py]) => c.lineTo(px, py)); c.lineTo(x + w, y + h); c.closePath();
        c.fillStyle = color; c.globalAlpha = 0.1; c.fill(); c.globalAlpha = 1;
        c.beginPath(); points.forEach(([px, py], i) => i ? c.lineTo(px, py) : c.moveTo(px, py)); c.strokeStyle = color; c.lineWidth = 3; c.stroke();
        dot(points[31][0], points[31][1], color, 4);
    };
    const metric = (label: string, value: string, note: string, x: number, y: number, w: number, h = 130, seed = 1) => {
        rect(x, y, w, h, p.card); text(label, x + 18, y + 28, 15, p.muted);
        text(value, x + 18, y + 67, 32, p.text, 650); text(note, x + 18, y + 93, 12, p.accent);
        if (h > 145) chart(x + 18, y + 116, w - 36, h - 137, seed);
        else { line(x + 18, y + h - 16, x + w - 18, y + h - 16, p.raised, 5); line(x + 18, y + h - 16, x + w * 0.65, y + h - 16, p.accent, 5); }
    };
    rect(0, 0, W, H, p.bg, 0);

    if (device === 'laptop') {
        rect(0, 0, W, 45, p.raised, 0);
        ['#bf7e75', p.amber, p.accent].forEach((color, i) => dot(22 + i * 19, 22, color, 5));
        text('SYSTEM MONITOR', 100, 29, 13, p.muted, 600); text('workspace / production', W - 245, 29, 13, p.muted);
        rect(0, 45, 174, H - 45, p.card, 0); text('MR / LAB', 22, 93, 22, p.accent, 700);
        ['Overview', 'Compute', 'Network', 'Services', 'Activity'].forEach((label, i) => {
            if (!i) rect(12, 125 + i * 48, 150, 38, p.raised, 7);
            text(label, 30, 150 + i * 48, 17, i ? p.muted : p.accent, i ? 500 : 650);
        });
        dot(29, H - 40); text('All systems online', 43, H - 34, 12, p.muted);
        const x = 198, available = W - x - 24, gap = 14, mw = (available - gap * 3) / 4;
        text('Infrastructure overview', x, 97, 30, p.text, 650); text('Performance across your connected services', x, 126, 15, p.muted);
        badge('HEALTHY', W - 139, 74, 114);
        [['CPU usage', '24.8%', '8 cores / 16 threads'], ['Memory', '6.4 GB', 'of 16 GB allocated'], ['Network', '128 Mb/s', 'Inbound + outbound'], ['Uptime', '14d 06h', '99.98% availability']].forEach((m, i) => metric(m[0], m[1], m[2], x + i * (mw + gap), 151, mw));
        const cy = 298, ch = H * 0.32, cw = available * 0.62;
        rect(x, cy, cw, ch, p.card); text('Network throughput', x + 20, cy + 32, 20, p.text, 600);
        text('LAST 24 HOURS', x + cw - 136, cy + 31, 12, p.muted);
        chart(x + 28, cy + 60, cw - 56, ch - 103, 2); text('00:00', x + 24, cy + ch - 17, 12, p.muted); text('12:00', x + cw / 2, cy + ch - 17, 12, p.muted); text('23:59', x + cw - 62, cy + ch - 17, 12, p.muted);
        const rx = x + cw + gap, rw = available - cw - gap;
        rect(rx, cy, rw, ch, p.card); text('Service health', rx + 20, cy + 32, 20, p.text, 600);
        ['API gateway', 'MQTT broker', 'PostgreSQL', 'Edge workers'].forEach((label, i) => { const y = cy + 72 + i * 37; dot(rx + 23, y - 5); text(label, rx + 37, y, 15); text(['12 ms', '8 ms', '4 ms', '18 ms'][i], rx + rw - 62, y, 13, p.muted); });
        const ty = cy + ch + 16;
        rect(x, ty, available, H - ty - 25, p.card); text('Recent deployments', x + 20, ty + 32, 20, p.text, 600);
        ['api-gateway', 'sensor-ingest', 'web-client'].forEach((label, i) => { const y = ty + 66 + i * 34; if (y > H - 35) return; line(x + 20, y - 19, W - 45, y - 19); text(label, x + 20, y, 15); text(['v2.8.1', 'v1.4.0', 'v3.2.6'][i], x + 252, y, 14, p.muted); text('Deployed', x + 420, y, 14, p.accent); text(`${i * 12 + 2} min ago`, W - 135, y, 13, p.muted); });
    } else {
        const phone = device === 'phone', pad = 30, available = W - pad * 2;
        text('09:41', pad + 5, 39, 18, p.text, 650); text('5G', W - 125, 39, 15, p.muted); rect(W - 80, 23, 42, 19, p.border, 5); rect(W - 77, 26, 31, 13, p.accent, 3);
        text(phone ? 'My home' : 'Sensor overview', pad, 105, 38, p.text, 700);
        text(phone ? 'Living spaces, connected.' : 'Building A / environmental telemetry', pad, 139, 18, p.muted);
        badge('CONNECTED', W - 164, 166, 134);
        text(phone ? 'Home  /  Overview' : 'FLOOR 01     FLOOR 02     OUTDOOR', pad, 188, 15, p.accent, 600);
        const mw = (available - 16) / 2;
        metric('Temperature', '23.4°C', 'Comfortable / +0.2° today', pad, 220, mw, 192, 2);
        metric('Humidity', '48%', 'Ideal range / 40–60%', pad + mw + 16, 220, mw, 192, 5);
        const cy = 432, ch = phone ? 245 : 220;
        rect(pad, cy, available, ch, p.card); text(phone ? 'Energy today' : 'Air quality trend', pad + 22, cy + 34, 22, p.text, 650);
        text(phone ? '6.8 kWh' : '412 ppm', pad + 22, cy + 73, 32, p.text, 650); text(phone ? '12% less than yesterday' : 'CO₂ / Good indoor air quality', pad + 220, cy + 69, 14, p.accent);
        chart(pad + 25, cy + 101, available - 50, ch - 137, 4, p.secondary); text('06:00', pad + 24, cy + ch - 14, 12, p.muted); text('12:00', W / 2 - 20, cy + ch - 14, 12, p.muted); text('18:00', W - pad - 63, cy + ch - 14, 12, p.muted);
        let y = cy + ch + 40;
        text(phone ? 'Your devices' : 'Connected sensors', pad, y, 25, p.text, 650); text(phone ? '4 online' : '24 online', W - 116, y, 15, p.accent);
        y += 23;
        const rowH = phone ? 108 : 77;
        const devices = phone ? [['Living room lights', 'Warm white · 72%', 'ON'], ['Climate control', 'Auto · Target 23°C', 'AUTO'], ['Front door', 'Locked · Battery 92%', 'SECURE'], ['Motion sensor', 'Hallway · Last seen 2m ago', 'ONLINE']] : [['PIR / Entrance', 'Motion · Updated just now', 'ACTIVE'], ['Temp / Room 201', '23.4°C · Battery 98%', 'ONLINE'], ['Air / Meeting room', 'CO₂ 412 ppm · Signal strong', 'ONLINE']];
        devices.forEach(([label, note, status], i) => { const ry = y + i * (rowH + 12); rect(pad, ry, available, rowH, p.card); rect(pad + 16, ry + 20, 40, 40, p.raised, 10); dot(pad + 36, ry + 40, p.accent, 8); text(label, pad + 73, ry + 34, 20, p.text, 600); text(note, pad + 73, ry + 61, 14, p.muted); badge(status, W - pad - 119, ry + 23, 101); });
        const bottom = H - 89;
        line(pad, bottom, W - pad, bottom);
        ['Overview', phone ? 'Rooms' : 'Sensors', 'Activity', 'Settings'].forEach((label, i) => { const x = pad + i * available / 4 + 12; dot(x + 26, bottom + 26, i ? p.muted : p.accent, 5); text(label, x, bottom + 55, 14, i ? p.muted : p.accent); });
        if (phone) rect(W / 2 - 85, H - 15, 170, 5, p.muted, 3);
    }
    return new THREE.CanvasTexture(canvas);
}
