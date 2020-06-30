const parallax = (element, distance, speed) => {
    const item = document.querySelector(element);
    item.style.transform = `translateY(${distance * speed}px)`;
};


window.addEventListener('scroll', function() {
    parallax('.left-shape', window.scrollY, 0.2);
    parallax('.right-shape', window.scrollY, 0.3);
    // parallax('.forest', window.pageYOffset, 0.4);
    // parallax('.moon', window.scrollY, 0.5);
    parallax('h1', window.scrollY, 0.25);
    parallax('h3', window.scrollY, 0.25);
});