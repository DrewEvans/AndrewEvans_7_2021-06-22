/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = (props) => {
	const [term, setTerm] = useState("");
	const searchIcon = <FontAwesomeIcon icon={faSearch} />;

	const handleTerm = (e) => {
		setTerm(e.target.value);
		props.handleSearchInput(e, term);
	};

	return (
		<div className="search-container">
			<input
				type="text"
				className="form-control"
				placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette"
				aria-label="Search Bar"
				onChange={handleTerm}
				// onKeyDown={handleTerm}
				value={term}
			/>
			<button
				onClick={props.addSearchTerm}
				onKeyDown={props.addSearchTerm}
			>
				{searchIcon}
			</button>
		</div>
	);
};

export default SearchBar;

// const { ingredients, recipes, utensils, appliances } = props;
// const createObj = () => {
// 	let obj = [];

// 	recipes.forEach((item, i) => {
// 		let newObj;
// 		newObj = { type: "recipe", text: item, key: `recipe-${i}` };
// 		obj.push(newObj);
// 	});
// 	ingredients.forEach((item, i) => {
// 		let newObj;
// 		newObj = {
// 			type: "ingredients",
// 			text: item,
// 			key: `ingredients-${i}`,
// 		};
// 		obj.push(newObj);
// 	});
// 	utensils.forEach((item, i) => {
// 		let newObj;
// 		newObj = { type: "utensils", text: item, key: `utensils-${i}` };
// 		obj.push(newObj);
// 	});
// 	appliances.forEach((item, i) => {
// 		let newObj;
// 		newObj = { type: "appliances", text: item, key: `appliances-${i}` };
// 		obj.push(newObj);
// 	});

// 	return obj;
// };

// const searchValues = createObj();

// console.log(searchValues);
