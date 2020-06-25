const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const hamburger = document.querySelector('.hamburger');
const navBig = document.querySelector('.navigation');
const navList = document.querySelector('.nav-list');

window.addEventListener('scroll', () => {
    if(window.scrollY > 200) {
        nav.classList.add('smaller-nav');
        logo.classList.add('change-pos');
        hamburger.classList.add('change-pos');
    } else {
        nav.classList.remove('smaller-nav');
        logo.classList.remove('change-pos');
        hamburger.classList.remove('change-pos');
    }
});


hamburger.addEventListener('click', () => {
    if(!hamburger.classList.contains('open')) {
        hamburger.classList.add('open');
        navBig.classList.add('show');
        navList.classList.add('pop');
    } else {
        hamburger.classList.remove('open');
        navBig.classList.remove('show');
        navList.classList.remove('pop');
    }
});


