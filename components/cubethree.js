import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.js'
//import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import  {OrbitControls}  from 'https://threejs.org/examples/jsm/controls/OrbitControls.js'
// import {FBXLoader} from "../three.js-master/examples/jsm/loaders/FBXLoader.js"
import {FBXLoader} from '../three.js-master/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";


export default class threeScene extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
<style>



</style>
<canvas id="c"></canvas>`;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.host = this.shadowRoot.host; // use of host might be unnecessary
    this.canvas = this.shadowRoot.querySelector("#c");
  }

  connectedCallback() {
    // fires with constructor is done.
    this.init();
    // this.renderer.render(this.scene, this.camera); // works without animation
    this.renderScene(); // should call this.render every frame
  }

  init() {
    const width = window.innerWidth;
    const height = window.innerHeight * 0.8;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    /////////////////
    //Add Renderer//
    ///////////////
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas:this.canvas });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(width, height);
    ///////////////
    //add Camera//
    /////////////
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      3,
      1000
    );
    this.camera.position.set(90, 90, 40);
    this.camera.up.set(0, 0, 1);
    this.cameras = [];
    this.cameraOrigin = new THREE.Object3D();
    this.cameraOrigin.position.x = 90;
    this.cameraOrigin.position.y = 90;
    this.cameraOrigin.position.z = 40;
    this.cameras.push(this.cameraOrigin);

    ////////////////////
    //controls camera//
    //////////////////
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(25, 25, 0.5);
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
    this.controls.maxPolarAngle = Math.PI * 0.4;
    //////////
    //light//
    ////////
    const pointLight1 = new THREE.HemisphereLight(0xffffff, 0x000000, 0.4);
    const pointLight2 = new THREE.PointLight(0xffffff)
    pointLight2.position.set(25,25,30)
    this.scene.add(pointLight2)

    ////////////
    //helpers//
    //////////
    const axesHelper = new THREE.AxesHelper(200);
    this.scene.add(axesHelper, pointLight1);

    //elements touchables on the scene//
    this.touchables = [];

    
    
    //global variables for the enviroment//
    var iterable = undefined;
    let mixer;
    let loading;
    this.textEmergent = '1'
    this.count = 0
    /////////////////
    //call methods//
    ///////////////
    
    
    this.addModels();
    this.loaders();
    this.customModels()
  }
  customModels() {
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf', gltf => {
      const root = gltf.scene
      root.scale.setScalar(0.03)
      root.position.set(45,19,4)
      root.rotation.x = 1.55
      this.scene.add(root)
    })
  }
  loaders() {
    let loader = new FBXLoader();
    loader.load(
      '../components/3dmodels/Walking (8).fbx',
      (obj) => {
		 obj.scale.setScalar(0.05);
		 console.log(obj);

         this.mixer = new THREE.AnimationMixer(obj);

         const action = this.mixer.clipAction(obj.animations[0]);
         action.play();

         obj.traverse(function (child) {
           if (child.isMesh) {
             child.castShadow = true;
             child.receiveShadow = true;
           }
         });

         this.scene.add(obj);
         obj.position.y = 47;
         obj.position.x = 47;
         obj.position.z = 0.5;
         obj.rotation.x = 1.55;
         obj.oldValue = 0.01;
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addModels() {
    const geometryPlane = new THREE.BoxGeometry(50, 50, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aacc });
    const plane = new THREE.Mesh(geometryPlane, material);

    const geometryBox = new THREE.BoxGeometry(10, 10, 10);
    this.beefeater = new THREE.Mesh(geometryBox, material);
    this.light = new THREE.Mesh(geometryBox);

    this.scene.add( this.beefeater, this.light);
    plane.position.y = 25;
    plane.position.x = 25;
    this.beefeater.position.x = 10;
    this.beefeater.position.y = 10;
    this.beefeater.position.z = 10;

    this.beefeater.oldRotation = {
      x: 0,
      y: 0,
      z: 0,
    };
    this.beefeater.oldPosition = {
      x: 10,
      y: 10,
      z: 10,
    };

    this.light.position.x = 40;
    this.light.position.y = 40;
    this.light.position.z = 10;
    this.light.oldRotation = {
      x: 0,
      y: 0,
      z: 0,
    };
    this.light.oldPosition = {
      x: 40,
      y: 40,
      z: 10,
    };

    //add elements to touchables array//
    this.touchables.push(this.beefeater, this.light);
  }

  
  animate = () => {
    this.renderScene();
    this.controls.update();
    this.frameId = window.requestAnimationFrame(this.animate);

    //parte de tocables//

    // if ( true) {
    //   //esta es la parte del texto a refactorizar//
    //   // this.textEmergent = 'beefeater'
    //   // if(this.count < 1) {
    //   //   console.log('hola');
    //   //   this.addText(this.textEmergent)
    //   // }
    //   // this.count += 1

    //   //hasta aqui la parte del texto//

    //   const distanceFromCamera = 30; // 3 units
    //   const target = new THREE.Vector3(+10, 0, -distanceFromCamera);
    //   target.applyMatrix4(this.camera.matrixWorld);
    //   const moveSpeed = 1;
    //   const distance = this.beefeater.position.distanceTo(target);

    //   const distanceToCamera = this.camera.position.distanceTo(
    //     this.cameraOrigin
    //   );

    //   if (distance > 0) {
    //     const amount = Math.min(moveSpeed, distance) / distance;
    //     this.beefeater.position.lerp(target, amount);
    //     this.beefeater.rotation.x = this.camera.rotation.x;
    //     this.beefeater.rotation.y = this.camera.rotation.y;
    //     this.beefeater.rotation.z = this.camera.rotation.z;

    //     this.camera.position.lerp(
    //       this.cameras[0].getWorldPosition(new THREE.Vector3()),
    //       0.05
    //     );

    //     this.controls.enabled = false;
    //   }
    // }

    // if (false) {
    //   //this.scene.remove(this.textMesh)
    //   this.count = 0
    //     const target = new THREE.Vector3(
    //     this.beefeater.oldPosition.x,
    //     this.beefeater.oldPosition.y,
    //     this.beefeater.oldPosition.z
    //   );
    //   const moveSpeed = 1;
    //   const distance = this.beefeater.position.distanceTo(target);
    //   if (distance > 0) {
    //     const amount = Math.min(moveSpeed, distance) / distance;
    //     this.beefeater.position.lerp(target, amount);
    //     this.beefeater.rotation.x = this.beefeater.oldRotation.x;
    //     this.beefeater.rotation.y = this.beefeater.oldRotation.y;
    //     this.beefeater.rotation.z = this.beefeater.oldRotation.z;
    //     this.controls.enabled = true;
    //   }
    // }

    //person movements//
    const delta = this.clock.getDelta();
    if (this.mixer) {
		console.log('hola que tal soy el mixer ');
      this.mixer.update(delta);

      this.mixer._root.oldValue += 0.003;

    //   if (this.mixer._root.oldValue) {
    //     this.mixer._root.position.x =
    //       20 * Math.sin(this.mixer._root.oldValue) + 25;
    //     this.mixer._root.position.y =
    //       20 * Math.cos(this.mixer._root.oldValue) + 25;
    //     this.mixer._root.rotation.y = Math.cos(this.mixer._root.oldValue);
    //   }
    }
  };
 

  renderScene() {
	requestAnimationFrame(() => this.renderScene());
	this.controls.update();

	const delta = this.clock.getDelta();
    if (this.mixer) {
		
      this.mixer.update(delta);

      this.mixer._root.oldValue += 0.003;

      if (this.mixer._root.oldValue) {
        this.mixer._root.position.x =
          20 * Math.sin(this.mixer._root.oldValue) + 25;
        this.mixer._root.position.y =
          20 * Math.cos(this.mixer._root.oldValue) + 25;
        this.mixer._root.rotation.y = Math.cos(this.mixer._root.oldValue);
      }
    }

    

    

    this.renderer.render(this.scene, this.camera);
  }
}

customElements.define("three-scene", threeScene);
