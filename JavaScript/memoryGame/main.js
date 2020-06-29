const board = document.querySelector('.game-board');
const play = document.querySelector('.play');
const score = document.querySelector('.score');

let cardArr = [];
let result = 0;


const loadEventListeners = () => {
    play.addEventListener('click', loadBoard)
};



// -------- Loading Board ------------


function loadBoard() {
    play.innerText = 'TRY AGAIN';
    board.innerHTML = '';
    cardArr = [];
    result = 0;
    score.innerHTML = result;
    
    for(let i = 0; i < 12; i++) {
        const cardContainer = document.createElement('div');
        const card = document.createElement('div');
        const front = document.createElement('figure');
        const back = document.createElement('figure');
        
        cardContainer.className = 'card-container';
        card.className = 'card';
        front.className = 'front';
        back.className = 'back';

        front.innerHTML = '<i class="fas fa-hand-pointer"></i>';

        card.appendChild(front);
        card.appendChild(back);
        cardContainer.appendChild(card);

        cardContainer.addEventListener('click', rotateBlock);

        board.appendChild(cardContainer);
    }

    const allBacks = document.querySelectorAll('.back');
    let num = 0;

    for(let j = 0; j < 12; j += 2) {
        allBacks[j].setAttribute('id', num);
        allBacks[j + 1].setAttribute('id', num);
        
        const icon = icons[num].icon
        allBacks[j].innerHTML = icon;
        allBacks[j + 1].innerHTML = icon;
        num++;
    }

    const allCards = document.querySelectorAll('.card-container');

    allCards.forEach(item => {
        item.style.order = Math.floor(Math.random()*100);
    });

};



// --------- Rotating Block ------------


function rotateBlock(event) {
    this.classList.add('rotate');
    
    cardArr.push(this);
    cardArr[0].removeEventListener('click', rotateBlock);
    if(cardArr.length === 2) {
        checkIfMatches(cardArr);
    }
};


// --------- Check if Cards Matches ---------


const checkIfMatches = cards => {
    const firstFigure = cards[0].children[0].children[1];
    const secondFigure = cards[1].children[0].children[1];
    const allCards = document.querySelectorAll('.card-container');

    if (firstFigure.innerHTML === secondFigure.innerHTML) {
        result++;
        score.innerText = result;

        cardArr.forEach( item => {
            item.removeEventListener('click', rotateBlock);
            item.style.cursor = 'auto';
        });

        cardArr = [];
    } else {
        allCards.forEach(item => item.removeEventListener('click', rotateBlock));

        setTimeout(() => {
            cards.forEach(item => item.classList.remove('rotate') );
            allCards.forEach(item => item.addEventListener('click', rotateBlock));
        }, 1000);
        
        cardArr = [];
    }
};




document.addEventListener('DOMContentLoaded', loadEventListeners);