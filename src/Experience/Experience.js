import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import * as THREE from 'three'
import Camera from './Camera.js'
import Renderer from "./Renderer.js"
import World from "./World/World.js"
import Resources from "./Utils/Resources.js"
import sources from './sources.js'
import Debug from './Utils/Debug.js'
import Controls from './Utils/Controls.js'
import PreLoader from "./Preloader.js"

let instance = null

export default class Experience{
    constructor(canvas){

        if(instance){
            return instance;
        }
        instance = this;

        //Global access
        //window.experience = this

        //Options
        this.canvas = canvas

        //Setup
        this.debug = new Debug();
        this.sizes = new Sizes;
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.resources = new Resources(sources);
        this.preLoader = new PreLoader()
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();
        this.controls = new Controls();
        this.projectNumber = 0;

        //Sizes resize event
        this.sizes.on('resize', () =>{
            this.resize();
        })

        //Time tick event
        this.time.on('tick', () =>{
            this.update();
        })
    }

    resize(){
        this.camera.resize();
        this.renderer.resize();
    }

    update(){
        this.camera.update();
        this.world.update();
        this.controls.update();
        this.renderer.update();
    }

    moveSpider(){
        this.world.spider.moveToCenter();
        this.world.room.removeArrow();
    }

    activateBell(){
        this.controls.alreadyMoving = false;
    }

    changePictureProject(position){
        this.world.room.changeProjectPicture(position);
    }

    createProjectFromControls(){
        this.world.spider.createProjectFromControls();
    }

    destroy(){
        this.sizes.off('resize')
        this.time.off('tick')

        //Traverse the whole scene
        this.scene.traverse((child) =>{
            if(child instanceof THREE.Mesh){
                child.geometry.dispose();

                for(const key in child.material){
                    const value = child.material[key]
                    if(value && typeof value.dispose === 'function'){
                        value.dispose();
                    }
                }
            }
        })

        this.camera.controls.dispose();
        this.renderer.instance.dispose();
        
        if(this.debug.active){
            this.debug.ui.destroy();
        }
    }
}