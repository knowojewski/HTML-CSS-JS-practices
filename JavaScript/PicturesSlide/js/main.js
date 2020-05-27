const button = document.querySelector('.arrow');
const arrow = document.querySelector('.fas');
const img = document.querySelector('.item1');

button.addEventListener('click', slideImg);

function slideImg() {

    if(img.classList.contains('show')) {
        img.classList.remove('show');
        arrow.firstChild.style.transform = "rotate(360deg)";
    } else {
        img.classList.add('show');
        arrow.firstChild.style.transform = "rotate(180deg)";
    }
    
}