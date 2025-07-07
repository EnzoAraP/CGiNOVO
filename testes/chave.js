import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";
import { CSG } from '../libs/other/CSGMesh.js'  
let scene, renderer, camera, material, light, orbit; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);


{//A partir daqui pegar
let pi =Math.PI;

// create a cube
let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
let cube = new THREE.Mesh(cubeGeometry, material);
let CilindroGeometry = new THREE.CylinderGeometry(1,1,20,20,20);
let cilindro1 = new THREE.Mesh(CilindroGeometry, material);
let cilindro2 = new THREE.Mesh(CilindroGeometry, material);
let cilindro3 = new THREE.Mesh(CilindroGeometry, material);
cilindro1.position.set(0.0,0.0,0.0);
cilindro2.position.set(0.0,0.0,0.0);
cilindro3.position.set(0.0,0.0,0.0);
cube.position.set(0.0,2.0,0.0);
cilindro2.rotateX(pi/2);
cilindro3.rotateZ(pi/2);
cilindro1.matrixAutoUpdate = false;
cilindro1.updateMatrix();
cilindro2.matrixAutoUpdate = false;
cilindro2.updateMatrix();
cilindro3.matrixAutoUpdate = false;
cilindro3.updateMatrix();

let cilindro1CSG = CSG.fromMesh(cilindro1);
let cilindro2CSG = CSG.fromMesh(cilindro2);
let cilindro3CSG = CSG.fromMesh(cilindro3);
let cuboCSG = CSG.fromMesh(cube);



// position the cube

// add the cube to the scene
let FirstCSG = cuboCSG.subtract(cilindro1CSG);
let SecondCSG = FirstCSG.subtract(cilindro2CSG);
let LastCSG = SecondCSG.subtract(cilindro3CSG);
 let acabou = CSG.toMesh(LastCSG, new THREE.Matrix4());
 acabou.material = new THREE.MeshPhongMaterial({
  color: 'green'
 }) 
 //scene.add(cilindro2);
 acabou.position.set(0.0,2.0,0.0);
scene.add(acabou);
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