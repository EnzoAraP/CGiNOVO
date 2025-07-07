import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";

let scene, renderer, camera, material, light, orbit; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.
{
let cor = new THREE.Color(237/255,232/255,208/255);
let materialinvi= new THREE.MeshBasicMaterial({
  color: cor
});

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20) 
scene.add(plane);
let pi =Math.PI;
// create a cube
let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
let cube = new THREE.Mesh(cubeGeometry, material);
let cilindroGeometry = new THREE.CylinderGeometry(3,3,20,20,20);
let cilindro= new THREE.Mesh(cilindroGeometry,materialinvi);
let coneaGeometry = new THREE.ConeGeometry(5,5,20,20);
let cone1 = new THREE.Mesh(coneaGeometry,materialinvi);
let cone2 = new THREE.Mesh(coneaGeometry,materialinvi);

cilindro.position.set(0.0, 12.0, 0.0);
cilindro.add(cone1);
cilindro.add(cone2);

cone2.rotateX(pi);
cone1.position.set(0,-9.5,0);
cone2.position.set(0,9.5,0);
// add the cube to the scene
scene.add(cilindro);
}
// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");
  controls.add("* Left button to rotate");
  controls.add("* Right button to translate (pan)");
  controls.add("* Scroll to zoom in/out.");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}