const linearSearch = (array, key) => {
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

const binarySearch = (arr, x) => {
	let n = arr.length;
	let step = Math.sqrt(n);

	// Finding the block where element is
	// present (if it is present)
	let prev = 0;

	x = x.toLowerCase();

	if (x) {
		if (x.length >= 3) {
			while (arr[Math.min(step, n) - 1] < x) {
				prev = step;
				step += Math.sqrt(n);
				if (prev >= n) return -1;
			}

			// Doing a linear search for x in block
			// beginning with prev.
			while (arr[prev] < x) {
				prev++;

				// If we reached next block or end of
				// array, element is not present.
				if (prev == Math.min(step, n)) return -1;
			}
			// If element is found
			if (arr[prev] == x) return prev;
		}
	}
	return -1;

	// let start = 0;
	// let end = array.length - 1;
	// let keyArray = [];
	// let middle = 0;

	// array.sort((a, b) => (a.name > b.name && 1) || -1);

	// if (key) {
	// 	if (key.length >= 3) {
	// 		while (start <= end) {
	// 			middle = Math.floor((start + end) / 2);

	// 			if (
	// 				array[middle].name
	// 					.toLowerCase()
	// 					.includes(key.toLowerCase()) ||
	// 				array[middle].description
	// 					.toLowerCase()
	// 					.includes(key.toLowerCase())
	// 			) {
	// 				keyArray.push(middle);
	// 				if (keyArray.length > array.length) {
	// 					return array[keyArray];
	// 				} else if (
	// 					array[middle + 1].name
	// 						.toLowerCase()
	// 						.includes(key.toLowerCase()) ||
	// 					array[middle + 1].description
	// 						.toLowerCase()
	// 						.includes(key.toLowerCase())
	// 				) {
	// 					for (let i = 1; i < array.length; i++) {
	// 						if (
	// 							key.toLowerCase() !=
	// 								array[middle + 1].name.toLowerCase() ||
	// 							array[middle + 1].description.toLowerCase()
	// 						) {
	// 							break;
	// 						} else {
	// 							keyArray.push(middle + i);
	// 						}
	// 					}
	// 				}

	// 				if (keyArray.length > array.length) {
	// 					return array[keyArray];
	// 				} else if (
	// 					array[middle - 1].name
	// 						.toLowerCase()
	// 						.includes(key.toLowerCase()) ||
	// 					array[middle - 1].description
	// 						.toLowerCase()
	// 						.includes(key.toLowerCase())
	// 				) {
	// 					for (let i = 1; i < array.length; i++) {
	// 						if (
	// 							key.toLowerCase() !=
	// 								array[middle - 1].name.toLowerCase() ||
	// 							array[middle - 1].description.toLowerCase()
	// 						) {
	// 							break;
	// 						} else {
	// 							keyArray.push(middle - i);
	// 						}
	// 					}
	// 				}
	// 				return array[keyArray];
	// 			} else if (
	// 				key.toLowerCase() > array[middle].name.toLowerCase() ||
	// 				array[middle].description.toLowerCase()
	// 			) {
	// 				start = middle + 1;
	// 			} else {
	// 				end = middle - 1;
	// 			}
	// 		}
	// 		return -1;
	// 	}
	// }
};

export { binarySearch, linearSearch };
