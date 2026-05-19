import EventEmitter from  './EventEmitter.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Resources extends EventEmitter{
    constructor(sources, ducks){
        super()

        //Options
        this.sources = sources
        this.ducks = ducks;

        //Setup
        this.items = {}
        this.duckItems = {}
        this.toLoad = this.sources.length + this.ducks.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading();
    }

    setLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()

        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath('/draco/');

        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    startLoading(){
        //load each source
        for(const source of this.sources){
            this.LoadSingleSource(source, false);        
        }
        for(const duck of this.ducks){
            console.log("load ducks");
            this.LoadSingleSource(duck, true)
        }
    }

    LoadSingleSource(source, isDuck){
        if(source.type === "gltfModel"){
            this.loaders.gltfLoader.load(
                source.path,
                (file) =>{
                    this.sourceLoaded(source,file, isDuck)
                }
            )
        }else if (source.type === "texture"){
            this.loaders.textureLoader.load(
                source.path,
                (file) =>{
                    this.sourceLoaded(source,file, isDuck)
                }
            )
        }else if (source.type === "cubeTexture"){
            this.loaders.cubeTextureLoader.load(
                source.path,
                (file) =>{
                    this.sourceLoaded(source,file, isDuck)
                }
            )
        }else if(source.type === "dracoModel"){
            this.loaders.dracoLoader.load(
                source.path,
                (file) =>{
                    this.sourceLoaded(source,file, isDuck)
                }
            )
        }else if(source.type === "videoTexture"){
            this.video = {}
            this.videoTexture = {}
            this.video[source.name] = document.createElement("video");
            this.video[source.name].src = source.path;
            this.video[source.name].muted = true;
            this.video[source.name].playsInline = true;
            this.video[source.name].autoplay = true;
            this.video[source.name].loop = true;
            this.video[source.name].play();

            this.videoTexture[source.name] = new THREE.VideoTexture(this.video[source.name])
            this.videoTexture[source.name].flipY = false; // usually set to true...
            this.videoTexture[source.name].minFilter = THREE.NearestFilter;
            this.videoTexture[source.name].magFilter = THREE.NearestFilter;
            this.videoTexture[source.name].generateMipmaps = false;
            this.videoTexture[source.name].encoding = THREE.sRGBEncoding;

            this.sourceLoaded(source,this.videoTexture[source.name], isDuck)
        }
    }

    sourceLoaded(source, file, isDuck){
        this.trigger('itemLoaded');
        
        if(!isDuck){
            this.items[source.name] = file;
        }

        else{
            console.log("Add duck");
            this.duckItems[source.name] = file;
        }

        this.loaded++;
        if(this.loaded ===this.toLoad){
            this.trigger('ready');
        }
    }
}