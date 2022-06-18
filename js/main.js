let timerID = 0;
let totalCards = 0;
let totalTimer;
let gameDeck = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'];

function createCards() {
    gameDeck.sort(comparador);
    let usedDeck = [];
    let halfCards = totalCards / 2;
    for (let i = 0; i < halfCards; i++) {
        usedDeck.push(gameDeck[i]);
    }

    document.querySelector('.container-cards').innerHTML = '';

    for (let i = 0; i < 2; i++) {
        usedDeck.sort(comparador);
        for (let i = 0; i < usedDeck.length; i++) {

            document.querySelector('.container-cards').innerHTML += `
            <div onclick="clickCard(this)" class="animate__animated animate__jackInTheBox card" id="${usedDeck[i]}">
                <div class="front face">
                    <img src="assets/front.png" alt="carta">
                </div>
                <div class="back face">
                    <img src="assets/${usedDeck[i]}.gif">
                </div>
            </div>
            `;

        }
    }
}


let countClick = 1;
let countScoreClicks = 0;
let selectedCard1, selectedCard2;

function clickCard(element) { 
    if (countClick === 1) {
        selectedCard1 = element;
        addClickStatus(selectedCard1);
        countClick++;


    } else if (countClick === 2) {
        selectedCard2 = element;
        addClickStatus(selectedCard2);
        countClick = 0;

        if (selectedCard1.id === selectedCard2.id) {
            countClick = 1;
            totalCards = totalCards - 2;

        } else {
            removeAllClickStatus(selectedCard1, selectedCard2);

        }

    }

    if (totalCards === 0) {
        setTimeout(function () {
            clearInterval(timerID);
            document.querySelector('.content-end-game div h3').innerHTML = `PARABÉNS, VOCÊ USOU UM TOTAL DE <strong>${countScoreClicks}</strong> CLIQUES`;
            document.querySelector('.content-end-game div h4').innerHTML = `SEU TEMPO TOTAL FOI DE <strong>${totalTimer}</strong>`;
            showHideEndGame(200);
        }, 700);
    }

    if (countScoreClicks === 1) {
        startTimer();
    }
}


function addClickStatus(selectedCard) {
    selectedCard.removeAttribute('onclick');
    selectedCard.classList.add('card-selected');
    countScoreClicks++;
    document.querySelector('.counter-clicks').querySelector('span').innerHTML = countScoreClicks;
}


function removeAllClickStatus(card1, card2) {
    setTimeout(function () {
        card1.setAttribute('onclick', 'clickCard(this)');
        card2.setAttribute('onclick', 'clickCard(this)');
        card1.classList.remove('card-selected');
        card2.classList.remove('card-selected');
        countClick = 1;
    }, 1000);

}


function restartGame() {
    totalCards = 0;
    countClick = 1;
    countScoreClicks = 0;
    selectedCard1 = '';
    selectedCard2 = '';
    document.querySelector('.counter-clicks').querySelector('span').innerHTML = '0';
    document.querySelector('.timer-game').querySelector('span').innerHTML = '00:00:00';
    document.querySelector('.content-end-game div').classList.replace('animate__jackInTheBox', 'animate__hinge');

    startGame();
    showHideEndGame(2200);
}


function showHideEndGame(timeOut) {
    setTimeout(function () {
        document.querySelector('.content-end-game').classList.toggle('enable-content-end-game');
        document.querySelector('.content-end-game div').classList.replace('animate__hinge', 'animate__jackInTheBox');
    }, timeOut);
}


function startTimer() {
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
    timerID = setInterval(function() {
        milliseconds += 10;

        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;

            if (seconds === 60) {
                seconds = 0;
                minutes++;

                if (minutes === 60) {
                    minutes = 0;
                }
            }
        }

        let m = minutes < 10 ? '0' + minutes : minutes;
        let s = seconds < 10 ? '0' + seconds : seconds;
        let ms = milliseconds < 10 ? '00' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds;
        totalTimer = `${m}:${s}:${ms}`;

        document.querySelector('.timer-game span').innerHTML = totalTimer;
    }, 10);

}


function comparador() {
	return Math.random() - 0.5;
}


function startGame() {
    while(true) {
        totalCards = prompt('Olá, com quantas cartas você deseja jogar? Escolha um número par qualquer de 4 a 14');    
        if ((totalCards % 2) == 0 && totalCards <= 14) {
            break;
        } else {
            alert('Número inválido, escolha apenas números pares (2-4-6-8-10-12-14)');
        }
    }

    createCards();
}

startGame();