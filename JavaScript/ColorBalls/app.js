const btn = document.querySelector('button');
const board = document.querySelector('.container');

btn.addEventListener('click', generateBall);

function generateBall() {
    let ball = document.createElement('div');
    let heightWidth = Math.floor(Math.random()*50);
    let top = Math.floor(Math.random()*800);
    let rgb1 = Math.floor(Math.random()*255);
    let rgb2 = Math.floor(Math.random()*255);
    let rgb3 = Math.floor(Math.random()*255);

    ball.classList.add('ball', 'animate');
    ball.style.backgroundColor = `rgb(${rgb1}, ${rgb2}, ${rgb3})`;
    ball.style.height = `${heightWidth}px`;
    ball.style.width = `${heightWidth}px`;
    ball.style.top = `${top}px`;


    board.appendChild(ball);
}

// // background-color: #fff
//         height: 50px
//         width: 50px
//         top: 800px