import * as dat from 'lil-gui'

export default class Debug{
    constructor(){
        //Always show the GUI for now (set to window.location.hash === "#debug" to hide it later)
        this.active = true

        if(this.active){
            this.ui = new dat.GUI()
        }
    }
}
