import { incrementCustomProp,
     setCustomProp, getCustomProp } from "./updateCustomProp.js"

const SPEED = .05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector
                    ('[data-world]')

let nextCactusTime
export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll('[data-cactus]').forEach(
        cactus => {
            cactus.remove()
        }
    )

}

export function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus]")
    .forEach
    (cactus => {
        incrementCustomProp(cactus, "--left", 
        delta * speedScale * SPEED * -1)

        if (getCustomProp(cactus, "--left") <=
         -100) { 
            cactus.remove()}

        

    })

    
    if (nextCactusTime <= 0){
        createCactus()
        nextCactusTime = randomNumberBetween(
            CACTUS_INTERVAL_MIN,
             CACTUS_INTERVAL_MAX) / speedScale


    }
    nextCactusTime -= delta

}

function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = 'imgs/cactus.png'
    cactus.classList.add("cactus")
    // worldElem.append(cactus)
    setCustomProp(cactus, '--left', 100)
    worldElem.append(cactus)

}

// document.querySelectorAll("[data-cactus]")
function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * 
                (max - min + 1) + min);


}

export function getCactusRect() {
    return [...document.querySelectorAll("[data-cactus]")]
    .map(cactus =>
        {
            return cactus.getBoundingClientRect()
            // this gives a rect that has a top, left
            // , bottom and right
        })

}


 