// ======================================
//               SELECTORS
// ======================================


const controlPanelCreateBtn = document.querySelector('.control-panel__btn--create');
const controlPanelSaveBtn = document.querySelector('.control-panel__btn--save');
const controlPanelLoadBtn = document.querySelector('.control-panel__btn--load');

const saveBox = document.querySelector('.operation-box--save');
const saveBoxCloseBtn = document.querySelector('.operation-box__top-btn--save');
const saveBoxMain = document.querySelector('.operation-box__main--save');
const saveBoxContent = document.querySelector('.operation-box__content--save');
const saveBoxInput = document.querySelector('#saveBoxInput');
const saveBtnCancel = document.querySelector('.operation-box__btn--save-cancel');
const saveBtnAccept = document.querySelector('.operation-box__btn--save-accept');

const loadBox = document.querySelector('.operation-box--load');
const loadBoxCloseBtn = document.querySelector('.operation-box__top-btn--load');
const loadBoxMain = document.querySelector('.operation-box__main--load');
const loadBoxForm = document.querySelector('.operation-box__form--load');
const loadBoxContent = document.querySelector('.operation-box__content--load');
const loadBtnCancel = document.querySelector('.operation-box__btn--load-cancel');
const loadBtnAccept = document.querySelector('.operation-box__btn--load-accept');

const messageBox = document.querySelector('.message-box');
const messageBoxContent = document.querySelector('.message-box__message');

const addingBox = document.querySelector('.adding-box');
const addingBoxCloseBtn = document.querySelector('.adding-box__top-btn');
const addingBoxMain = document.querySelector('.adding-box__main');
const addingBoxContent = document.querySelector('.adding-box__content');
const unitInfos = document.querySelectorAll('#unit-info-text');
const addWarscroll = document.querySelector('#addWarscroll');
const clearFields = document.querySelector('#clearFields');
const addWeapon = document.querySelector('#addWeapon');
const addAbility = document.querySelector('#addAbility');
const addKeyword = document.querySelector('#addKeyword');
const lowerSide = document.querySelectorAll('.lower-side');

const pdfFile = document.querySelector('.main-view__print-view');
const generateBtn = document.querySelector('.generate-btn');
const storage = new Storage();

// ======================================
//             EVENT LISTENERS
// ======================================


controlPanelCreateBtn.addEventListener('click', openAddingBox);
addingBoxCloseBtn.addEventListener('click', closeAddingBox);
addWarscroll.addEventListener('click', addWarscrollToView);
clearFields.addEventListener('click', clearAllFields);
addWeapon.addEventListener('click', addUnitWeapon);
addAbility.addEventListener('click', addUnitAbility);
addKeyword.addEventListener('click', addUnitKeyword);

controlPanelSaveBtn.addEventListener('click', openSaveBox);
saveBoxCloseBtn.addEventListener('click', closeSaveBox);
saveBtnCancel.addEventListener('click', closeSaveBox);
saveBtnAccept.addEventListener('click', savePrinSheet);

controlPanelLoadBtn.addEventListener('click', openLoadBox);
loadBoxCloseBtn.addEventListener('click', closeLoadBox);
loadBtnCancel.addEventListener('click', closeLoadBox);

generateBtn.addEventListener('click', () => { window.print() });  
window.addEventListener('mouseup', e => {           // Closing warscroll panel when clicking on something else
    if(e.target === currentWarscroll) {
    } else {
        currentWarscroll.className = 'warscroll-panel';
    }
});
window.addEventListener('DOMContentLoaded', () => {
    displayPrintSheets();
});


// ======================================
//               FUNCTIONS
// ======================================


// OPEN AND CLOSE ADDING BOX


