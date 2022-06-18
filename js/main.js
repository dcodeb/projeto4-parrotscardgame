let cartaClicada;
let totalCards = 0;
let gameDeck = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'];

function createCards() {
    gameDeck.sort(comparador);
    let usedDeck = [];
    let halfCards = totalCards / 2;
    for (let i = 0; i < halfCards; i++) {
        usedDeck.push(gameDeck[i]);
    }

    for (let i = 0; i < 2; i++) {
        usedDeck.sort(comparador);
        for (let i = 0; i < usedDeck.length; i++) {

            document.querySelector('.container-cards').innerHTML += `
            <div onclick="clickCard(this)" class="card" id="${usedDeck[i]}">
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
            setTimeout(function () {
                selectedCard1.setAttribute('onclick', 'clickCard(this)');
                selectedCard2.setAttribute('onclick', 'clickCard(this)');
                selectedCard1.classList.remove('card-selected');
                selectedCard2.classList.remove('card-selected');
                countClick = 1;
            }, 1000);

        }

    }

    if (totalCards === 0) {
        setTimeout(function () { alert(`Fim de jogo em ${countScoreClicks} jogadas`); }, 1000);
    }
}


function addClickStatus(selectedCard) {
    selectedCard.removeAttribute('onclick');
    selectedCard.classList.add('card-selected');
    countScoreClicks++;
    document.querySelector('.counter-clicks').querySelector('span').innerHTML = countScoreClicks;
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