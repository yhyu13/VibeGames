import * as THREE from "three";

export interface RendererHandle {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  render(): void;
  resize(): void;
  dispose(): void;
}

export function createRenderer(container: HTMLElement): RendererHandle {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x03040a);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 500);
  camera.position.set(0, 8, 38);

  const sun = new THREE.DirectionalLight(0xfff2d8, 2.4);
  sun.position.set(40, 30, 20);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  scene.add(sun);

  const ambient = new THREE.AmbientLight(0x223344, 0.6);
  scene.add(ambient);

  const rim = new THREE.DirectionalLight(0x88aaff, 0.5);
  rim.position.set(-30, -10, -20);
  scene.add(rim);

  const handle: RendererHandle = {
    renderer,
    scene,
    camera,
    render: () => renderer.render(scene, camera),
    resize: () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    },
    dispose: () => {
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
  handle.resize();
  return handle;
}