function openAddingBox() {
    checkIfOpened()

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


// OPEN AND CLOSE SAVE BOX


function openSaveBox() {
    checkIfOpened()

    saveBox.classList.add('opened');
    controlPanelSaveBtn.setAttribute('disabled', '');
    controlPanelSaveBtn.classList.add('clicked');

    setTimeout(() => {
        saveBoxMain.classList.add('opened');

        setTimeout(() => {
            saveBoxContent.classList.add('opened');
        }, 800);

    }, 500);
}

function closeSaveBox() {
    saveBoxContent.classList.remove('opened');
    setTimeout(() => {
        saveBoxMain.classList.remove('opened');

        setTimeout(() => {
            saveBox.classList.remove('opened');
            controlPanelSaveBtn.removeAttribute('disabled');
            controlPanelSaveBtn.classList.remove('clicked');
        }, 800);
    }, 200);
}


// OPEN AND CLOSE LOAD BOX


function openLoadBox() {
    checkIfOpened()

    loadBox.classList.add('opened');
    controlPanelLoadBtn.setAttribute('disabled', '');
    controlPanelLoadBtn.classList.add('clicked');

    setTimeout(() => {
        loadBoxMain.classList.add('opened');

        setTimeout(() => {
            loadBoxContent.classList.add('opened');
        }, 800);

    }, 500);
}

function closeLoadBox() {
    loadBoxContent.classList.remove('opened');
    setTimeout(() => {
        loadBoxMain.classList.remove('opened');

        setTimeout(() => {
            loadBox.classList.remove('opened');
            controlPanelLoadBtn.removeAttribute('disabled');
            controlPanelLoadBtn.classList.remove('clicked');
        }, 800);
    }, 200);
}


// CHECK IF ANY OPERATION BOX IS OPENED


function checkIfOpened() {
    if(addingBox.classList.contains('opened')) {
        closeAddingBox();

    } else if(saveBox.classList.contains('opened')) {
        closeSaveBox();

    } else if (loadBox.classList.contains('opened')) {
        closeLoadBox();

    } 
}


// ADDING WARSCROLL CARD TO PRINT VIEW, CLEARING FIELDS


function addWarscrollToView(e) {
    let mount = checkIfMount();
    createWarscroll(mount);

    e.preventDefault();
}

function clearAllFields(e) {
    lowerSide.forEach( item => { item.innerHTML = '' });
    unitInfos.forEach( item => { item.value = '' });
    
    e.preventDefault();
}

// ADDING INPUTS TO CREATE WEAPON OBJECT

function addUnitWeapon(e) {
    let newWeapon = document.createElement('div');
    newWeapon.className = 'weapon-add attribute';
    newWeapon.innerHTML = `
        <input type="text" id="weaponName" placeholder="Name">
        <select id="abilityType">
            <option value="Melee">Melee</option>
            <option value="Ranged">Ranged</option>
        </select>
        <input type="text" id="weaponRange" placeholder="Range">
        <input type="text" id="weaponAttack" placeholder="Attack">
        <input type="text" id="weaponHit" placeholder="To Hit">
        <input type="text" id="weaponWound" placeholder="To Wound">
        <input type="text" id="weaponRend" placeholder="Rend">
        <input type="text" id="weaponDamage" placeholder="Damage">`;

    const addDeleteBtn = createDeleteBtn();

    newWeapon.append(addDeleteBtn);
    lowerSide[0].appendChild(newWeapon); 
    
    e.preventDefault();
}

// ADDING INPUTS TO CREATE ABILITY OBJECT

function addUnitAbility(e) {
    let newAbility = document.createElement('div');
    newAbility.className = 'ability-add attribute';
    newAbility.innerHTML = `
        <select id="abilityType">
            <option value="Ability">Ability</option>
            <option value="Command Ability">Command Ability</option>
            <option value="Spell">Spell</option>
        </select>
        <input type="text" id="abilityName" placeholder="Name">
        <input type="text" id="abilityDesc" placeholder="Description">`;

    const addDeleteBtn = createDeleteBtn();

    newAbility.append(addDeleteBtn);
    lowerSide[1].appendChild(newAbility);

    e.preventDefault();
}

// ADDING INPUTS TO CREATE KEYWORD OBJECT

function addUnitKeyword(e) {
    let newKeyword = document.createElement('div');
    newKeyword.className = 'keyword-add attribute';
    newKeyword.innerHTML = `
        <input type="text" id="keywordName" placeholder="Name">`;

    const addDeleteBtn = createDeleteBtn();

    newKeyword.append(addDeleteBtn);
    lowerSide[2].appendChild(newKeyword);

    e.preventDefault();
}


// CREATING DELETE BUTTON TO INPUTS


function createDeleteBtn() {
    const addDeleteBtn = document.createElement('button');
    addDeleteBtn.className = 'attributes-btn';
    addDeleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    addDeleteBtn.addEventListener('click', function(e){
        const attribute = e.target.closest('.attribute');
        attribute.remove();
        e.preventDefault();
    });

    return addDeleteBtn;
}


// CLICK ON WARSCROLL


function pointWarscroll(elem) {
    currentWarscroll = elem.target.closest('.warscroll').children[1];
    currentWarscroll.classList.add('turn-on');
}


// DELETE WARSCROLL FROM PRINT SHEET


function deleteWarscroll(e) {
    const warscrollToDelete = e.target.closest('.warscroll');
    const warscrollId = warscrollToDelete.firstChild.lastChild.innerHTML;

    warscrollToDelete.remove();
    deleteFromCurrentWarscrolls(warscrollId);
}


// SAVE PRINT SHEET


function savePrinSheet() {
    const sheetName = saveBoxInput.value;

    if(sheetName === '') {
        const message = 'You must name your Print Sheet!';
        const color = 'warning';
        displayMessageBox(message, color);

    } else if(pdfFile.innerHTML === '') {
        const message = 'Sheet you want to save is empty!';
        const color = 'warning';
        displayMessageBox(message, color);
    } else {
        const message = 'Sheet has been saved!';
        const color = 'success';
        const printSheet = new PrintSheet(sheetName);
        
        printSheet.warscrolls = [...currentWarscrolls];

        storage.savePrintSheet(printSheet);
        createPrintSheetLoad(printSheet.name);
        displayMessageBox(message, color);
    }
}


// DELETE PRINT SHEET


function deletePrintSheet(e) {
    console.log(e.target.closest('.load-item'));
}


// DISPLAY MESSAGE


function displayMessageBox(message, color) {
    messageBox.classList.add(color);
    messageBox.classList.add('active');
    messageBoxContent.innerHTML = message;
    setTimeout(() => {
        messageBox.classList.remove('warning');
        messageBox.classList.remove('active');
        messageBoxContent.innerHTML = '';
    }, 2000);
}