import './style.css';
import * as THREE from 'three';
import { PointLightHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const pointLight = new THREE.PointLight(0xffffff); //0x is a hexadecimal literal. It means we are working with hexadecimals.
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff); //Ambient light will light up everything evenly.
scene.add(pointLight, ambientLight);
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"), //We want to use the canvas with the ID of bg (background).
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(500);
camera.position.setX(-3);

const geometry = new THREE.TorusGeometry(6, 0.05, 16, 100); //The vectors that make up an object.
const material = new THREE.MeshStandardMaterial({
    color: 0xFFA500,
}); //The wrapping paper to go around that object.
const torus = new THREE.Mesh(geometry, material) //Geometry + Material
scene.add(torus);
const geometry1 = new THREE.TorusGeometry(6, 0.05, 16, 100); //The vectors that make up an object.
const material1 = new THREE.MeshStandardMaterial({
    color: 0xFF0000,
}); //The wrapping paper to go around that object.
const torus1 = new THREE.Mesh(geometry1, material1) //Geometry + Material
scene.add(torus1);
const geometry2 = new THREE.TorusGeometry(6, 0.05, 16, 100); //The vectors that make up an object.
const material2 = new THREE.MeshStandardMaterial({
    color: 0x00FF00,
}); //The wrapping paper to go around that object.
const torus2 = new THREE.Mesh(geometry2, material2) //Geometry + Material
scene.add(torus2);

//const controls = new OrbitControls(camera, renderer.domElement); //This will listen to dom events on the mouse, and update the camera position accordingly.

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
    });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); //This randomly generates an x, y, and z position value for each star by filling an array with 3 values, then mapping each value to the ThreeJS random float spread function which is a helper function that randomly generates a number between negative and positive arguments, (100 in this case).
    star.position.set(x, y, z);//Then we will take those numbers from above and set it as the position of a star. Then we will add it to the scene.
    scene.add(star);
} //This function populates the layout with stars.
Array(200).fill().forEach(addStar); //This creates an array of 200 elements. For each of these elements, we fill it with a new star which in turn will cause 200 new stars to populate on the scene.

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//Creating my avatar cube
const wesTexture = new THREE.TextureLoader().load('wes.jpg');
const wes = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({
        map: wesTexture,
    })
);
scene.add(wes);

//Creating a moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture, //The normal map will make the surface of the moon look like it has depth.
    })
);
scene.add(moon);
moon.position.z = 10;            //Both of these do
moon.position.setX(-10);         //the same thing!

wes.position.z = -5;
wes.position.x = 2;
wes.position.y = 0.3;

function moveCamera(){
    const t = document.body.getBoundingClientRect().top; //This will get the position on the webpage that the user has already scrolled to. The "top" property will show us exactly how far we are from the top of the webpage.
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    wes.rotation.y += 0.01;
    wes.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0004;
}
document.body.onscroll = moveCamera; //This will make the camera move when we scroll. This is an event handler.
moveCamera();

function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    torus1.rotation.x += 0.005;
    torus1.rotation.y += 0.01;
    torus1.rotation.z += 0.01;
    torus2.rotation.x += 0.01;
    torus2.rotation.y += 0.01;
    torus2.rotation.z += 0.005;

    moon.rotation.x += 0.005;

    //controls.update(); //This is for orbitControls

    renderer.render(scene, camera);
}
animate();






