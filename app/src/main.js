import * as THREE from 'three';

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Geometry and Material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Keyboard controls
const keys = { w: false, a: false, s: false, d: false };
const speed = 0.1;

document.addEventListener('keydown', (event) => {
  if (event.key in keys) keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  if (event.key in keys) keys[event.key] = false;
});

// Mouse controls
let isMouseDown = false;
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousedown', () => {
  isMouseDown = true;
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

document.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    const deltaX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const deltaY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    camera.rotation.y -= deltaX * 0.002;
    camera.rotation.x -= deltaY * 0.002;

    // Clamp the vertical rotation to prevent flipping
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
  }
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Move camera based on keys
  if (keys.w) camera.position.z -= speed;
  if (keys.s) camera.position.z += speed;
  if (keys.a) camera.position.x -= speed;
  if (keys.d) camera.position.x += speed;

  renderer.render(scene, camera);
}

animate();