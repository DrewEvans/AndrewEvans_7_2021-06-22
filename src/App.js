import React, { useState, useEffect } from "react";
import {
	Logo,
	SearchBar,
	RecipeCard,
	IngredientDropdown,
	UtensilDropdown,
	ApplianceDropdown,
	FilterTags,
} from "./components/index";
import {
	uniqueIngredients,
	uniqueAppliances,
	uniqueUtensils,
	uniqueRecipes,
} from "./functions/UniqueArrays";
import { searchRecipes, tagSearch } from "./functions/testFilter";
import { recipes } from "./data/recipes";
import styled from "styled-components";

import "./App.scss";

const MainWrapper = styled.main`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

const BtnWrapper = styled.div`
	display: inline-block;
	flex-direction: row;
	justify-content: flex start;
	flex-wrap: wrap;
	margin-top: 0em;
	z-index: 1000;
`;

function App() {
	const [searchItem, setSearchItem] = useState([]);
	const [tagSelected, setTagSelected] = useState();
	const [isSearching, setIsSearching] = useState(false);
	const [primarySearch, setPrimarySearch] = useState();
	const [recipeList, setRecipeList] = useState([]);

	useEffect(() => {
		setRecipeList(recipes);
	}, []);

	const addSearchTerm = (e) => {
		const newSearchTerm = e.target.innerHTML;
		const valueType = e.target.getAttribute("value");

		setTagSelected(true);

		setSearchItem((prevSearchItem) => {
			return [
				{
					type: valueType,
					text: newSearchTerm,
					key: searchItem.length,
				},
				...prevSearchItem,
			];
		});
	};

	const removeSearchTerm = (key) => {
		setSearchItem((prevSearchItem) => {
			return prevSearchItem.filter((searchItem) => searchItem.key != key);
		});
	};

	const handleSearchInput = (e) => {
		e.type === "change"
			? (setPrimarySearch(e.target.value), setIsSearching(false))
			: null;

		if (e.code === "Enter") {
			setIsSearching(true);
			setRecipeList(searchRecipes(recipes, primarySearch));
		}
		null;
	};

	console.log(`user searching: ${isSearching}`);

	if (recipeList.length === 0 && isSearching === true) {
		console.log("display no results component");
	}

	tagSelected ? console.log(tagSearch(recipeList, searchItem)) : null;

	// isSearching
	// 	? console.log(searchRecipes(recipes, primarySearch, searchItem))
	// 	: console.log("all Recipes");

	return (
		<>
			<Logo />
			<SearchBar
				ingredients={uniqueIngredients(recipes)}
				appliances={uniqueAppliances(recipes)}
				utensils={uniqueUtensils(recipes)}
				recipes={uniqueRecipes(recipes)}
				handleSearchInput={handleSearchInput}
			/>
			<FilterTags
				searchItem={searchItem}
				removeSearchTerm={removeSearchTerm}
			/>
			<BtnWrapper>
				<IngredientDropdown
					ingredients={uniqueIngredients(recipeList)}
					addSearchTerm={addSearchTerm}
				/>
			</BtnWrapper>
			<BtnWrapper>
				<ApplianceDropdown
					appliances={uniqueAppliances(recipeList)}
					addSearchTerm={addSearchTerm}
				/>
			</BtnWrapper>
			<BtnWrapper>
				<UtensilDropdown
					utensils={uniqueUtensils(recipeList)}
					addSearchTerm={addSearchTerm}
				/>
			</BtnWrapper>

			<MainWrapper>
				{recipeList.map((recipe) => {
					return (
						<div className="card" key={recipe.id}>
							<RecipeCard recipe={recipe} />
						</div>
					);
				})}
			</MainWrapper>
		</>
	);
}

export default App;
