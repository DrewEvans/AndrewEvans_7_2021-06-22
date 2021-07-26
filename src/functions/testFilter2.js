const linearSearch = (array, searchTerm) => {
	let results = [];
	for (const [i, element] of array.entries()) {
		if (element.name == searchTerm) {
			results = results.push(i);
		}
		if (element.appliance == searchTerm) {
			results = results.push(i);
		}
		if (element.appliance == searchTerm) {
			results = results.push(i);
		}
	}
	return results.map((obj) => {
		console.log(obj);
	});
};
export default linearSearch;

// console.log(linearSearch(recipes, searchWord));
