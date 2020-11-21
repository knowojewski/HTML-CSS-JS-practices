// ======================================
//               SELECTORS
// ======================================


const controlPanelCreateBtn = document.querySelector('.control-panel__btn--create');
const controlPanelSaveBtn = document.querySelector('.control-panel__btn--save');
const controlPanelLoadBtn = document.querySelector('.control-panel__btn--load');
const addingBox = document.querySelector('.adding-box');
const addingBoxCloseBtn = document.querySelector('.adding-box__top-btn');
const addingBoxMain = document.querySelector('.adding-box__main');
const addingBoxContent = document.querySelector('.adding-box__content');


// ======================================
//             EVENT LISTENERS
// ======================================


controlPanelCreateBtn.addEventListener('click', openAddingBox);
addingBoxCloseBtn.addEventListener('click', closeAddingBox);


// ======================================
//               FUNCTIONS
// ======================================


function openAddingBox() {
    addingBox.classList.add('opened');
    controlPanelCreateBtn.setAttribute('disabled', '');
    controlPanelCreateBtn.classList.add('clicked');

    setTimeout(() => {
        addingBoxMain.classList.add('opened');

        setTimeout(() => {
            addingBoxContent.classList.add('opened');
        }, 800);

    }, 500);
}

function closeAddingBox() {
    addingBoxContent.classList.remove('opened');
    setTimeout(() => {
        addingBoxMain.classList.remove('opened');

        setTimeout(() => {
            addingBox.classList.remove('opened');
            controlPanelCreateBtn.removeAttribute('disabled');
            controlPanelCreateBtn.classList.remove('clicked');
        }, 800);
    }, 200);
}

