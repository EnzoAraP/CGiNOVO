import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";
import { ConvexGeometry } from '../build/jsm/geometries/ConvexGeometry.js';

let scene, renderer, camera, material, light, orbit; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.
let numVertice=8;
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
//scene.add(cube);
function PointLocation()
{
  var points = [];
  var point1 = new  THREE.Vector3(0,0,0);//x,y,z
  points.push(point1);
  var point2 = new  THREE.Vector3(0,4,0);//x,y,z
  points.push(point2);
  var point3 = new  THREE.Vector3(4,0,0);//x,y,z
  points.push(point3);
  var point4 = new  THREE.Vector3(4,4,0);//x,y,z
  points.push(point4);
  var point5 = new  THREE.Vector3(0,4,4);//x,y,z
  points.push(point5);
  var point6 = new  THREE.Vector3(4,4,4);//x,y,z
  points.push(point6);
  var point7 = new  THREE.Vector3(0,0,8);//x,y,z
  points.push(point7);
  var point8 = new  THREE.Vector3(4,0,8);//x,y,z
  points.push(point8);

  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,0)"});
  
    var pointCloud = new THREE.Object3D();
    points.forEach(function (point) {
      var spGeom = new THREE.SphereGeometry(0.2);
      var spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.set(point.x, point.y, point.z);
      pointCloud.add(spMesh);
    });
  
    scene.add(pointCloud);
  return points;
}
function Convexo()
{
  var points = PointLocation();
  let convexGeometry = new ConvexGeometry(points);
  let objeto = new THREE.Mesh(convexGeometry,material);
  scene.add(objeto);
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

Convexo();
render();
function render()
{
  requestAnimationFrame(render);
 
  renderer.render(scene, camera) // Render scene
}