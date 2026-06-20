import Experience from '../Experience.js'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;

        //Background gradient colors (tweakable from the GUI)
        this.background = {
            top: '#030303',
            middle: '#4a76f9',
            bottom: '#030303'
        }

        this.setLights()
        this.setEnvironmentMap()
        this.setBackground()
        this.setDebug()
    }

    setLights(){
        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.33)
        this.scene.add(this.ambientLight)

        //Half-size of the directional light's shadow frustum (ortho camera).
        //The scene reaches ~x = -8.35 when the card is out, so the default ±5 is too small
        //and cuts the shadows of the ducks that fall outside it.
        this.shadowAreaSize = 11

        this.sunLight = new THREE.DirectionalLight('#ffffff', 1.35)
        this.sunLight.castShadow = true
        this.sunLight.shadow.mapSize.set(2048, 2048)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(-2.2, 5.2, 4.8)
        this.scene.add(this.sunLight)

        this.updateShadowCamera()
    }

    updateShadowCamera(){
        //Widen the ortho frustum so it covers the whole scene (no clipped shadows)
        const cam = this.sunLight.shadow.camera
        const s = this.shadowAreaSize
        cam.left = -s
        cam.right = s
        cam.top = s
        cam.bottom = -s
        cam.near = 0.5
        cam.far = 30
        cam.updateProjectionMatrix()

        if(this.shadowHelper){
            this.shadowHelper.update()
        }
    }

    setEnvironmentMap(){
        //Image-based lighting: a neutral studio environment generated procedurally (no file).
        //It feeds soft light from every direction so white surfaces read white from all angles,
        //killing the flat "grey" look without having to push the light intensities.
        this.envMapIntensity = 0.69

        const renderer = this.experience.renderer.instance
        const pmrem = new THREE.PMREMGenerator(renderer)
        this.environmentMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
        this.scene.environment = this.environmentMap
        pmrem.dispose()

        this.applyEnvMapIntensity()
    }

    applyEnvMapIntensity(){
        //scene.environment has no global intensity, so set it per standard material
        this.scene.traverse((child) => {
            if(child.isMesh && child.material && child.material.isMeshStandardMaterial){
                child.material.envMapIntensity = this.envMapIntensity
                child.material.needsUpdate = true
            }
        })
    }

    setBackground(){
        //A vertical gradient drawn once into a tiny canvas texture: basically free on the GPU
        this.backgroundTexture = this.generateGradientTexture()
        this.scene.background = this.backgroundTexture
    }

    generateGradientTexture(){
        const canvas = document.createElement('canvas')
        //Only the vertical axis needs resolution; 2px wide is enough
        canvas.width = 2
        canvas.height = 512

        const ctx = canvas.getContext('2d')
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, this.background.top)
        gradient.addColorStop(0.5, this.background.middle)
        gradient.addColorStop(1, this.background.bottom)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const texture = new THREE.CanvasTexture(canvas)
        texture.encoding = THREE.sRGBEncoding
        texture.needsUpdate = true
        return texture
    }

    updateBackground(){
        if(this.backgroundTexture){
            this.backgroundTexture.dispose()
        }
        this.backgroundTexture = this.generateGradientTexture()
        this.scene.background = this.backgroundTexture
    }

    setDebug(){
        if(!this.debug.active) return;

        //Background colors
        this.debugFolder = this.debug.ui.addFolder('background')
        this.debugFolder.addColor(this.background, 'top').name('top color').onChange(() => this.updateBackground())
        this.debugFolder.addColor(this.background, 'middle').name('middle color').onChange(() => this.updateBackground())
        this.debugFolder.addColor(this.background, 'bottom').name('bottom color').onChange(() => this.updateBackground())

        //Lights
        this.lightsFolder = this.debug.ui.addFolder('lights')

        this.lightsFolder
            .add(this, 'envMapIntensity')
            .min(0).max(3).step(0.01)
            .name('env map intensity')
            .onChange(() => this.applyEnvMapIntensity())

        this.lightsFolder.add(this.ambientLight, 'intensity').min(0).max(10).step(0.01).name('ambient intensity')
        this.lightsFolder.addColor({ color: this.ambientLight.color.getHex() }, 'color')
            .name('ambient color')
            .onChange((value) => this.ambientLight.color.set(value))

        this.lightsFolder.add(this.sunLight, 'intensity').min(0).max(20).step(0.01).name('sun intensity')
        this.lightsFolder.addColor({ color: this.sunLight.color.getHex() }, 'color')
            .name('sun color')
            .onChange((value) => this.sunLight.color.set(value))
        this.lightsFolder.add(this.sunLight.position, 'x').min(-15).max(15).step(0.1).name('sun x')
        this.lightsFolder.add(this.sunLight.position, 'y').min(-15).max(15).step(0.1).name('sun y')
        this.lightsFolder.add(this.sunLight.position, 'z').min(-15).max(15).step(0.1).name('sun z')

        //Shadow frustum size (raise it if some shadows are still clipped)
        this.lightsFolder
            .add(this, 'shadowAreaSize')
            .min(2).max(25).step(0.5)
            .name('shadow area')
            .onChange(() => this.updateShadowCamera())

        //Toggle a helper that shows the shadow camera frustum
        this.lightsFolder
            .add({ helper: false }, 'helper')
            .name('shadow helper')
            .onChange((value) => {
                if(value){
                    this.shadowHelper = new THREE.CameraHelper(this.sunLight.shadow.camera)
                    this.scene.add(this.shadowHelper)
                } else if(this.shadowHelper){
                    this.scene.remove(this.shadowHelper)
                    this.shadowHelper = null
                }
            })
    }
}
