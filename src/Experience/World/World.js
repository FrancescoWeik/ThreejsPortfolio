import Experience from '../Experience.js'
import Environment from './Environment.js'
import IronDuckCard from './IronDuckCard.js'

export default class World{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        //Wait for resources
        this.resources.on('ready', () => {
            //Setup
            this.ironDuckCard = new IronDuckCard();
            this.environment = new Environment();
        })
    }

    update(){
        if(this.ironDuckCard){
            this.ironDuckCard.update();
        }
    }
}
