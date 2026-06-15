import Experience from '../Experience.js'
import * as THREE from 'three'

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
        this.setBackground()
        this.setDebug()
    }

    setLights(){
        this.ambientLight = new THREE.AmbientLight('#ffffff', 1.31)
        this.scene.add(this.ambientLight)

        this.sunLight = new THREE.DirectionalLight('#ffffff', 1.4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(-2.2, 4.1, 4.1)
        this.scene.add(this.sunLight)
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
    }
}
