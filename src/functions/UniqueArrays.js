const uniqueIngredients = (arr) => {
	let ingredients = [];

	arr.forEach((arr) => {
		ingredients = [...ingredients, ...arr.ingredients];
	});

	let unique = [...new Set(ingredients.map((item) => item.ingredient))];

	return unique;
};

const uniqueUtensils = (arr) => {
	let ustensils = [];

	arr.map((recipe) => {
		ustensils = [...ustensils, ...new Set(recipe.ustensils)];
	});

	let unique = [...new Set(ustensils)];

	return unique;
};
const uniqueAppliances = (arr) => {
	let unique = [...new Set(arr.map((item) => item.appliance))];

	return unique;
};
const uniqueRecipes = (arr) => {
	let unique = [...new Set(arr.map((item) => item.name))];

	return unique;
};

export { uniqueIngredients, uniqueUtensils, uniqueAppliances, uniqueRecipes };
