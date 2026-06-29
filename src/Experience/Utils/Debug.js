import * as dat from 'lil-gui'

export default class Debug{
    constructor(){
        //The debug GUI is hidden by default; it only shows when the URL asks for it, e.g.
        //  http://localhost:.../#debug   (or any path containing "/debug").
        this.active = window.location.hash === '#debug' || window.location.pathname.includes('/debug')

        if(this.active){
            this.ui = new dat.GUI()
        }
    }
}
