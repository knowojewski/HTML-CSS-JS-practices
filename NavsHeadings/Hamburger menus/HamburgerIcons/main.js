const icon1 = document.querySelector('.menu-icon');
const icon2 = document.querySelector('.menu-icon1');
const icon3 = document.querySelector('.menu-icon3');

icon1.addEventListener('click', () => {
    if(!icon1.classList.contains('open')) {
        icon1.classList.remove('close');
        icon1.classList.add('open');
    } else {
        icon1.classList.remove('open');
        icon1.classList.add('close');
    }
});


icon2.addEventListener('click', () => {
    if(!icon2.classList.contains('clicked')) {
        icon2.classList.add('clicked');
    } else {
        icon2.classList.remove('clicked');
    }
});

icon3.addEventListener('click', () => {
    if(!icon3.classList.contains('clicked')) {
        icon3.classList.add('clicked');
    } else {
        icon3.classList.remove('clicked');
    }
});