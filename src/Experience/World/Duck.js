import * as THREE from 'three'

//A single clickable/hoverable duck on the card. It owns its own data and behaviour
//(hover scaling, invisible collider, emissive look) so IronDuckCard stays a thin manager.
export default class Duck{
    constructor(object, options = {}){
        this.object = object;                                 //the THREE node (e.g. "Arri")
        this.name = object.name;
        this.info = options.info || { title: this.name, text: '' };
        this.hoverable = options.hoverable !== false;         //default true
        this.colliderPadding = options.colliderPadding !== undefined ? options.colliderPadding : 1.2;

        //Hover scaling state
        this.originalScale = object.scale.clone();
        this.hoverFactor = 1;   //current scale multiplier (1 = full size, 0 = gone)
        this.hoverTarget = 1;   //where hoverFactor is heading

        this.collider = null;

        //Tag the object and its children so a raycast hit maps back to this Duck
        this.object.traverse((child) => { child.userData.duck = this; });

        this.applyEmissiveLook();
        this.buildCollider();
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
        //Reset scaling so a freshly built collider isn't pre-scaled
        this.hoverFactor = 1;
        this.hoverTarget = 1;
        this.object.scale.copy(this.originalScale);
    }

    update(smoothing){
        //Ease the scale toward the target
        this.hoverFactor += (this.hoverTarget - this.hoverFactor) * smoothing;
        this.object.scale.copy(this.originalScale).multiplyScalar(this.hoverFactor);

        //Keep the invisible collider at a constant world size/position despite the shrink,
        //so the ray still hits even when the duck is nearly gone
        if(this.collider){
            const inv = 1 / Math.max(this.hoverFactor, 1e-3);
            this.collider.scale.setScalar(inv);
            this.collider.position.copy(this.collider.userData.localCenter).multiplyScalar(inv);
        }
    }
}

//Shared invisible material for every collider
Duck.colliderMaterial = new THREE.MeshBasicMaterial();
