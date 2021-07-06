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
// import { usePrevious } from "./hooks/usePrevious";
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
	const [tagRemoved, setTagRemoved] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [primarySearch, setPrimarySearch] = useState();
	const [recipeList, setRecipeList] = useState([]);

	// useEffect(() => {
	// 	setRecipeList(recipes);
	// }, []);

	useEffect(() => {
		setRecipeList(recipes);
		// console.log(primarySearch);
		// console.log(searchItem);
		console.log("Change in the force");
		const event = new Event("submit");

		if (!searchItem.length && !primarySearch) {
			setRecipeList(recipes);
			console.log(`no tags or prime search`);
		}

		if (!searchItem.length && !!primarySearch) {
			if (primarySearch.length > 2) {
				handleSearchInput(event, primarySearch);
				console.log(`no tags but prime search`);
			} else setRecipeList(recipes);
		}

		if (tagSelected && !primarySearch) {
			setTagSelected(false);
			setRecipeList(tagSearch(recipeList, searchItem));
			console.log("tags only");
		}

		if (tagSelected && isSearching) {
			setTagSelected(false);
			setIsSearching(false);
			console.log(primarySearch.length);
			if (primarySearch.length > 2) {
				// handleSearchInput(event, primarySearch);
				setRecipeList(tagSearch(recipeList, searchItem));
				console.log("new both axis");
			}
			setRecipeList(recipes);
		}

		console.log(!primarySearch);
		console.log(!!primarySearch);
		if (tagRemoved && !primarySearch) {
			let tagCount = searchItem.length;
			setTagRemoved(false);
			if (tagCount > 0) {
				setRecipeList(tagSearch(recipes, searchItem));
				console.log("tags reset");
			}
		}

		// if (!!searchItem.length && !!primarySearch) {
		// 	if (primarySearch.length > 2) {
		// 		handleSearchInput(event, primarySearch);
		// 		setRecipeList(tagSearch(recipeList, searchItem));
		// 		console.log(`tags and prime length = true`);
		// 	} else console.log("failed prime but tags");
		// 	setRecipeList(recipes);
		// }
	}, [searchItem]);

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
		setTagRemoved(true);
		setSearchItem((prevSearchItem) => {
			return prevSearchItem.filter((searchItem) => searchItem.key != key);
		});
	};

	// if (tagRemoved) {
	// 	setTagRemoved(false);
	// 	setRecipeList(tagSearch(recipes, searchItem));
	// 	console.log("fired");
	// }
	// if (tagSelected) {
	// 	setRecipeList(tagSearch(recipeList, searchItem));
	// 	setTagSelected(false);
	// }

	// console.log(tagSelected);

	const handleSearchInput = (e, term) => {
		if (e.type === "change") {
			setPrimarySearch(term);
			// setIsSearching(false);
		}

		if (e.code === "Enter" || e.type === "submit") {
			setIsSearching(true);
			setRecipeList(searchRecipes(recipes, primarySearch));
		}
	};

	// console.log(`user searching: ${isSearching}`);

	// if (recipeList.length === 0 && isSearching === true) {
	// 	console.log("display no results component");
	// }
	// console.log(`user isSearching: ${isSearching}`);
	// console.log(tagRemoved);

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
