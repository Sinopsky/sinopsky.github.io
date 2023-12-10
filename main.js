import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls} from 'three/addons/controls/OrbitControls.js'


const section = document.querySelector("section.earth");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000 );
let controls;

const loader = new GLTFLoader();
const clouds = new GLTFLoader();
var model;
loader.load(
    'Earthfixed.glb',
    function (gltf){
        model = gltf.scene;
        model.scale.set(1,1,1);
        model.rotation.set(0.7,0,0);
        scene.add(model);

    },
    function(xhr){
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }
    , undefined, function ( error ) {
    
        console.error( error );
    
    } 
)
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
section.appendChild( renderer.domElement );



const directionalLight = new THREE.DirectionalLight(0xffe1b5, 10)
directionalLight.position.set(1, 0, 1) //top-left-ish
directionalLight.castShadow = true;
scene.add(directionalLight);
const ambientLight = new THREE.AmbientLight(0x333333, 10);
scene.add(ambientLight);

camera.position.z = 4;
camera.position.y = 0;
camera.position.x = 0;

function animate() {
    requestAnimationFrame(animate);
    let currentTimeLine =window.innerWidth/90 + window.scrollY / 122;
    model.rotation.y = (3.5 - currentTimeLine);
    //model.rotation.x = 0.7 + currentTimeLine/(18);
    console.log(currentTimeLine);
    model.scale.x = (1 + currentTimeLine/90);
    model.scale.y = (1 + currentTimeLine/90);
    model.scale.z = (1 + currentTimeLine/90);
    renderer.render(scene, camera);
    }
    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        
      });
    
animate();
