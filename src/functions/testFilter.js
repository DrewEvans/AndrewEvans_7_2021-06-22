const searchRecipes = (object, string) => {
	let results = [];

	if (string) {
		if (string.length > 2) {
			results = object
				.filter((el) => {
					return (
						el.name.toLowerCase().includes(string.toLowerCase()) ||
						el.appliance
							.toLowerCase()
							.includes(string.toLowerCase()) ||
						el.ustensils.some((ustensil) =>
							ustensil
								.toLowerCase()
								.includes(string.toLowerCase())
						) ||
						el.ingredients.filter((obj) =>
							obj.ingredient
								.toLowerCase()
								.includes(string.toLowerCase())
						).length > 0
					);
				})
				.map((obj) => {
					return obj;
				});
		}
		return results;
	}
	null;
};

const tagSearch = (object, searchItem) => {
	let results = [];

	let ingredientTags = [];
	let ustensilTags = [];
	let applianceTags = [];

	searchItem.forEach((item) => {
		const { type, text } = item;

		type === "ingredient" ? (ingredientTags = text) : null;
		type === "utensil" ? (ustensilTags = text) : null;
		type === "appliance" ? (applianceTags = text) : null;
	});

	if (searchItem) {
		if (searchItem.length > 0 && ingredientTags.length > 0) {
			console.log("do an ingredient filter");
			results = object
				.filter((obj) => {
					obj.ingredients.filter((el) =>
						el.ingredient
							.toLowerCase()
							.includes(ingredientTags.toLowerCase())
					).length > 0;
				})
				.map((obj) => {
					console.log(obj);
					return obj;
				});
		}
		if (searchItem.length > 0 && applianceTags.length > 0) {
			console.log("do an appliance filter");
			results = object
				.filter((obj) => {
					obj.appliance
						.toLowerCase()
						.includes(applianceTags.toLowerCase());
				})
				.map((obj) => {
					console.log(obj);
					return obj;
				});
		}

		if (searchItem.length > 0 && ustensilTags.length > 0) {
			results = object
				.filter((obj) => {
					obj.ustensils.some((ustensil) =>
						ustensil
							.toLowerCase()
							.includes(ustensilTags.toLowerCase())
					);
				})
				.map((obj) => {
					console.log(`i got fired`);
					return obj;
				});
		}
		console.log(results);
	}
	return results;
};

export { searchRecipes, tagSearch };
