// ======================================
//               VARIABLES
// ======================================


let currentWarscroll = document.createElement('div');
let currentWarscrolls = [];


// ======================================
//               FUNCTIONS
// ======================================


// LOAD PRINTSHEETS FROM LOCAL STORAGE


function displayPrintSheets() {
    const printSheets = storage.getPrintSheets();
    printSheets.forEach(printSheet => {
        createPrintSheetLoad(printSheet.name);
    });
}


// CREATE PRINT SHEET AND ADD TO LOAD VIEW


function createPrintSheetLoad(name) {
    const loadItem = document.createElement('div');
    const loadItemName = document.createElement('a');
    const loadItemBtn = document.createElement('button');
    
    loadItem.className = 'load-item';
    loadItemName.setAttribute('href', '#');
    loadItemName.className = 'load-item__name';
    loadItemBtn.className = 'load-item__delete';

    loadItemName.innerHTML = `${name}`;
    loadItemBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;

    loadItemBtn.addEventListener('click', deletePrintSheet);

    loadItem.append(loadItemName);
    loadItem.append(loadItemBtn);

    loadBoxForm.append(loadItem);
}


// CREATING WARSCROLL CARD


function createWarscroll(mount) {
    let idDate = new Date();
    let idNumber = idDate.valueOf();

    const warscroll = new Warscroll();
    warscroll.allegiance = unitInfos[0].value;
    warscroll.name = unitInfos[1].value;
    warscroll.mount = unitInfos[2].value;
    warscroll.move = unitInfos[3].value;
    warscroll.save = unitInfos[4].value;
    warscroll.wounds = unitInfos[5].value;
    warscroll.bravery = unitInfos[6].value;
    warscroll.id = idNumber;

    createWeapons(warscroll);
    createAbilities(warscroll);
    createKeywords(warscroll);

    currentWarscrolls.push(warscroll);

    let keywordsArray = [];
    warscroll.keywords.forEach(item =>  keywordsArray.push(item.name));

    let weaponsArray = [];
    warscroll.weapons.forEach(item => weaponsArray.push(item.name));

    let newWarscroll = document.createElement('div');
    let warscrollFront = document.createElement('div');
    let warscrollTop = document.createElement('div');
    let warscrollStats = document.createElement('div');
    let warscrollKeywords = document.createElement('div');
    let warscrollWeaponsAbilities = document.createElement('div');
    let warscrollWeapons = document.createElement('div');
    let warscrollWeaponsStats = document.createElement('div');
    let warscrollAbilities = document.createElement('div');
    let warscrollPanel = document.createElement('div');
    let warscrollPanelDelete = document.createElement('button');
    let warscrollID = document.createElement('p');

    newWarscroll.className = 'warscroll';
    warscrollFront.className = 'warscroll-front';
    warscrollTop.className = 'warscroll-top';
    warscrollStats.className = 'warscroll-stats';
    warscrollKeywords.className = 'warscroll-keywords';
    warscrollWeaponsAbilities.className = 'warscroll-weapons-abilities';
    warscrollWeapons.className = 'warscroll-weapons';
    warscrollWeaponsStats.className = 'weapons-stats';
    warscrollAbilities.className = 'warscroll-abilities';
    warscrollPanel.className = 'warscroll-panel';
    warscrollPanelDelete.className = 'btn warscroll-delete';
    warscrollID.className = 'warscroll-id';

    warscrollTop.innerHTML = `
        <div class="warscroll-top-name">
            <p>${warscroll.name}</p>
            <p>${mount}</p>
        </div>
        <div class="warscroll-top-weapons">
            <p>${weaponsArray.join(' / ')}</p>
        </div>
    `;
    warscrollStats.innerHTML = `
        <div class="stats-box">
            <i class="fas fa-external-link-alt"></i>
            <span>${warscroll.move}"</span>
        </div>
        <div class="stats-box">
            <i class="fas fa-shield-alt"></i>
            <span>${warscroll.save}+</span>
        </div>
        <div class="stats-box">
            <i class="fas fa-skull"></i>
            <span>${warscroll.wounds}</span>
        </div>
        <div class="stats-box">
            <i class="fas fa-star"></i>
            <span>${warscroll.bravery}</span>
        </div>
    `;
    warscrollKeywords.innerHTML = `<p>${keywordsArray.join(', ')}</p>`;
    warscrollWeaponsStats.innerHTML = `
        <p></p>
        <p>Range</p>
        <p>Attack</p>
        <p>To Hit</p>
        <p>To Wound</p>
        <p>Rend</p>
        <p>Dmg</p>
    `;

    warscrollWeapons.appendChild(warscrollWeaponsStats);
    warscroll.weapons.forEach(item => {
        let warscrollWeapon = document.createElement('div');
        warscrollWeapon.className = 'weapon';
        let icon;
        let str = item.name;
        let matches = str.match(/\b(\w)/g);
        let acronym = matches.join('');

        if(item.type === 'Ranged') {
            icon = '<i class="fas fa-expand-arrows-alt"></i>';
        } else {
            icon = '<i class="fas fa-gavel"></i>';
        }

        warscrollWeapon.innerHTML = `
            <p>${acronym}</p>
            <p>${icon} ${item.range}"</p>
            <p>${item.attack}</p>
            <p>${item.hit}+</p>
            <p>${item.wound}+</p>
            <p>-${item.rend}</p>
            <p>${item.damage}</p>
        `;

        warscrollWeapons.appendChild(warscrollWeapon);
    });

    warscroll.abilities.forEach(item => {
        let warscrollAbility = document.createElement('div');
        warscrollAbility.className = 'ability';

        let str = item.type;
        let matches = str.match(/\b(\w)/g);
        let acronym = matches.join('');

        warscrollAbility.innerHTML = `
            <p class="ability-type">
                ${acronym} 
            </p>
            <p class="ability-name">
                ${item.name}: 
            </p>
            <p class="ability-desc">
                ${item.description}
            </p>
        `;

        warscrollAbilities.appendChild(warscrollAbility);
    });
    warscrollID.innerHTML = `${warscroll.id}`;
    warscrollPanelDelete.innerHTML = '<i class="far fa-trash-alt"></i>';

    warscrollPanelDelete.addEventListener('click', deleteWarscroll);
    
    warscrollWeaponsAbilities.appendChild(warscrollWeapons);
    warscrollWeaponsAbilities.appendChild(warscrollAbilities);
    
    warscrollFront.appendChild(warscrollTop);
    warscrollFront.appendChild(warscrollStats);
    warscrollFront.appendChild(warscrollWeaponsAbilities);
    warscrollFront.appendChild(warscrollKeywords);
    warscrollFront.appendChild(warscrollID);

    warscrollPanel.append(warscrollPanelDelete);
    
    newWarscroll.appendChild(warscrollFront);
    newWarscroll.appendChild(warscrollPanel);
    newWarscroll.addEventListener('click', pointWarscroll); 

    pdfFile.appendChild(newWarscroll);

    splitWarscroll(newWarscroll);
    console.log(currentWarscrolls);
}

