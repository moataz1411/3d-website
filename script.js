import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
function createModel(containerId, modelPath, scale, cameraZ) {
const scene = new THREE.Scene();
const container = document.getElementById(containerId);
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

let object;
let controls
let objToRender=modelPath;
const loader=new GLTFLoader();
loader.load(modelPath, function(gltf) {
    object = gltf.scene;
    object.scale.set(scale, scale, scale);
    scene.add(object);
},
function(xhr){
    console.log((xhr.loaded/xhr.total*100)+'% loaded');
},
function(error){
    console.error(error);
});
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(container.clientWidth, container.clientHeight);

container.appendChild(renderer.domElement);
camera.position.z = cameraZ;
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);
let mousex = 0, mousey = 0;
window.addEventListener("mousemove", (e) => {
    mousex = e.clientX;
    mousey = e.clientY;
});
function animate() {
    requestAnimationFrame(animate);
    if (object){
        object.rotation.y =-3+mousex/window.innerWidth*3;
        object.rotation.x =-1.2+mousey * 2.5/window.innerHeight;
    }
    renderer.render(scene, camera);
}
window.addEventListener("resize", function() {
    const container = document.getElementById(containerId);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
animate();
}

createModel("container3d", "models/hollow knight.glb", 0.6, 5);
createModel("container3d2", "models/hornet.glb", 0.005, 4);
createModel("container3d3", "models/grimm.glb", 0.0009, 4);
