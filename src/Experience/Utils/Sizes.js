import EventEmitter from './EventEmitter.js'
import * as THREE from 'three'

export default class Sizes extends EventEmitter{
    constructor(){

        super();

        //Setup
        this.width = window.innerWidth;
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        
        //Setup Mouse
        this.mouse = new THREE.Vector2()

        window.addEventListener('mousemove', (_event)=>{
            this.mouse.x = _event.clientX / this.width * 2 -1
            this.mouse.y = - (_event.clientY / this.height * 2 -1)

        })

        //Resize event
        window.addEventListener('resize', () =>{
            this.width = window.innerWidth;
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })
    }
}