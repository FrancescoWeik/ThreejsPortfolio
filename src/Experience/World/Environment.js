import Experience from '../Experience.js'
import * as THREE from 'three'

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;

        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setSunLight()
        this.setEnvironmentMap()
    }

    setSunLight(){

        /*this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, - 1.25)
        this.scene.add(this.sunLight)
        const directionalLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 0.2);
        this.scene.add(directionalLightHelper);*/
        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.4)
        this.scene.add(this.ambientLight);

        /*this.sunLight = new THREE.DirectionalLight('#ffffff', 0.645)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(1.804, 2.419,-1.515)
        this.sunLight.rotation.set(-0.163, -0.655, 0.083)
        this.scene.add(this.sunLight)
        const directionalLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 0.2);
        this.scene.add(directionalLightHelper);*/
        this.sunLight = new THREE.PointLight('#ffffff', 15)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(0.943, 4.262 ,-0.532)
        this.scene.add(this.sunLight)
        /*const sunLightHelper = new THREE.PointLightHelper(this.sunLight, 0.2);
        this.scene.add(sunLightHelper);*/

        this.bellLight = new THREE.PointLight("#b68715", 10)
        this.bellLight.position.set(-1.92, 0.5 ,2.27)
        this.scene.add(this.bellLight)
        //const bellLightHelper = new THREE.PointLightHelper(this.bellLight, 0.2);
        //this.scene.add(bellLightHelper);

        const fog = new THREE.Fog('#1c1c1c', 20, 30)
        this.scene.fog = fog;
    }

    setEnvironmentMap(){
        this.environmentMap = {}
        this.environmentMap.intensity = 1
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding

        //this.scene.environment = this.environmentMap.texture;

        this.setEnvironmentMap.updateMaterial = () =>{
            this.scene.traverse((child) => {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
                    //FOR EVERYTHING
                    /*child.material.envMap = this.environmentMap.texture;
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needUpdate=true;*/

                    //ONLY FOR THE BELL
                    if(child.name == "bellSpehere" || child.name == "bellCylinder" || child.name == "bellBody"){
                        child.material.envMap = this.environmentMap.texture;
                        child.material.envMapIntensity = this.environmentMap.intensity
                        child.material.needUpdate=true;
                    }

                    ////
                }
            })
        }

        this.setEnvironmentMap.updateMaterial();

        //Debug
        if(this.debug.active){
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.setEnvironmentMap.updateMaterial)
            
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(-5)
                .max(50)
                .step(0.001)
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(-5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(-5)
                .max(5)
                .step(0.001)
            this.debugFolder
                .add(this.sunLight.rotation, 'x')
                .name('sunLightRotX')
                .min(-5)
                .max(5)
                .step(0.001)
            this.debugFolder
                .add(this.sunLight.rotation, 'y')
                .name('sunLightRotY')
                .min(-5)
                .max(5)
                .step(0.001)
            this.debugFolder
                .add(this.sunLight.rotation, 'z')
                .name('sunLightRotZ')
                .min(-5)
                .max(5)
                .step(0.001)
            this.debugFolder
                .addColor(this.sunLight, 'color')
                .name('sunLightColor')

            this.debugFolder
                .addColor(this.bellLight, 'color')
                .name('bellLightColor')
        }
    }
}