// CREATING WEAPON OBJECTS AND ADDING TO WARSCROLL CARD

function createWeapons(warscroll) {
    const allWeaponsInputs = document.querySelectorAll('.weapon-add');

    allWeaponsInputs.forEach(item => {
        let weaponName = item.children[0].value;
        let weaponType = item.children[1].value;
        let weaponRange = item.children[2].value;
        let weaponAttack = item.children[3].value;
        let weaponHit = item.children[4].value;
        let weaponWound = item.children[5].value;
        let weaponRend = item.children[6].value;
        let weaponDamage = item.children[7].value;

        const weapon = new Weapon();
        weapon.name = weaponName;
        weapon.type = weaponType;
        weapon.range = weaponRange;
        weapon.attack = weaponAttack;
        weapon.hit = weaponHit;
        weapon.wound = weaponWound;
        weapon.rend = weaponRend;
        weapon.damage = weaponDamage;

        warscroll.weapons.push(weapon);
    });
}

// CREATING ABILITY OBJECTS AND ADDING TO WARSCROLL CARD

function createAbilities(warscroll) {
    const allAbilityInputs = document.querySelectorAll('.ability-add');

    allAbilityInputs.forEach(item => {
        let abilityType = item.children[0].value;
        let abilityName = item.children[1].value;
        let abilityDesc = item.children[2].value;

        const newAbility = new Ability();

        newAbility.type = abilityType;
        newAbility.name = abilityName;
        newAbility.description = abilityDesc;

        warscroll.abilities.push(newAbility);
    });
}

