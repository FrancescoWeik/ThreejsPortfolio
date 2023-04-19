import Experience from '../Experience.js'
import Environment from './Environment.js'
//import Floor from './Floor.js'
//import Fox from './Fox.js'
import RoomSpider from './RoomSpider.js'
import Spider from './Spider.js'
import ProjectModel from './ProjectModel.js'
import ButlerModel from './ButlerModel.js'
import * as THREE from 'three'
import VideoProjects from './VideoProjects.js'
import FlyingSpiders from './FlyingSpiders.js'
import Television from './Television.js'

export default class World{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.resources = this.experience.resources



        //Wait for resources
        this.resources.on('ready', () => {
            //Setup
            this.room = new RoomSpider();
            this.television = new Television();

            this.pip = new ProjectModel(this.resources.items.PipThePirateModel, this.resources.items.PipThePirateTexture, new THREE.Vector3(0.1,-0.6,0.25))
            this.littleGuy = new ProjectModel(this.resources.items.TheLittleGuyModel, this.resources.items.LittleGuyTexture, new THREE.Vector3(0.14,-0.3,0.263))
            this.butler = new ButlerModel();
            this.bikingImprover = new ProjectModel(this.resources.items.BikingImproverModel, this.resources.items.BikingImproverTexture, new THREE.Vector3(0.1,-0.3,0.25))
            this.blackjack = new ProjectModel(this.resources.items.CardModel, undefined, new THREE.Vector3(0, - 0.3, 0))

            this.spider = new Spider();

            this.flyingSpiders = new FlyingSpiders();
            
            //this.videoProjects = new VideoProjects()
            this.environment = new Environment();
        })
    }

    update(){
        if(this.spider){
            this.spider.update();
        }
        if(this.room){
            this.room.update();
        }
        if(this.flyingSpiders){
            this.flyingSpiders.update();
        }
    }
}