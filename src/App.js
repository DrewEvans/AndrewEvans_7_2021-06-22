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
import { searchRecipes } from "./functions/testFilter";
import { recipes } from "./data/recipes";
import styled from "styled-components";

import "./App.scss";

const MainWrapper = styled.main`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

function App() {
	const [searchItem, setSearchItem] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [primarySearch, setPrimarySearch] = useState();
	const [recipeList, setRecipeList] = useState([]);

	useEffect(() => {
		setRecipeList(recipes);
	}, []);

	const addSearchTerm = (e) => {
		console.log(e.code);
		const newSearchTerm = e.target.innerHTML;
		const valueType = e.target.getAttribute("value");

		e.type === "change"
			? (setPrimarySearch(e.target.value), setIsSearching(false))
			: null;

		if (e.code === "Enter") {
			setIsSearching(true);
			setRecipeList(searchRecipes(recipes, primarySearch));
		}
		null;

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

	console.log(recipeList);

	console.log(`user searching: ${isSearching}`);

	if (recipeList.length === 0 && isSearching === true) {
		console.log("display no results component");
	}

	isSearching
		? console.log(searchRecipes(recipes, primarySearch))
		: console.log("all Recipes");

	return (
		<>
			<Logo />
			<SearchBar
				ingredients={uniqueIngredients(recipes)}
				appliances={uniqueAppliances(recipes)}
				utensils={uniqueUtensils(recipes)}
				recipes={uniqueRecipes(recipes)}
				addSearchTerm={addSearchTerm}
			/>
			<FilterTags
				searchItem={searchItem}
				removeSearchTerm={removeSearchTerm}
			/>
			<IngredientDropdown
				ingredients={uniqueIngredients(recipes)}
				addSearchTerm={addSearchTerm}
			/>
			<ApplianceDropdown
				appliances={uniqueAppliances(recipes)}
				addSearchTerm={addSearchTerm}
			/>
			<UtensilDropdown
				utensils={uniqueUtensils(recipes)}
				addSearchTerm={addSearchTerm}
			/>
			<MainWrapper>
				{recipes.map((recipe) => {
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
