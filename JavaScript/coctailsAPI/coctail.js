class Coctail {
    constructor() {

    }

    // Fetch coctile from API
    async getRandomCoctile() {
        const requestResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');

        const randomCoctile = await requestResponse.json();

        return randomCoctile.drinks[0];
    }

    async getCocktailsByName(name) {
        const requestResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

        const cocktail = await requestResponse.json();

        return cocktail.drinks;
    }

    async getCocktailsByIngredient(ingredient) {
        const requestResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        const cocktail = await requestResponse.json();

        return cocktail.drinks;
    }

    async getCocktailById(id) {
        const requestResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        const cocktail = await requestResponse.json();

        return cocktail.drinks;
    }
}

