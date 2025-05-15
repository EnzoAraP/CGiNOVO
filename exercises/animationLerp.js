import * as THREE from 'three';
import GUI from '../libs/util/dat.gui.module.js'
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initDefaultSpotlight,
        initCamera,
        createGroundPlane,
        onWindowResize} from "../libs/util/util.js";

let scene    = new THREE.Scene();    // Create main scene
let renderer = initRenderer();    // View function in util/utils
let light    = initDefaultSpotlight(scene, new THREE.Vector3(7.0, 7.0, 7.0), 300); 
let camera   = initCamera(new THREE.Vector3(3.6, 4.6, 8.2)); // Init camera in this position
let trackballControls = new TrackballControls(camera, renderer.domElement );

// Show axes 
let axesHelper = new THREE.AxesHelper( 5 );
  axesHelper.translateY(0.1);
scene.add( axesHelper );

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

let groundPlane = createGroundPlane(10, 10, 40, 40); // width, height, resolutionW, resolutionH
  groundPlane.rotateX(THREE.MathUtils.degToRad(-90));
scene.add(groundPlane);

// Create sphere
let geometry = new THREE.SphereGeometry( 0.2, 32, 16 );
let material = new THREE.MeshPhongMaterial({color:"red", shininess:"200"});
let bola1 = new THREE.Mesh(geometry, material);
let bola2 = new THREE.Mesh(geometry,material);
  bola1.castShadow = true;
  bola1.position.set(4, 0.2,0.5);
  bola2.position.set(4, 0.2,-0.5 );
scene.add(bola1);
scene.add(bola2);

// Variables that will be used for linear interpolation
const lerpConfig1 = {
  destination: new THREE.Vector3(-2.0, 0.2, 0.5),
  alpha: -0.05,
  bola1: true,
  reset: false
}
const lerpConfig2 = {
  destination: new THREE.Vector3(-2.0, 0.2, -0.5),
  alpha: -0.02,
  bola2: true,
  reset: false
}

buildInterface();
render();

function buildInterface()
{     
  var controls= new function(){
    this.reset = function(){
      bola1.position.set(4, 0.2, 0.5);
      bola2.position.set(4, 0.2, -0.5);
    };
  };
  let gui = new GUI();
  let folder = gui.addFolder("Lerp Options");
    folder.open();
    
    folder.add(lerpConfig1, "bola1",  true)
          .name("bola1");
          folder.add(lerpConfig2, "bola2",  true)
          .name("bola2");
    gui.add(controls, "reset",true)
          .name("Reset");
    
          
}

function render()
{
  trackballControls.update();

 // if(lerpConfig1.bola1) bola1.position.lerp(lerpConfig1.destination, lerpConfig1.alpha);
  if(lerpConfig1.bola1 && bola1.position.x>lerpConfig1.destination.x)
{
bola1.translateX(lerpConfig1.alpha);
}
//if(lerpConfig1.bola1 && bola1.position.x>lerpConfig1.destination.x) bola1.translateX(lerpConfig1.alpha);
 if(lerpConfig2.bola2 && bola2.position.x>lerpConfig2.destination.x)
{
bola2.translateX(lerpConfig2.alpha);
}
  

  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}