
import Experience from "../Experience.js";
import * as THREE from 'three'
import gsap from 'gsap'

export default class Controls{
    //creo "collider"
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.debug = this.experience.debug
        this.camera = this.experience.camera;
        this.mouse = this.experience.sizes.mouse;
        this.preLoader = this.experience.preLoader;

        this.raycaster = new THREE.Raycaster();
        this.currentIntersect = null;
        this.objectsToTest = [] //the currentObjectsToTest raycast on
        this.initialSceneTest = [] //the objects to test when scene is opened
        this.projectsToTest = [] //objects to test when projects are clicked
        this.aboutToTest = [] //objects to test when about is clicked.
        this.contactToTest = [] //objects to test when contact page is displayed
        this.televisionToTest = [] //objects to test when television is clicked

        this.readyForUpdate = false;

        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Controls');
        }

        this.preLoader.on('start', () =>
        {
            //setup
            this.setColliders(); //these are colliders that will be invisible...
            this.objectsToTest = this.initialSceneTest;
            this.addClickHandler();
            this.readyForUpdate = true;

            this.camera.experienceControls = this.experience.controls;
        })
    }

    setColliders(){
        //console.log(this.bellObject)
        this.setProjectCollider()
        this.setProjectButtonColliders();

        this.setAboutCollider();
        this.setAboutButtonsColliders();
        this.setContactButtonsColliders();

        this.setVideoCollider();

        this.bellObjects = this.experience.world.room.bellObjects;
        for(let bellPart of this.bellObjects){
            this.initialSceneTest.push(bellPart);
        }
    }

        
    setProjectCollider(){
        //creo cubo e lo posiziono di fronte al quadro dei progetti
        this.projectsCollider =  new THREE.Mesh(
            new THREE.PlaneGeometry(1,1),
            new THREE.MeshBasicMaterial({color: "#ff0000", wireframe:true})
        )
        this.projectsCollider.position.set(-1.45, 1.46, -1.7)
        this.projectsCollider.scale.x = 1.25
        this.projectsCollider.scale.y = 1.25
        this.projectsCollider.visible = false;

        this.scene.add(this.projectsCollider);
        this.initialSceneTest.push(this.projectsCollider);
    }

    setAboutCollider(){
        //creo cubo e lo posiziono di fronte al quadro about
        this.aboutCollider =  new THREE.Mesh(
            new THREE.PlaneGeometry(1,1),
            new THREE.MeshBasicMaterial({color: "#ff0000", wireframe:true})
        )
        this.aboutCollider.position.set(1.9, 0.38, 1.87)
        this.aboutCollider.scale.y = 0.9
        this.aboutCollider.scale.x = 1.25
        this.aboutCollider.rotation.y = -Math.PI * 0.5; 
        this.aboutCollider.visible = false;

        this.scene.add(this.aboutCollider);

        this.initialSceneTest.push(this.aboutCollider);
    }

    
    setVideoCollider(){
        this.televisionObjects = this.experience.world.television.televisionObjects;
        for(let televisionPart of this.televisionObjects){
            this.initialSceneTest.push(televisionPart);
        }
        
        this.televisionButton = this.experience.world.television.televisionButton;
        this.televisionBackButton = this.experience.world.television.televisionBackButton;
        this.televisionToTest.push(this.televisionButton, this.televisionBackButton);
    }

    setProjectButtonColliders(){
        const geometry = new THREE.PlaneGeometry(0.4, 0.1);
        const logoGeometry = new THREE.PlaneGeometry(0.5, 0.5);
        const material = new THREE.MeshBasicMaterial({color:"#00ff00", wireframe:true});

        this.nextButtonCollider = new THREE.Mesh(
            geometry,
            material
        )
        this.backButtonCollider = new THREE.Mesh(
            geometry,
            material
        )
        this.logoButtonCollider = new THREE.Mesh(
            logoGeometry,
            material
        )

        this.nextButtonCollider.position.set(-1.15, 0.94, -1.7)
        this.backButtonCollider.position.set(-1.9, 0.94, -1.7)
        this.logoButtonCollider.position.set(-1.85, 1.45, -1.7)
        
        this.nextButtonCollider.visible = false;
        this.backButtonCollider.visible = false;
        this.logoButtonCollider.visible = false;
        
        this.projectsToTest.push(this.nextButtonCollider,this.backButtonCollider, this.logoButtonCollider)
        this.scene.add(this.nextButtonCollider,this.backButtonCollider, this.logoButtonCollider)
    }

    setAboutButtonsColliders(){
        const geometry = new THREE.PlaneGeometry(0.4, 0.1);
        const material = new THREE.MeshBasicMaterial({color:"#00ff00", wireframe:true})
        this.backAboutCollider = new THREE.Mesh(
            geometry,
            material
        )

        this.nextAboutCollider = new THREE.Mesh(
            geometry,
            material
        )

        this.backAboutCollider.position.set(1.9, 0, 1.45)
        this.backAboutCollider.rotation.y = -Math.PI * 0.5

        this.nextAboutCollider.position.set(1.9, 0, 2.25)
        this.nextAboutCollider.rotation.y = - Math.PI * 0.5

        this.backAboutCollider.visible = false;
        this.nextAboutCollider.visible = false;

        this.aboutToTest.push(this.backAboutCollider, this.nextAboutCollider)
        this.scene.add(this.backAboutCollider, this.nextAboutCollider)
    }

    setContactButtonsColliders(){
        const geometry = new THREE.PlaneGeometry(0.1, 0.1);
        const material = new THREE.MeshBasicMaterial({color:"#00ff00", wireframe:true})

        const cardGeometry = new THREE.PlaneGeometry(0.25, 0.3);

        this.backContactCollider = new THREE.Mesh(
            new THREE.PlaneGeometry(0.4, 0.1),
            material
        )

        this.linkedinCollider = new THREE.Mesh(
            geometry,
            material
        )

        this.githubCollider = new THREE.Mesh(
            geometry,
            material
        )

        this.instagramCollider = new THREE.Mesh(
            geometry,
            material
        )

        this.curriculumCollider = new THREE.Mesh(
            cardGeometry, 
            material
        )

        this.referenceCollider = new THREE.Mesh(
            cardGeometry, 
            material
        )

        this.backContactCollider.position.set(1.9, 0, 1.45)
        this.backContactCollider.rotation.y = -Math.PI * 0.5

        this.linkedinCollider.position.set(1.9, 0.03, 1.90)
        this.linkedinCollider.rotation.y = -Math.PI * 0.5
        this.githubCollider.position.set(1.9, 0.03, 2.20)
        this.githubCollider.rotation.y = -Math.PI * 0.5
        this.instagramCollider.position.set(1.9, 0.03, 2.05)
        this.instagramCollider.rotation.y = -Math.PI * 0.5

        this.curriculumCollider.position.set(1.9, 0.355, 1.6)
        this.curriculumCollider.rotation.y = -Math.PI * 0.5
        this.referenceCollider.position.set(1.9, 0.355, 2.05)
        this.referenceCollider.rotation.y = -Math.PI * 0.5

        this.backContactCollider.visible = false;
        this.linkedinCollider.visible = false;
        this.githubCollider.visible = false;
        this.instagramCollider.visible = false;

        this.curriculumCollider.visible = false;
        this.referenceCollider.visible = false;

        this.contactToTest.push(this.backContactCollider,this.linkedinCollider, this.githubCollider, this.instagramCollider, this.curriculumCollider, this.referenceCollider)
        this.scene.add(this.backContactCollider, this.linkedinCollider, this.githubCollider, this.instagramCollider, this.curriculumCollider, this.referenceCollider)
    }

    addClickHandler(){
        window.addEventListener('click', (event) =>{
            //console.log("clicking?");
            //console.log(this.currentIntersect)
            //console.log(this.bellObjects)
            //Qua forse mi conviene fare un check dell'oggetto al click, non a ogni update...
            this.checkClick(event)

            /*if(this.currentIntersect){
                switch(this.currentIntersect.object){
                    case this.bellObjects[0]: 
                    case this.bellObjects[1]:
                    case this.bellObjects[2]:
                    case this.bellObjects[3]: if(!this.alreadyMoving){ 
                                                this.experience.moveSpider(); this.alreadyMoving = true 
                                              } break;
                    case this.projectsCollider: this.camera.moveToProjects(); break;
                    case this.aboutCollider: this.camera.moveToAbout(); break;
                    case this.nextButtonCollider: this.experience.createProjectFromControls(); break;
                    case this.backButtonCollider: console.log(this.mouse); this.camera.moveToStart(); break;
                    case this.backAboutCollider: this.camera.moveToStart(); break;
                    case this.logoButtonCollider: this.goToProjectLink(); break;
                    default: break;
                    
                }
            }*/
        })
    }

    checkClick(event){
        const posX = event.clientX / this.experience.sizes.width * 2 -1
        const posY = -(event.clientY / this.experience.sizes.height * 2 -1)
        const position = new THREE.Vector2(posX, posY);
        //console.log(position);
        this.raycaster.setFromCamera(position, this.camera.instance)

        //objectToTest are all the bell components
        const intersects = this.raycaster.intersectObjects(this.objectsToTest)
        //console.log(intersects)
        //console.log(this.objectsToTest)
        if(intersects.length){
            //console.log(intersects);
            this.currentIntersect = intersects[0]
            if(this.bellObjects.includes(this.currentIntersect.object)){
                if(!this.alreadyMoving){ 
                    this.experience.moveSpider(); this.alreadyMoving = true 
                  }
            }else if(this.televisionObjects.includes(this.currentIntersect.object)){
                //Go to television
                this.camera.moveToTelevision(); 
            }else{
                switch(this.currentIntersect.object){
                    case this.projectsCollider: this.camera.moveToProjects(); break;
                    case this.aboutCollider: this.camera.moveToAbout(); break;
                    case this.nextButtonCollider: this.experience.createProjectFromControls(); break;
                    case this.backButtonCollider: this.camera.moveToStart(); break;
                    case this.backAboutCollider: this.camera.moveToStart(); break;
                    case this.nextAboutCollider: if(this.objectsToTest == this.aboutToTest){this.experience.changeAboutToCurriculum(); this.objectsToTest = this.contactToTest;} break;
                    case this.backContactCollider: this.experience.changeCurriculumToAbout(); this.objectsToTest = this.aboutToTest; break;
                    case this.logoButtonCollider: this.goToProjectLink(); break;
                    case this.televisionButton: this.experience.world.television.changeTexture(); break;
                    case this.televisionBackButton: this.camera.moveToStart(); break;

                    case this.linkedinCollider: this.goToLink("https://www.linkedin.com/in/francesco-weikmann-8494a8252/"); break;
                    case this.githubCollider: this.goToLink("https://github.com/FrancescoWeik"); break;
                    case this.instagramCollider: this.goToLink("https://www.instagram.com/francesco_weikmann/"); break;
                    case this.curriculumCollider: this.downloadDocument("CVFrancescoWeikmann.pdf");break;
                    case this.referenceCollider: this.downloadDocument("reference.pdf");break;
                    default: break;
                }
            }
        }else{
            this.currentIntersect = null
        }
    }

    update(){
        //console.log(this.mouse)
        //Volendo posso fare anzichè update verificare solo al click dell'utente, però così non posso modificare la freccia con la mano.

        if(this.readyForUpdate){
            this.raycaster.setFromCamera(this.mouse, this.camera.instance)

            //objectToTest are all the bell components
            const intersects = this.raycaster.intersectObjects(this.objectsToTest)
            if(intersects.length){
                //this.currentIntersect = intersects[0]
                document.documentElement.style.cursor = "pointer"
            }else{
                //this.currentIntersect = null
                document.documentElement.style.cursor = "default"
            }
        }
    }

    changeToProjectButtonsCollider(){
        //change objectsToTest to projectsToTest
        this.objectsToTest = this.projectsToTest
        //console.log(this.objectsToTest)
    }

    changeToInitialSceneColliders(){
        this.objectsToTest = this.initialSceneTest
        //console.log(this.objectsToTest);
    }

    changeToAboutButtonsColliders(){
        this.objectsToTest = this.aboutToTest;
    }

    changeToTelevisionButtonsColliders(){
        this.objectsToTest = this.televisionToTest;
    }

    goToProjectLink(){
        switch(this.experience.projectNumber){
            case 0: window.open("https://play.google.com/store/apps/details?id=com.RatMood.PipThePirate", '_blank'); break;//go to link
            case 1: window.open("https://francescow.itch.io/my-videogame", '_blank'); break;
            case 2: window.open("https://francescow.itch.io/its-always-the-butler", '_blank'); break;
            case 3: window.open("https://github.com/DigitalCommonsLab/bikingimprover", '_blank'); break;
            case 4: window.open("https://francescow.itch.io/blackjack/", '_blank'); break; //have to use the itch.io game page
            case 5: window.open("https://meteo-website-group19.onrender.com/", '_blank'); break;
        }
    }

    goToLink(link){
        window.open(link,'_blank');
    }

    downloadDocument(element){
		var a = document.createElement('a')
		a.href = element
		a.download = element.split('/').pop()
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}
}