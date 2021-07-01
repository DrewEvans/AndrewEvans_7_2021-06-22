/* eslint-disable react/prop-types */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = (props) => {
	const searchIcon = <FontAwesomeIcon icon={faSearch} />;

	return (
		<div className="search-container">
			<input
				type="text"
				className="form-control"
				placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette"
				aria-label="Search Bar"
				onChange={props.handleSearchInput}
				onKeyDown={props.handleSearchInput}
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