// CREATING KEYWORD OBJECTS AND ADDING TO WARSCROLL CARD

function createKeywords(warscroll) {
    const allKeywordsInputs = document.querySelectorAll('.keyword-add');

    allKeywordsInputs.forEach(item => {
        let keywordName = item.children[0].value;

        const newKeyword = new Keyword();

        newKeyword.name = keywordName;

        warscroll.keywords.push(newKeyword);
    });
}

// CHECKING IF UNIT HAS A MOUNT

function checkIfMount() {
    let mount = document.createElement('p');

    if(unitInfos[2].value === '') {
        mount = '';
    } else {
        mount= `ON ${unitInfos[2].value}`;
    }

    return mount;
}

// CHECK IF WARSCROLL INFOS OVERFLOWS CARD, IF THEY DO, CREATING ANOTHER CARD (BACKSIDE) 

function splitWarscroll(warscroll) {
    let front = warscroll.children[0];
    let array = Array.from(front.children);
    let result = 0;

    array.forEach( item => {
        result += item.offsetHeight;
    });

    if(result > 230) {
        console.log('Is higher!');
        const warscrollBack = document.createElement('div');
        warscrollBack.className = 'warscroll-back';
        const frontTop = warscroll.children[0].children[0];
        const backTop = document.createElement('div');
        backTop.className = 'warscroll-top';
        const frontKeywords = warscroll.children[0].children[3];
        const backKeywords = document.createElement('div');
        backKeywords.className = 'warscroll-keywords';
        const frontAbilities = warscroll.children[0].children[2].children[1];
        const frontAbilitiesArray = Array.from(warscroll.children[0].children[2].children[1].children);
        const backAbilities = document.createElement('div');
        backAbilities.className = 'warscroll-abilities';

        let newResult = result;
        
        for(let i = frontAbilitiesArray.length-1; i >= 0; i--) {
            if(newResult>228) {
                console.log('Is higher in a loop!');
                console.log(frontAbilitiesArray[i]);
                newResult -= frontAbilitiesArray[i].offsetHeight;
                frontAbilities.removeChild(frontAbilities.lastChild);

                backAbilities.prepend(frontAbilitiesArray[i]);
                frontAbilitiesArray.splice(i, 1);
            } else {
                break;
            }
        }

        console.log(frontAbilitiesArray);

        backTop.innerHTML = frontTop.innerHTML;
        backKeywords.innerHTML = frontKeywords.innerHTML;
        warscrollBack.appendChild(backTop);
        warscrollBack.appendChild(backAbilities);
        warscrollBack.appendChild(backKeywords);
        warscroll.appendChild(warscrollBack);
    }
}


// DELETE OBJECT FROM CURRENTWARSCROLLS ARRAY


function deleteFromCurrentWarscrolls(id) {
    currentWarscrolls.forEach( (warscroll, index) => {
        if(warscroll.id === parseInt(id)) {
            currentWarscrolls.splice(index, 1);
        }
    });
}





