// ======================================
//               SELECTORS
// ======================================

const pdfFile = document.querySelector('.pdf-view');
const generateBtn = document.querySelector('.generate-btn');
const addWarscroll = document.querySelector('#addWarscroll');

const unitInfos = document.querySelectorAll('#unit-info-text');
const addWeapon = document.querySelector('#addWeapon');
const addAbility = document.querySelector('#addAbility');
const addKeyword = document.querySelector('#addKeyword');
const lowerSide = document.querySelectorAll('.lower-side');


// ======================================
//            EVENT LISTENERS
// ======================================

generateBtn.addEventListener('click', getPDF);  
addWarscroll.addEventListener('click', addWarscrollToView);
addWeapon.addEventListener('click', addUnitWeapon);
addAbility.addEventListener('click', addUnitAbility);
addKeyword.addEventListener('click', addUnitKeyword);


// ======================================
//               FUNCTIONS
// ======================================


function createWarscroll(mount) {
    const warscroll = new Warscroll();
    warscroll.allegiance = unitInfos[0].value;
    warscroll.name = unitInfos[1].value;
    warscroll.mount = unitInfos[2].value;
    warscroll.move = unitInfos[3].value;
    warscroll.save = unitInfos[4].value;
    warscroll.wounds = unitInfos[5].value;
    warscroll.bravery = unitInfos[6].value;

    createWeapons(warscroll);
    createAbilities(warscroll);
    createKeywords(warscroll);

    let keywordsArray = [];
    warscroll.keywords.forEach(item =>  keywordsArray.push(item.name));

    let weaponsArray = [];
    warscroll.weapons.forEach(item => weaponsArray.push(item.name));

    let newWarscroll = document.createElement('div');
    newWarscroll.className = 'warscroll';
    newWarscroll.innerHTML = `
        <div class="warscroll-top">
            <div class="warscroll-top-name">
                <p>${warscroll.name}</p>
                <p>${mount}</p>
            </div>
            <div class="warscroll-top-weapons">
                <p>${weaponsArray.join(' / ')}</p>
            </div>
        </div>

        <div class="warscroll-stats">
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
        </div>

        <div class="warscroll-weapons-abilities">
            <div class="warscroll-weapons">
                <div class="weapons-stats">
                    <p></p>
                    <p>Range</p>
                    <p>Attack</p>
                    <p>To Hit</p>
                    <p>To Wound</p>
                    <p>Rend</p>
                    <p>Dmg</p>
                </div>
            </div>
            <div class="warscroll-abilities">
                <div class="ability">
                    <p class="ability-name">
                        Chaos Runeshield: 
                    </p>
                    <p class="ability-desc">
                        On 5+ negate NW or MW
                    </p>
                </div>
                <div class="ability">
                    <p class="ability-name">
                        Impaling Charge:
                    </p>
                    <p class="ability-desc">
                        +1 Dmg and +2 Rend to CL, if charged
                    </p>
                </div>
                <div class="ability">
                    <p class="ability-name">
                        Terrifying Champions:
                    </p>
                    <p class="ability-desc">
                        -1 to enemy bravery, in 3"
                    </p>
                </div>
            </div> 
        </div>

        <div class="warscroll-keywords">
            <p>${keywordsArray.join(', ')}</p>
        </div>`

    const weaponsTable = document.querySelector('.warscroll-weapons');
    warscroll.weapons.forEach(item => {
        let newWeapon = document.createElement('div');
        newWeapon.className = 'weapon';
        newWeapon.innerHTML = `
            <p>EW</p>
            <p><i class="fas fa-gavel"></i> ${item.range}"</p>
            <p>${item.attack}</p>
            <p>${item.hit}+</p>
            <p>${item.wound}+</p>
            <p>-${item.rend}</p>
            <p>${item.damage}</p>`

        weaponsTable.appendChild(newWeapon);
    });

    pdfFile.appendChild(newWarscroll);
}

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

function createAbilities(warscroll) {
    const allAbilityInputs = document.querySelectorAll('.ability-add');

    allAbilityInputs.forEach(item => {
        let abilityName = item.children[0].value;
        let abilityDesc = item.children[1].value;

        const newAbility = new Ability();

        newAbility.name = abilityName;
        newAbility.description = abilityDesc;

        warscroll.abilities.push(newAbility);
    });
}

function createKeywords(warscroll) {
    const allKeywordsInputs = document.querySelectorAll('.keyword-add');

    allKeywordsInputs.forEach(item => {
        let keywordName = item.children[0].value;

        const newKeyword = new Keyword();

        newKeyword.name = keywordName;

        warscroll.keywords.push(newKeyword);
    });
}

function checkIfMount() {
    let mount = document.createElement('p');

    if(unitInfos[2].value === '') {
        mount = '';
    } else {
        mount= `ON ${unitInfos[2].value}`;
    }

    return mount;
}

function addWarscrollToView(e) {
    let mount = checkIfMount();
    console.log(mount);
    createWarscroll(mount);

    e.preventDefault();
}

function addUnitWeapon(e) {
    let newWeapon = document.createElement('div');
    newWeapon.className = 'weapon-add';
    newWeapon.innerHTML = `
        <input type="text" id="weaponName" placeholder="Name">
        <input type="text" id="weaponType" placeholder="Type">
        <input type="text" id="weaponRange" placeholder="Range">
        <input type="text" id="weaponAttack" placeholder="Attack">
        <input type="text" id="weaponHit" placeholder="To Hit">
        <input type="text" id="weaponWound" placeholder="To Wound">
        <input type="text" id="weaponRend" placeholder="Rend">
        <input type="text" id="weaponDamage" placeholder="Damage">`;

    lowerSide[0].appendChild(newWeapon); 
    
    e.preventDefault();
}

function addUnitAbility(e) {
    let newAbility = document.createElement('div');
    newAbility.className = 'ability-add';
    newAbility.innerHTML = `
        <input type="text" id="abilityName" placeholder="Name">
        <input type="text" id="abilityDesc" placeholder="Description">`;

    lowerSide[1].appendChild(newAbility);

    e.preventDefault();
}

function addUnitKeyword(e) {
    let newKeyword = document.createElement('div');
    newKeyword.className = 'keyword-add';
    newKeyword.innerHTML = `
        <input type="text" id="keywordName" placeholder="Name">`;

    lowerSide[2].appendChild(newKeyword);

    e.preventDefault();
}

function getPDF() {
    html2canvas(pdfFile).then(function(canvas) {
        var img = canvas.toDataURL('image/png');
        var doc = new jsPDF();
        doc.addImage(img, 'JPEG', 10, 10);
        doc.save('warscrolls.pdf');
    });
}



