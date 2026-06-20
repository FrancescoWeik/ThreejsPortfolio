//A small HTML "speech bubble" shown above a duck on hover. It lives in the DOM (so we can
//later drop in rich content: image, link, formatted text) and is positioned each frame from
//the duck's projected screen position. It appears by scaling 0 -> 1 and disappears 1 -> 0.
export default class DuckBubble{
    constructor(member = {}){
        this.member = member;

        this.element = document.createElement('div');
        this.element.className = 'duck-bubble';

        this.nameEl = document.createElement('div');
        this.nameEl.className = 'duck-bubble__name';

        this.descriptionEl = document.createElement('div');
        this.descriptionEl.className = 'duck-bubble__description';

        this.element.appendChild(this.nameEl);
        this.element.appendChild(this.descriptionEl);

        document.body.appendChild(this.element);

        this.setContent(member);
        this.visible = false;
    }

    setContent(member = {}){
        this.member = member;
        this.nameEl.textContent = member.name || '';
        this.descriptionEl.textContent = member.description || '';
        //image / link will be added here later
    }

    setScreenPosition(x, y){
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    show(){
        if(this.visible) return;
        this.visible = true;
        this.element.classList.add('visible');
    }

    hide(){
        if(!this.visible) return;
        this.visible = false;
        this.element.classList.remove('visible');
    }

    destroy(){
        if(this.element && this.element.parentNode){
            this.element.parentNode.removeChild(this.element);
        }
    }
}
