import * as THREE from 'three'
import Experience from './Experience.js'
import EventEmitter from './Utils/EventEmitter.js'

export default class PreLoader extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.scene = this.experience.scene
        //this.sounds = this.experience.sounds
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.overlay = document.querySelector('.overlay')
        this.loading = document.querySelector('#loading')

        // Progress
        this.resources.on('itemLoaded', () =>
        {
            this.progressRatio = (this.resources.loaded + 1)/ this.resources.toLoad

            document.getElementById("progressPercentage").innerHTML = "Loading..." + Math.trunc(this.progressRatio * 100) + "%"
        })

        //Loaded: no START button — fade the loader/overlay and go straight to the card (intro)
        this.resources.on('ready', () =>
        {
            window.setTimeout(() =>
            {
                this.loading.classList.add('fade')
            }, 700)

            window.setTimeout(() =>
            {
                if(this.loading) this.loading.remove()
                this.overlay.classList.add('fade') // reveal the scene
                this.trigger('start')              // begin the intro camera flight + enable scroll
            }, 1500)
        })
    }
}