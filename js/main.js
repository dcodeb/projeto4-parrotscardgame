let totalCards = 0;

function startGame() {

    while(true) {
        totalCards = prompt('Olá, com quantas cartas você deseja jogar? Escolha um número par qualquer de 4 a 14');    
        if ((totalCards % 2) == 0 && totalCards <= 14) {
            break;
        } else {
            alert('Número inválido, escolha apenas números pares (2-4-6-8-10-12-14)');
        }
    }

    const templateCard = `
    <div class="card">
        <img src="assets/front.png" alt="carta">
    </div>
    `;

    for (let i = 0; i < totalCards; i++) {
        document.querySelector('.container-cards').innerHTML += templateCard;
    }

}

startGame();