const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let alienRemoved = []
let result = 0

// function to initialize the game
function initGame(){
    clearInterval(invadersId)
    currentShooterIndex = 202
    direction =1
    goingRight = true
    alienRemoved = []
    result = 0
    resultDisplay.textContent = ''
    draw()
    invadersId = setInterval(moveInvaders,500)
}

// restart the game
function restartGame(){
    initGame()

    squares.forEach((square) => {
        square.classList.remove('boom','invader','shooter');
    });

    alienInvaders.length = 0
    alienInvaders.push(
        0,1,2,3,4,5,6,7,8,9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    )

    currentShooterIndex = 202;
    direction = 1;
    goingRight = true;

    
}



for(let i = 0 ; i < 225 ; i++ ){
    const square = document.createElement('div')
     grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw(){
    for(let i=0;i<alienInvaders.length;i++){
        if(!alienRemoved.includes(i)){
            squares[alienInvaders[i]].classList.add('invader')
        }            
        
    }
}

draw()

function remove(){
    for(let i=0;i<alienInvaders.length;i++){
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e){
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key){
        case 'ArrowLeft' :
            if(currentShooterIndex % width !== 0){
                currentShooterIndex -= 1
            }
            break
        case 'ArrowRight' :
        if(currentShooterIndex % width < width - 1){
            currentShooterIndex += 1
        }
            break    
    }
    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown',moveShooter)

function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length-1] % width === width -1
    remove()

    if(rightEdge && goingRight){
        for(let i =0;i<alienInvaders.length ;i++){
            alienInvaders[i] += width + 1
            direction =-1
            goingRight = false
        }
    }

    if(leftEdge && !goingRight){
        for(let i =0 ;i<alienInvaders.length;i++){
            alienInvaders[i] += width -1
            direction =1
            goingRight = true
        }
    }

    for(let i = 0 ; i<alienInvaders.length ; i++){
        alienInvaders[i] += direction
    }
    draw()

    if(squares[currentShooterIndex].classList.contains('invader','shooter')){
        resultDisplay.textContent = 'Game Over'
        clearInterval(invadersId)

    }

    for(let i = 0;i<alienInvaders.length;i++){
        if(alienInvaders[i]>squares.length ){
            resultDisplay.textContent = 'Game Over'
            clearInterval(invadersId)

        }
    }
    if(alienRemoved.length === alienInvaders.length){
        resultDisplay.textContent = 'You Win!'
        clearInterval(invadersId)
    }

}

invadersId = setInterval(moveInvaders,500)

function shoot(e){
    let laserId
    let currentLaserIndex = currentShooterIndex
    
    function movelaser(){
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width

    if(currentLaserIndex < 0){
        clearInterval(laserId)
    
    }

    squares[currentLaserIndex].classList.add('laser')

        
    if(squares[currentLaserIndex].classList.contains('invader')){
       
        squares[currentLaserIndex].classList.remove('laser')
        squares[currentLaserIndex].classList.remove('invader')
        squares[currentLaserIndex].classList.add('boom')

        setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'),300)
        clearInterval(laserId)

        const alienRemoval = alienInvaders.indexOf(currentLaserIndex)
        alienRemoved.push(alienRemoval)
        result++
        resultDisplay.textContent = result
    }
    }

    if(e.key === 'ArrowUp'){
        laserId = setInterval(movelaser,100)
    }
}

document.addEventListener('keydown',shoot)

// call initGame to start the game initially
initGame()

// Event listener to restart the game
document.addEventListener('keydown',(e)=>{
    if(e.key === 'r' || e.key === 'R'){
        restartGame()
    }
})