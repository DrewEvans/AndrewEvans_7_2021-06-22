const linearSearch = (arr, key) => {
	let results = [];
	let list = [];

	if (key) {
		if (key.length > 2) {
			for (let i = 0; i < arr.length; i++) {
				if (
					arr[i].name.toLowerCase().includes(key.toLowerCase()) ||
					arr[i].description
						.toLowerCase()
						.includes(key.toLowerCase()) ||
					arr[i].appliance
						.toLowerCase()
						.includes(key.toLowerCase()) ||
					arr[i].ustensils.some((ustensil) =>
						ustensil.toLowerCase().includes(key.toLowerCase())
					) ||
					arr[i].ingredients.filter((obj) =>
						obj.ingredient.toLowerCase().includes(key.toLowerCase())
					).length > 0
				) {
					results.push(i);
				}
			}
			// If results array is empty, return -1
			if (!results) {
				return -1;
			}
		}
	}
	results.forEach((i) => {
		list.push(arr[i]);
	});

	return list;
};

export { linearSearch };
