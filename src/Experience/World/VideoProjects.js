import Experience from '../Experience.js'
import * as THREE from 'three'

export default class VideoProjects{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug

        //setup
        this.texture = this.resources.items.VideoTexture;
        this.setModel();
    }

    setModel(){
        const geometry = new THREE.PlaneGeometry(4,2.25)
        const material = new THREE.MeshBasicMaterial({map:this.texture});
        const floorGeometry = new THREE.PlaneGeometry(5,5)
        const floorMaterial = new THREE.MeshBasicMaterial({color: "#000000"});

        this.plane = new THREE.Mesh(floorGeometry, floorMaterial)
        this.videoplane = new THREE.Mesh( geometry, material );

        this.videoplane.rotation.x = Math.PI * 0.5
        this.videoplane.position.y = -2
        this.plane.rotation.x = Math.PI * 0.5
        this.plane.position.y = -1.5

        this.scene.add(this.plane, this.videoplane)
    }
}