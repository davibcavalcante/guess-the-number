// ELEMENTS SELECT-HOME
const home = document.querySelector('.container-home')
const howToPlayBtn = document.querySelector('#how-to-play-btn')
const startBtn = document.querySelector('#start-btn')
const howToPlay = document.querySelector('#how-to-play')

// ELEMENTS SELECT-GAME
const game = document.querySelector('.container-game')
const divTry = document.querySelector('#try')

// ELEMENTS SELECT-WIN GAME
const winGame = document.querySelector('.container-win-game')
const playAgainBtn = document.querySelector('#play-again-btn')
const backToHome = document.querySelector('#back-to-home-btn')

function tryIsvalid(trySpeech, number) {
    if (!isNaN(trySpeech)) {
        tryOnScreen(trySpeech, number)
    } else {
        divTry.innerHTML = `
        <h2>
            You said: </br>
            "${trySpeech}" </br>
            This attempt is invalid!
        </h2>`
    }
}

function tryOnScreen(trySpeech, number) {
    if (trySpeech < number) {
        divTry.innerHTML = null
        divTry.innerHTML = `
        <h2 id="try-text">Say a number for start</h2>
        <h1 id="try-number">${trySpeech}</h1>
        <h2 id="try-help">My number is bigger</h2>`
    } else if (trySpeech > number) {
        divTry.innerHTML = null
        divTry.innerHTML = `
        <h2 id="try-text">Say a number for start</h2>
        <h1 id="try-number">${trySpeech}</h1>
        <h2 id="try-help">My number is smaller</h2>`
    } else {
        game.classList.add('hide')
        winGame.classList.remove('hide')
    }
}

function generateNumber() {
    let number = Math.floor(Math.random() * 1001)

    return number
}

function gameOn() {
    home.classList.add('hide')
    game.classList.remove('hide')

    const number = generateNumber()
    console.log(number)

    const functionRecognition = recognitionStart()

    functionRecognition.addEventListener('result', (result) => {
        const trySpeech = result.results[0][0].transcript
        tryIsvalid(trySpeech, number)
    })

    functionRecognition.addEventListener('end', () => functionRecognition.start())   
}

function recognitionStart() {
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
    const recognition = new SpeechRecognition() 
    recognition.lang = 'pt-BR'
    recognition.start()

    return recognition
}

howToPlayBtn.addEventListener('click', () => {
    howToPlay.classList.toggle('hide')
})

startBtn.addEventListener('click', gameOn)

playAgainBtn.addEventListener('click', () => {
    window.location.reload()
})
