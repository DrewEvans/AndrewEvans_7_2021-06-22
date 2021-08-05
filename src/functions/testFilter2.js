const binarySearch = (array, key) => {
	let start = 0;
	let end = array.length - 1;
	let keyArray = [];
	let middle = 0;

	array.sort((a, b) => (a.name > b.name && 1) || -1);

	if (key) {
		if (key.length >= 3) {
			while (start <= end) {
				middle = Math.floor((start + end) / 2);

				if (
					array[middle].name.toLowerCase().includes(key.toLowerCase())
				) {
					keyArray.push(middle);
					if (keyArray.length > array.length) {
						return array[keyArray];
					} else if (
						array[middle + 1].name
							.toLowerCase()
							.includes(key.toLowerCase())
					) {
						for (let i = 1; i < array.length; i++) {
							if (
								key.toLowerCase() !=
								array[middle + 1].name.toLowerCase()
							) {
								break;
							} else {
								keyArray.push(middle + i);
							}
						}
					}

					if (keyArray.length > array.length) {
						return array[keyArray];
					} else if (
						array[middle - 1].name
							.toLowerCase()
							.includes(key.toLowerCase())
					) {
						for (let i = 1; i < array.length; i++) {
							if (
								key.toLowerCase() !=
								array[middle - 1].name.toLowerCase()
							) {
								break;
							} else {
								keyArray.push(middle - i);
							}
						}
					}
					return array[keyArray];
				} else if (
					key.toLowerCase() > array[middle].name.toLowerCase()
				) {
					start = middle + 1;
				} else {
					end = middle - 1;
				}
			}
			return -1;
		}
	}
	// if (array[middle].name.toLowerCase().includes(key.toLowerCase())) {
	// 	return middle;
	// } else if (array[middle].name.toLowerCase() < key.toLowerCase()) {
	// 	start = middle + 1;
	// } else {
	// 	end = middle - 1;
	// }
};

export { binarySearch };
