// importing three js
import * as THREE from 'three';
// importing the model loader
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// importing the orbit controller
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { VRButton } from 'three/addons/webxr/VRButton.js';

// setting up the scene
const scene = new THREE.Scene();
// setting up the camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
// positioning the camera
camera.position.z = 10;
// creating a renderer object
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;
// importing the model
const loader = new GLTFLoader();
let model;
loader.load('human_heart.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.rotation.set(0, 0, 0);

    // Enable OrbitControls for model interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', () => {
        renderer.render(scene, camera);
    });
}, undefined, function (err) {
    console.error('Error loading model', err);
});
// adding ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.09); // Adjust the intensity as needed
scene.add(ambientLight);
// setting up the lighting
const light = new THREE.DirectionalLight(0xffffff, 0.4);
light.position.set(0, 0, 1);
scene.add(light);
const backLight = new THREE.PointLight(0xffffff, 4);
backLight.position.set(0, 0, -5); // Adjust the position as needed

scene.add(backLight);

// animation rendering
function animate() {
    renderer.setAnimationLoop( function () {

        renderer.render( scene, camera );
    
    } );
    if (model) {
        model.rotation.x += rotationSpeed;
        model.rotation.y += rotationSpeed;
    }
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
})

animate();
