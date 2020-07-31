const boardBg = document.querySelector('.board-bg');
const board = document.querySelector('.game-board');
const level = document.querySelector('.level-box select');
const play = document.querySelectorAll('.play');
const modal = document.querySelector('.modal-board');
const score = document.querySelector('.score');
const cancel = document.querySelector('.cancel');
const difficulty = document.querySelector('.difficulty');

let cardArr = [];
let result = 0;


const loadEventListeners = () => {
    play.forEach( item => { item.addEventListener('click', loadBoard) });
    cancel.addEventListener('click', closeModal);
};



// -------- Loading Board ------------


function loadBoard() {
    modal.classList.add('open');
    difficulty.innerText = level.value.toUpperCase();
    board.innerHTML = '';
    cardArr = [];
    result = 0;
    score.innerHTML = result;
    
    if(level.value === 'easy') {
        console.log('Difficulty easy');
        boardBg.classList.remove('normal-bg');
        boardBg.classList.remove('hard-bg');
        boardBg.classList.add('easy-bg');
        board.classList.remove('normal');
        board.classList.remove('hard');
        board.classList.add('easy');
        for(let i = 0; i < 12; i++) {
            createCard();
        }
        shuffleCards(12);

    } else if(level.value === 'normal') {
        console.log('Difficulty normal');
        boardBg.classList.remove('easy-bg');
        boardBg.classList.remove('hard-bg');
        boardBg.classList.add('normal-bg');
        board.classList.remove('easy');
        board.classList.remove('hard');
        board.classList.add('normal');
        for(let i = 0; i < 18; i++) {
            createCard();
        }
        shuffleCards(18);

    } else if(level.value === 'hard') {
        console.log('Difficulty hard');
        boardBg.classList.remove('easy-bg');
        boardBg.classList.remove('normal-bg');
        boardBg.classList.add('hard-bg');
        board.classList.remove('easy');
        board.classList.remove('normal');
        board.classList.add('hard');
        for(let i = 0; i < 24; i++) {
            createCard();
        }
        shuffleCards(24);
    }
};


// -------- Creating Cards ------------


function createCard() {
    const cardContainer = document.createElement('div');
    const card = document.createElement('div');
    const front = document.createElement('figure');
    const back = document.createElement('figure');
    
    cardContainer.className = 'card-container not-guessed';
    card.className = 'card';
    front.className = 'front';
    back.className = 'back';

    card.appendChild(front);
    card.appendChild(back);
    cardContainer.appendChild(card);

    cardContainer.addEventListener('click', rotateBlock);

    board.appendChild(cardContainer);
}


// --------- Shuffle Cards ------------


function shuffleCards(number) {
    console.log(number);
    const allBacks = document.querySelectorAll('.back');
    let num = 0;
    console.log(allBacks);

    for(let j = 0; j < number; j += 2) {
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
}


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
    const guessedCards = document.querySelectorAll('.rotate');

    if (firstFigure.innerHTML === secondFigure.innerHTML) {
        result++;
        score.innerText = result;

        cardArr.forEach( item => {
            item.removeEventListener('click', rotateBlock);
            item.style.cursor = 'auto';
            item.classList.remove('not-guessed');
            item.classList.add('guessed');
        });

        cardArr = [];
    } else {
        allCards.forEach(item => item.removeEventListener('click', rotateBlock));

        setTimeout(() => {
            cards.forEach(item => item.classList.remove('rotate') );
            allCards.forEach(item => {
                if(!item.classList.contains('rotate')) {
                    item.addEventListener('click', rotateBlock);
                };
            });
        }, 1000);
        
        cardArr = [];
    }
};


// --------- Close Modal ---------


function closeModal() {
    modal.classList.remove('open');
}



document.addEventListener('DOMContentLoaded', loadEventListeners);