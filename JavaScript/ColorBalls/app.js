const btn = document.querySelector('button');
const board = document.querySelector('.container');

btn.addEventListener('click', generateBall);

function generateBall() {
    let ball = document.createElement('div');
    ball.classList.add('ball', 'animate');
    ball.style.backgroundColor = `rgb(126, 145, 255)`;
    ball.style.height = `50px`;
    ball.style.width = `50px`;
    ball.style.top = `800px`;


    board.appendChild(ball);
}

// // background-color: #fff
//         height: 50px
//         width: 50px
//         top: 800px