let cartaClicada;
let totalCards = 0;
let gameDeck = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'];

function createCards() {
    gameDeck.sort(comparador);
    let deckUsado = [];
    for (let i = 0; i < (totalCards / 2); i++) {
        deckUsado.push(gameDeck[i]);
    }

    for (let i = 0; i < 2; i++) {
        deckUsado.sort(comparador);
        for (let i = 0; i < deckUsado.length; i++) {

            document.querySelector('.container-cards').innerHTML += `
            <div onclick="clickCard(this)" class="card" id="${deckUsado[i]}">
                <div class="front face">
                    <img src="assets/front.png" alt="carta">
                </div>
                <div class="back face">
                    <img src="assets/${deckUsado[i]}.gif">
                </div>
            </div>
            `;

        }
    }
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

let contador = 1;
let card1, card2;
function clickCard(element) {

    console.log(contador);

    if (contador === 2) {
        // comparar cartas
        card2 = element;
        card2.removeAttribute('onclick');
        contador = 0;
        element.querySelector('div .back').classList.add('reverse');
        if (card1.id === card2.id) {
            console.log('iguais');
            contador = 1;
        } else {
            setTimeout(function () {
                card1.setAttribute('onclick', 'clickCard(this)');
                card2.setAttribute('onclick', 'clickCard(this)');
                card1.querySelector('div .back').classList.remove('reverse');
                card2.querySelector('div .back').classList.remove('reverse');
                contador = 1;
            }, 1000);
        }
    } else if (contador === 1) {
        card1 = element;
        card1.removeAttribute('onclick');
        contador++;
        element.querySelector('div .back').classList.add('reverse');
    }

}

function comparador() { 
	return Math.random() - 0.5;
}

startGame();