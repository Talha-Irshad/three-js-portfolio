import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup




const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 10, 100);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

torus.rotation.y=0.7
// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1, 1, 1 );

// const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(2000).fill().forEach(addStar);

// Background

// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

// Avatar

// const jeffTexture = new THREE.TextureLoader().load('jeff1.png');

// const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));
var textmesh;
const loader = new THREE.FontLoader();
loader.load('/Source Code Pro Light_Regular.json', function (font) {
  const geometry = new THREE.TextGeometry('</>', {
    font: font,
    size: 0.5,
    height: 0.05
  });
  textmesh= new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({
    color:0xffffff,
    wireframe:false
  }))
  scene.add(textmesh)
  textmesh.position.z =-3  
  textmesh.position.x = -0.55 

})


// scene.add(jeff);

// Moon

// const moonTexture = new THREE.TextureLoader().load('moon.jpg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

const moon2 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  })
);

scene.add(moon2);

moon2.position.z = 40;
moon2.position.setX(10);
moon2.position.y=-2;


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.005;
  
  moon2.rotation.x += 0.005;
  moon2.rotation.y += 0.0075;
  moon2.rotation.z += 0.005;

  camera.position.z = t * -0.02;
  camera.position.x = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;

  moon.rotation.x += 0.005;
  moon2.rotation.x += 0.005;
  moon2.rotation.y+=0.003;


  // controls.update();

  renderer.render(scene, camera);
}

animate();

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}