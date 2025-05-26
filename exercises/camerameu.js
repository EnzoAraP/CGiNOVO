import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";
// import { FirstPersonControls } from '../build/jsm/controls/FirstPersonControls.js';
  import { PointerLockControls } from '../build/jsm/controls/PointerLockControls.js';
let fps, scene, renderer, camera, material, light, orbit; // Initial variables
const speed=20;
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer

material = setDefaultMaterial(); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene

//camera
let camPos  = new THREE.Vector3(3, 4, 8);
let camUp   = new THREE.Vector3(0.0, 1.0, 0.0);
let camLook = new THREE.Vector3(0.0, 0.0, 0.0);

camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.copy(camPos);
   camera.up.copy( camUp );
   camera.lookAt(camLook);
   scene.add(camera);

const textoEsq  = document.getElementById('instructions');
const blocker = document.getElementById('blocker');
const controle = new PointerLockControls (camera,renderer.domElement );

instructions.addEventListener('click', function () {

    controle.lock();

}, false);
controle.addEventListener('lock', function () {
    textoEsq.style.display = 'none';
    blocker.style.display = 'none';
});

controle.addEventListener('unlock', function () {
    blocker.style.display = 'block';
    textoEsq.style.display = '';
});



let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
window.addEventListener('keydown', (event) => MovimentoVerificador(event.keyCode ,true));
window.addEventListener('keyup',(event) => MovimentoVerificador(event.keyCode,false));
function MovimentoVerificador(key,value){
switch(key)
{
  case 87:
    moveForward = value;
  break;
  case 83:
    moveBackward = value;
    break;
  case 65:
    moveLeft = value;
    break;
  case 68:
    moveRight= value;
}
}
function Movimento (delta)
{
  if(moveForward==true)
    {
      controle.moveForward(speed*delta);
  }
  if(moveBackward==true)
  {
       controle.moveForward(speed*-1*delta);
  }
  if(moveLeft==true)
  {
      controle.moveRight(speed*-1*delta);
  }
  if(moveRight==true)
  {
       controle.moveRight(speed*delta);
  }

}
// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );


// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

// create a cube
let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
let cube = new THREE.Mesh(cubeGeometry, material);
// position the cube
cube.position.set(0.0, 2.0, 0.0);
// add the cube to the scene
scene.add(cube);

 //  let controles = new FirstPersonControls();


const clock = new THREE.Clock();
render();
function render()
{
  
  requestAnimationFrame(render);
 // fps.update(0.016);
 console.log(controle.moveForward);
 if( controle.isLocked) {
  Movimento(clock.getDelta());
 }
  renderer.render(scene, camera) // Render scene
  
}