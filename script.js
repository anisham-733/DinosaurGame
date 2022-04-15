import { updateGround, setupGround } from
		'./ground.js'

import { updateDino, setupDino, getDinoRect,
		setDinoLose } 
		from './dino.js'

import { updateCactus, setupCactus, getCactusRect 
		 } from './cactus.js'





const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = .0001

const worldElem = document.querySelector('[data-world]')
const scoreElem = document.querySelector('[data-score]')
const startScreenElem = document.querySelector('[data-start-screen]')

 setPixelToWorldScale()
 window.addEventListener('resize',setPixelToWorldScale)
 document.addEventListener("keydown", handleStart, 
 { once: true})
//  whenever I will press the key, I;ll call function 
// handleStart()
 // // everytime our window gets resized, we'll call the same 
// // function

let lastTime
let speedScale
let score
// // update func is called when uh reload the win
// // and when we change the content on our scr  een
// // high refresh monitor

 function update(time) {
 	if (lastTime==null)
 	{
 		lastTime = time
 		window.requestAnimationFrame(update)
 		return 
 	}
 	const delta = time - lastTime
 	updateGround(delta, speedScale)
	updateSpeedScale(delta)
	updateScore(delta)

	if (checkLose()) {
		return handleLose()

	}
	updateDino(delta, speedScale)
	updateCactus(delta, speedScale)
 	console.log(delta)
 	lastTime = time
 	window.requestAnimationFrame(update)


 }

 function checkLose() {
	 const dinoRect = getDinoRect()
	 return getCactusRect().some(rect => 
		isCollision(rect, dinoRect))

 }

 function isCollision(rect1, rect2) {
	 return (
		 rect1.left < rect2.right &&
	 	rect1.top < rect2.bottom &&
		 rect1.right > rect2.left &&
		 rect1.bottom > rect2.top
	 )



 }

 
 function updateSpeedScale(delta) {
	 speedScale += delta * SPEED_SCALE_INCREASE

 } 

 function updateScore(delta) {
	 score += delta * .01
	 scoreElem.textContent = Math.floor(score)

 }
 function handleStart() {
	lastTime = null
	score = 0
	setupGround()
	setupDino()
	setupCactus()
	startScreenElem.classList.add("hide")
	// added hide class
	speedScale = 1
	window.requestAnimationFrame(update)


 }

 function setPixelToWorldScale()
 {
 	let worldScale
 	if (window.innerWidth / window.innerHeight < WORLD_WIDTH/WORLD_HEIGHT)
 	{
 		worldScale = window.innerWidth / WORLD_WIDTH
 	}
 	else{
 		worldScale = window.innerHeight/WORLD_HEIGHT
 	}
 	worldElem.style.width = '${WORLD_WIDTH * worldScale}px'
 	worldElem.style.height = '${WORLD_HEIGHT * worldScale}px'

}

function handleLose() {
	setDinoLose()
	setTimeout( () => {
		document.addEventListener("keydown",
		 handleStart,
		 {once : true})
		 startScreenElem.classList.remove("hide")

	}, 100 )

}



// alert(2+3)