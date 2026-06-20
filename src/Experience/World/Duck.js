import * as THREE from 'three'
import DuckBubble from './DuckBubble.js'

//A single clickable/hoverable duck on the card. It owns its own data and behaviour
//(invisible collider, emissive look, hover bubble) so IronDuckCard stays a thin manager.
export default class Duck{
    constructor(object, options = {}){
        this.object = object;                                 //the THREE node (e.g. "Arri")
        this.name = object.name;
        this.member = options.member || { name: this.name }; //data shown in the bubble/popup
        this.hoverable = options.hoverable !== false;         //default true
        this.colliderPadding = options.colliderPadding !== undefined ? options.colliderPadding : 1.2;
        this.bubbleOffset = options.bubbleOffset !== undefined ? options.bubbleOffset : 12; //px gap above the duck

        this.collider = null;
        this.anchorLocal = null;   //top-center of the duck, in local space (bubble anchor)
        this.bubble = null;        //the hover bubble (only for hoverable ducks)
        this.hovered = false;

        //Hover "paper wobble": a quick damped back-and-forth rotation that settles back to the
        //duck's CURRENT rotation (captured at hover time, i.e. the pose it has once it's out of
        //the card), not its authored rest pose.
        this.wobbleAxis = 'x';        //local tilt axis (forward/back)
        this.wobbleAmplitude = 0.35;  //radians of the first swing (~20°)
        this.wobbleFrequency = 35;    //rad/s — how fast it flaps
        this.wobbleDecay = 8;         //how quickly it settles back
        this.wobbleTime = 0;
        this.wobbleActive = false;
        //The wobble oscillates around the duck's rest pose (its out-of-card orientation) and
        //returns exactly to it. The rest pose is captured only when a wobble STARTS, and a wobble
        //only starts if one isn't already running, so it's always captured while clean (no drift).
        this.restQuat = new THREE.Quaternion();
        this._wobbleQuat = new THREE.Quaternion();
        this._wobbleAxisVec = new THREE.Vector3(
            this.wobbleAxis === 'x' ? 1 : 0,
            this.wobbleAxis === 'y' ? 1 : 0,
            this.wobbleAxis === 'z' ? 1 : 0
        );

        //Reused temp vectors (avoid per-frame allocations)
        this._anchorWorld = new THREE.Vector3();
        this._projected = new THREE.Vector3();

        //Tag the object and its children so a raycast hit maps back to this Duck
        this.object.traverse((child) => { child.userData.duck = this; });

        this.applyEmissiveLook();
        this.buildCollider();

        if(this.hoverable){
            this.bubble = new DuckBubble(this.member);
        }
    }

    applyEmissiveLook(){
        //Respect the Blender emissive: a glTF mesh still lets its base color react to lights,
        //so we zero the base color on emitting meshes, leaving only the emissive to glow.
        this.object.traverse((child) => {
            if(child.isMesh && child.material && child.material.emissive){
                if(child.material.emissive.getHex() !== 0x000000){
                    //Clone so we never touch a material shared with the rest of the card
                    child.material = child.material.clone();
                    child.material.color.set(0x000000); //black base -> no light response
                    child.material.needsUpdate = true;

                    child.castShadow = true;     //still casts shadows, like in Blender
                    child.receiveShadow = false; //the emissive would mask received shadows
                }
            }
        });
    }

    buildCollider(){
        //One invisible box wrapping the whole duck, so raycasts hit the full shape
        //instead of just the base mesh.
        this.object.updateWorldMatrix(true, true);
        const invDuck = new THREE.Matrix4().copy(this.object.matrixWorld).invert();

        //Union of every child mesh's bounding box, expressed in the duck's LOCAL space
        const box = new THREE.Box3();
        this.object.traverse((child) => {
            if(child.isMesh && child.geometry && child !== this.collider){
                child.geometry.computeBoundingBox();
                const childBox = child.geometry.boundingBox.clone();
                const toLocal = new THREE.Matrix4().multiplyMatrices(invDuck, child.matrixWorld);
                childBox.applyMatrix4(toLocal);
                box.union(childBox);
            }
        });
        if(box.isEmpty()) return;

        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        //Anchor for the bubble: top-center of the duck (local space)
        this.anchorLocal = new THREE.Vector3(center.x, box.max.y, center.z);

        const geometry = new THREE.BoxGeometry(
            size.x * this.colliderPadding,
            size.y * this.colliderPadding,
            size.z * this.colliderPadding
        );
        const collider = new THREE.Mesh(geometry, Duck.colliderMaterial);
        collider.visible = false; //invisible, but still hit by the raycaster
        collider.userData.duck = this;
        collider.userData.localCenter = center.clone();
        collider.position.copy(center);

        this.object.add(collider);
        this.collider = collider;
    }

    rebuildCollider(padding){
        if(padding !== undefined) this.colliderPadding = padding;
        this.disposeCollider();
        this.buildCollider();
    }

    disposeCollider(){
        if(this.collider){
            if(this.collider.parent) this.collider.parent.remove(this.collider);
            this.collider.geometry.dispose();
            this.collider = null;
        }
    }

    setHovered(hovered){
        if(this.hovered === hovered) return;
        this.hovered = hovered;
        if(this.bubble){
            if(hovered) this.bubble.show();
            else this.bubble.hide();
        }
        //Start the wobble on hover, but ONLY if one isn't already running. This way rapid
        //hover/unhover doesn't restart it, and the rest pose is captured while clean.
        if(hovered && this.hoverable && !this.wobbleActive){
            this.restQuat.copy(this.object.quaternion); //the rest pose to return to (~90° on X)
            this.wobbleActive = true;
            this.wobbleTime = 0;
        }
    }

    update(cameraInstance, sizes, delta){
        //Paper wobble: a damped oscillation around the captured rest pose. Set absolutely each
        //frame (restQuat * wobble) so it never accumulates, and it returns exactly to restQuat.
        if(this.wobbleActive){
            this.wobbleTime += delta;
            const envelope = this.wobbleAmplitude * Math.exp(-this.wobbleDecay * this.wobbleTime);

            if(envelope < 0.005){
                //Decayed: snap exactly back to the rest pose and stop
                this.object.quaternion.copy(this.restQuat);
                this.wobbleActive = false;
            } else {
                const angle = envelope * Math.sin(this.wobbleFrequency * this.wobbleTime);
                this._wobbleQuat.setFromAxisAngle(this._wobbleAxisVec, angle);
                this.object.quaternion.copy(this.restQuat).multiply(this._wobbleQuat);
            }
        }

        //Keep the bubble positioned above the duck (the duck can move with the card animation)
        if(this.bubble && this.anchorLocal){
            this._anchorWorld.copy(this.anchorLocal).applyMatrix4(this.object.matrixWorld);
            this._projected.copy(this._anchorWorld).project(cameraInstance);

            //Behind the camera: nothing to position
            if(this._projected.z <= 1){
                const x = (this._projected.x * 0.5 + 0.5) * sizes.width;
                const y = (-this._projected.y * 0.5 + 0.5) * sizes.height - this.bubbleOffset;
                this.bubble.setScreenPosition(x, y);
            }
        }
    }
}

//Shared invisible material for every collider
Duck.colliderMaterial = new THREE.MeshBasicMaterial();
