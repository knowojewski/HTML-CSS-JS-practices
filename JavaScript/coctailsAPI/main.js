// -------- Init Coctail class
const coctail = new Coctail();

// -------- UI elements 
const name = document.querySelector('.coctail-name');
const instruction = document.querySelector('.coctail-desc');
const imageBox = document.querySelector('.image');
const ingredientsList = document.querySelector('.ingredients-list');
const category = document.querySelector('.coctail-category');
const glass = document.querySelector('.glass');
const nameFilter = document.querySelector('#cocktailSearch');
const ingredientFilter = document.querySelector('#ingredientSearch');
const cocktailsList = document.querySelector('.cocktails-list');
const randomBtn = document.querySelector('.random-btn');
const message = document.querySelector('.warning-message');


// -------- Event Listeners 
randomBtn.addEventListener('click', getRandomCoctail);
nameFilter.addEventListener('keyup', getCocktailsByName);
ingredientFilter.addEventListener('keyup', getCocktailsByIngredient);



// -------- Get from API
function getRandomCoctail() {
    coctail.getRandomCoctile()
        .then(results => {
            console.log(results);
            displayCoctile(results);
        })
        .catch(err => console.log(err));
}

function getCocktailsByName(event) {
    ingredientFilter.value = '';
    const name = event.target.value;

    if (!(name == '')) {
        coctail.getCocktailsByName(name)
        .then(results => {
            message.innerText = '';
            displayCocktailsList(results);
        })
        .catch(err => message.innerText = `There's no cocktails with this name`);
    } else {
        cocktailsList.innerHTML = '';
    }
}

function getCocktailsByIngredient(event) {
    nameFilter.value = '';
    const ingredient = event.target.value;

    coctail.getCocktailsByIngredient(ingredient)
        .then(results => {
            message.innerText = '';
            displayCocktailsList(results);
        })
        .catch(err => {
            cocktailsList.innerHTML = '';
            message.innerText = `There's no cocktails with this ingredient.`
        });
}

function getCocktailById(id) {
    const getId = id;

    console.log(id);

    coctail.getCocktailById(getId)
        .then(results => {
            displayCoctile(...results);
        })
        .catch(err => console.log(err));
}



// -------- Functions
function displayCocktailsList(cocktails) {
    cocktailsList.innerHTML = '';

    cocktails.forEach(cocktail => {
        const box = document.createElement('div');
        box.className = 'cocktails-list-item';

        box.innerHTML = `
            <div class="thumbnail"><img src="${cocktail.strDrinkThumb}/preview" alt="Cocktail thumbnail"></div>
            <div class="cocktail-desc">
                <h2 class="coctail-name">${cocktail.strDrink}</h2>
            </div>
        `;

        cocktailsList.appendChild(box);
        box.addEventListener('click', () => {
            getCocktailById(cocktail.idDrink);
        });
    });
}


function displayCoctile(coctail) {
    imageBox.innerHTML = '';
    ingredientsList.innerHTML = '';
    
    // image
    const image = document.createElement('img');
    
    image.setAttribute('src', coctail.strDrinkThumb);
    image.setAttribute('alt', 'Drink showcase');

    // ingredients & measure
    const newMeasureArr = makeMeasureArray(coctail);
    const newIngredArr = makeIngredientsArray(coctail);

    // display infos
    imageBox.appendChild(image);
    name.innerText = coctail.strDrink;
    category.innerHTML = coctail.strCategory;
    for(let i = 0; i < newIngredArr.length; i++) {
        const ingredient = document.createElement('li');
        const ingredientName = document.createElement('span');
        ingredientName.className = 'ingredient-name';
        const measure = document.createElement('span');
        measure.className = 'ingredient-measure';
        ingredientName.innerText = `- ${newIngredArr[i]}`;
        measure.innerText = newMeasureArr[i];

        ingredient.appendChild(ingredientName);
        ingredient.appendChild(measure);
        ingredientsList.appendChild(ingredient);
    }
    glass.innerText = coctail.strGlass;
    instruction.innerText = coctail.strInstructions;
}

coctail.getCocktailsByName();







function makeIngredientsArray(coctail) {
    const ingredientsArr = [coctail.strIngredient1, coctail.strIngredient2, coctail.strIngredient3, coctail.strIngredient4, coctail.strIngredient5, coctail.strIngredient6, coctail.strIngredient7, coctail.strIngredient8, coctail.strIngredient9, coctail.strIngredient10, coctail.strIngredient11, coctail.strIngredient12, coctail.strIngredient13, coctail.strIngredient14, coctail.strIngredient15];

    const newIngredArr = [];

    for(let i = 0; i < 15; i++) {
        if(!(ingredientsArr[i] == null)) {
            newIngredArr[i] = ingredientsArr[i];
        }
    }

    return newIngredArr;
}

function makeMeasureArray(coctail) {
    const measureArr = [coctail.strMeasure1, coctail.strMeasure2, coctail.strMeasure3, coctail.strMeasure4, coctail.strMeasure5, coctail.strMeasure6, coctail.strMeasure7, coctail.strMeasure8, coctail.strMeasure9, coctail.strMeasure10, coctail.strMeasure11, coctail.strMeasure12, coctail.strMeasure13, coctail.strMeasure14, coctail.strMeasure15];

    return measureArr;
}


