import { incrementCustomProp,
        getCustomProp, 
        setCustomProp} from './updateCustomProp.js'

const dinoElem = document.querySelector('[data-dino]')
const JUMP_SPEED = .45
const GRAVITY = .0015
const DINO_FRAME_COUNT = 2
// frame count to oscillate btw 2 different dinosaur 
// animations

const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity


export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProp(dinoElem,'--bottom',0 )
    document.removeEventListener("keydown",onJump)
    document.addEventListener("keydown",onJump)





}

export function setDinoLose() {
    dinoElem.src = "imgs/dino-lose.png"
}

export function updateDino(delta, speedScale) {
    handleRun(delta,speedScale)
    handleJump(delta)

}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect()

}

function handleRun(delta, speedScale) {
    if (isJumping) {
        dinoElem.src = "imgs/dino-stationary.png"
        return


    }
    if(currentFrameTime >= FRAME_TIME)
    {
        dinoFrame = (dinoFrame + 1) % 
        DINO_FRAME_COUNT
        console.log(dinoFrame)
        if (dinoFrame == 0)
        
            dinoElem.src = "imgs/dino-run-0.png"
        else
            dinoElem.src = "imgs/dino-run-1.png"
        currentFrameTime -= FRAME_TIME

    }
    currentFrameTime += delta * speedScale


}

function handleJump(delta) {
    if (!isJumping) return
    incrementCustomProp(dinoElem, '--bottom', yVelocity*delta)
    if (getCustomProp(dinoElem, '--bottom')<=0)
    {
        setCustomProp(dinoElem,'--bottom',0)
        isJumping = false
    }
    yVelocity-=GRAVITY*delta

}

function onJump(e)
{
    if (e.code !== 'Space' || isJumping) return;
    yVelocity = JUMP_SPEED
    isJumping = true
}