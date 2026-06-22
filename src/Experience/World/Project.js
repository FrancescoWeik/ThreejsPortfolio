import * as THREE from 'three'

//Holds one project's data (from projects.js) and its preloaded image texture. Future project
//interactions (open link, show details, ...) will live here.
export default class Project{
    constructor(data, resources){
        this.node = data.node;
        this.title = data.title;
        this.description = data.description;
        this.link = data.link;
        this.imagePath = data.imagePath;
        this.titleColor = data.titleColor;

        //The image is preloaded in the Resources (sources.js), named `projectImage_<node>`
        this.texture = resources.items[`projectImage_${this.node}`] || null;
        if(this.texture){
            this.texture.flipY = false;            //glTF UVs have their origin at the top
            this.texture.encoding = THREE.sRGBEncoding;
            this.texture.needsUpdate = true;
        }
    }
}
