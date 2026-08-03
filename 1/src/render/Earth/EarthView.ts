// Earth view: stylized sphere with day/night terminator and persistent damage layer.

import {
  Mesh,
  SphereGeometry,
  MeshStandardMaterial,
  RingGeometry,
  Group,
  DoubleSide,
  ShaderMaterial,
} from 'three';
import { effect } from '@preact/signals-core';
import type { EarthState } from '../../state/types.js';
import { Env } from '../../app/Env.js';

export class EarthView {
  readonly group: Group;
  private planet: Mesh;
  private atmosphere: Mesh;
  private damageLayer: Mesh;
  private shieldOverlay: Group;
  private readonly state: EarthState;

  constructor(state: EarthState) {
    this.state = state;
    this.group = new Group();
    this.group.position.set(0, -Env.EARTH_RADIUS * 0.5, -2);

    // Planet body
    const planetGeo = new SphereGeometry(Env.EARTH_RADIUS, 64, 32);
    const planetMat = new MeshStandardMaterial({
      color: '#1a4a6e',
      roughness: 0.85,
      metalness: 0.0,
      emissive: '#0a1a2a',
      emissiveIntensity: 0.2,
    });
    this.planet = new Mesh(planetGeo, planetMat);
    this.group.add(this.planet);

    // Atmosphere rim
    const atmoGeo = new SphereGeometry(Env.EARTH_RADIUS * 1.05, 64, 32);
    const atmoMat = new ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          float fres = pow(1.0 - dot(vNormal, vViewDir), 2.5);
          vec3 col = mix(vec3(0.3, 0.6, 1.0), vec3(0.6, 0.8, 1.0), fres);
          gl_FragColor = vec4(col * fres * 1.5, fres * 0.6);
        }`,
      transparent: true,
      side: DoubleSide,
      depthWrite: false,
    });
    this.atmosphere = new Mesh(atmoGeo, atmoMat);
    this.group.add(this.atmosphere);

    // Damage layer (initially invisible; fades in as integrity drops)
    const damageGeo = new SphereGeometry(Env.EARTH_RADIUS * 1.001, 64, 32);
    const damageMat = new ShaderMaterial({
      uniforms: { uIntegrity: { value: 1.0 }, uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform float uIntegrity;
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
        void main() {
          float t = 1.0 - uIntegrity;
          if (t < 0.01) discard;
          float n = hash(floor(vWorldPos * 8.0));
          float burn = smoothstep(0.4, 1.0, n) * t;
          vec3 col = mix(vec3(0.05, 0.02, 0.0), vec3(1.0, 0.4, 0.1), burn);
          gl_FragColor = vec4(col, burn * 0.7);
        }`,
      transparent: true,
      depthWrite: false,
    });
    this.damageLayer = new Mesh(damageGeo, damageMat);
    this.group.add(this.damageLayer);

    // Shield overlay rings
    this.shieldOverlay = new Group();
    for (let i = 0; i < 4; i++) {
      const ringGeo = new RingGeometry(Env.EARTH_RADIUS * (1.1 + i * 0.05), Env.EARTH_RADIUS * (1.11 + i * 0.05), 64);
      const ringMat = new MeshStandardMaterial({
        color: '#6cffff',
        emissive: '#6cffff',
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0,
        side: DoubleSide,
      });
      const ring = new Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.rotation.y = i * 0.3;
      this.shieldOverlay.add(ring);
    }
    this.group.add(this.shieldOverlay);

    // React to state
    effect(() => {
      const integrity = state.planetaryIntegrity.value / 100;
      const damageMat = this.damageLayer.material as ShaderMaterial;
      damageMat.uniforms['uIntegrity']!.value = integrity;
    });
    effect(() => {
      const atmoMat = this.atmosphere.material as ShaderMaterial;
      atmoMat.uniforms['uTime']!.value = performance.now() / 1000;
      const damageMat = this.damageLayer.material as ShaderMaterial;
      damageMat.uniforms['uTime']!.value = performance.now() / 1000;
    });
  }

  update(_dt: number): void {
    // Ambient rotation
    this.planet.rotation.y += 0.0005;
  }
}