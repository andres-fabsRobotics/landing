
import {FBXLoader} from "https://cdn.jsdelivr.net/npm/three@0.115.0/examples/jsm/loaders/FBXLoader.js"

// import filepath from "./3dmodels/Walking.fbx";
// import customModelPath from './3dmodels/scene.gltf'
export default class Beefeater extends HTMLElement {
  
  connectedCallback() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    /////////////////
    //Add Renderer//
    ///////////////
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(width, height * 0.85);
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
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.target.set(25, 25, 0.5);
    // this.controls.enablePan = false;
    // this.controls.enableDamping = true;
    // this.controls.maxPolarAngle = Math.PI * 0.4;
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
    this.renderScene();
    this.start();
    this.addModels();
    // this.loaders();
    
    //estados
    // this.touchables.forEach((elm) => {
    //   console.log(elm);
    // });
  }

  ////////////
  //METHODS//
  //////////
  // loaders() {
  //   let loader = new FBXLoader();
  //   loader.load(
  //     './3dmodels/Walking.fbx',
  //     (obj) => {
  //       obj.scale.setScalar(0.08);

  //       this.mixer = new THREE.AnimationMixer(obj);

  //       const action = this.mixer.clipAction(obj.animations[0]);
  //       action.play();

  //       obj.traverse(function (child) {
  //         if (child.isMesh) {
  //           child.castShadow = true;
  //           child.receiveShadow = true;
  //         }
  //       });

  //       this.scene.add(obj);
  //       obj.position.y = 47;
  //       obj.position.x = 47;
  //       obj.position.z = 0.5;
  //       obj.rotation.x = 1.55;
  //       obj.oldValue = 0.01;
  //     },
  //     (xhr) => {
  //       // this.loading = (xhr.loaded / xhr.total) * 100;
  //       // this.props.setLoading(this.loading);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
  addModels() {
    const geometryPlane = new THREE.BoxGeometry(50, 50, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aacc });
    const plane = new THREE.Mesh(geometryPlane, material);

    const geometryBox = new THREE.BoxGeometry(10, 10, 10);
    this.beefeater = new THREE.Mesh(geometryBox, material);
    this.light = new THREE.Mesh(geometryBox);

    this.scene.add(plane, this.beefeater, this.light);
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

  addText(text) {
    const loader = new THREE.FontLoader();
    const font = loader.parse(helveticaRegular);
    const textGeometry = new THREE.TextGeometry(text, {
      font: font,
      size: 10,
      height: 1,
      curveSegments: 20,
    });
    const textMaterial = new THREE.MeshBasicMaterial( { color: 0xF00000 } );
    this.textMesh = new THREE.Mesh( textGeometry, textMaterial ); 
    this.textMesh.position.x = 20
    this.textMesh.position.y = 20
    this.textMesh.position.z = 20
    this.textMesh.rotation.x = 1.3
    this.textMesh.rotation.y = 1.3
    this.scene.add(this.textMesh);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

 
  animate = () => {
    this.renderScene();
    //this.controls.update();
    this.frameId = window.requestAnimationFrame(this.animate);

    //parte de tocables//

    // if (this.props.stateBeefeater === true) {
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

    // if (this.props.stateBeefeater === false) {
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
  };

  renderScene = () => {
    console.log(232323);
    if (this.renderer) {
      this.renderer.render(this.scene, this.camera)
    }
  //   if (this.props.loading === 100)
  if(this.mount) this.mount.appendChild(this.renderer.domElement);
   };
  render () {
    if (this.loading === 100) {
      return (
        this.innerHTML = `
        <style>
         
        </style>
        <>
        <div
          ref={(mount) => {
            this.mount = mount;
          }}
        ></div>
        <h1>hola que tal </h1>
      </>
        `
        
      );
    } else {
      return (
        this.innerHTML=`
        
        <h1>Cargando: {parseFloat(this.loading).toFixed(0)}%</h1>;
        `

      ) 
    }

  }
  }
  
  window.customElements.define("three-app", Beefeater);