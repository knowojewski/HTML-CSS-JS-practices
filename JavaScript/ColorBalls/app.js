const btn = document.querySelector('button');
const board = document.querySelector('.container');

btn.addEventListener('click', generateBall);

function generateBall() {
    let ball = document.createElement('div');
    ball.classList.add('ball', 'animate');


    board.appendChild(ball);
}

// // background-color: #fff
//         height: 50px
//         width: 50px
//         top: 800px