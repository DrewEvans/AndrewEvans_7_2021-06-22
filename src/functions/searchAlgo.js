const searchRecipes = (array, key) => {
	let results = [];
	let newList = [];
	key = key.toLowerCase();

	if (key) {
		if (key.length >= 3) {
			for (const [i, element] of array.entries()) {
				// console.log(`${i}: ${element.name.toLowerCase()}`);
				if (
					element.name.toLowerCase().indexOf(key) > -1 ||
					element.description.toLowerCase().indexOf(key) > -1 ||
					element.appliance.toLowerCase().indexOf(key) > -1 ||
					element.ingredients.forEach((item) => {
						if (item.ingredient.toLowerCase().indexOf(key) > -1) {
							results.push(element);
						}
					}) ||
					element.ustensils.forEach((item) => {
						if (item.toLowerCase().indexOf(key) > -1) {
							results.push(element);
						}
					})
				) {
					results.push(i);
				}
			}
		}
	}

	results.forEach((result) => {
		newList.push(array[result]);
	});

	return newList;
};

const tagSearch = (object, searchItem) => {
	let results = [];

	let ingredientTags = [];
	let ustensilTags = [];
	let applianceTags = [];

	console.log(searchItem);

	Array.from(searchItem).forEach((item) => {
		const { type, text } = item;

		console.log(item.type);

		type === "ingredient" ? (ingredientTags = text) : null;
		type === "utensil" ? (ustensilTags = text) : null;
		type === "appliance" ? (applianceTags = text) : null;
	});

	if (searchItem) {
		if (searchItem.length > 0 && ingredientTags.length > 0) {
			results = object
				.filter((obj) => {
					return (
						obj.ingredients.filter((el) =>
							el.ingredient
								.toLowerCase()
								.includes(ingredientTags.toLowerCase())
						).length > 0
					);
				})
				.map((obj) => {
					return obj;
				});
		}
		if (searchItem.length > 0 && applianceTags.length > 0) {
			results = object
				.filter((obj) => {
					return obj.appliance
						.toLowerCase()
						.includes(applianceTags.toLowerCase());
				})
				.map((obj) => {
					return obj;
				});
		}

		if (searchItem.length > 0 && ustensilTags.length > 0) {
			results = object
				.filter((obj) => {
					return obj.ustensils.some((ustensil) =>
						ustensil
							.toLowerCase()
							.includes(ustensilTags.toLowerCase())
					);
				})
				.map((obj) => {
					return obj;
				});
		}
	}
	return results;
};

export { searchRecipes, tagSearch };
