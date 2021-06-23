import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
	const searchIcon = <FontAwesomeIcon icon={faSearch} />;

	return (
		<div className="search-container">
			<input
				type="text"
				className="form-control"
				placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette"
				aria-label="Search Bar"
			/>
			<button>{searchIcon}</button>
		</div>
	);
};

export default SearchBar;
