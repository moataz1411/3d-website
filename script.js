import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;
let controls
let objToRender='hollow knight';
const loader=new GLTFLoader();
loader.load("models/hollow knight.gltf", function(gltf) {
    object=gltf.scene;
    scene.add(object);
},
function(xhr){
    console.log((xhr.loaded/xhr.total*100)+'% loaded');
},
function(error){
    console.error(error);
});
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3d").appendChild(renderer.domElement);
camera.position.z = objToRender === 'hollow knight' ? 25 : 500;
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);
const ambientLight = new THREE.AmbientLight(0x333333, objToRender === 'hollow knight' ? 5 : 1);
scene.add(ambientLight);
let mousex = 0, mousey = 0;
window.addEventListener("mousemove", (e) => {
    mousex = e.clientX;
    mousey = e.clientY;
});
function animate() {
    requestAnimationFrame(animate);
    if (object&&objToRender === 'hollow knight') {
        object.rotation.y =-3+mousex/window.innerWidth*3;
        object.rotation.x =-1.2+mousey * 2.5/window.innerHeight;
    }
    renderer.render(scene, camera);
}
window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
animate();