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

export { searchRecipes };
