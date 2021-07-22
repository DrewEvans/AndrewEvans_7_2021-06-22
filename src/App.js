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
	const [tagRemoved, setTagRemoved] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [primarySearch, setPrimarySearch] = useState(" ");
	const [recipeList, setRecipeList] = useState([]);

	useEffect(() => {
		setRecipeList(recipes);
	}, []);

	useEffect(() => {
		if (tagSelected) {
			setTagSelected(false);
			if (primarySearch.length >= 3) {
				setRecipeList(tagSearch(recipeList, searchItem));
			}

			setRecipeList(tagSearch(recipes, searchItem));
			// console.log("tags only");
		}

		if (tagRemoved) {
			if (searchItem.length < 1 && primarySearch.length < 3) {
				// console.log("no more tag remains");
				setTagRemoved(false);
				setRecipeList(recipes);
			}
			if (searchItem.length < 1 && primarySearch.length >= 3) {
				setIsSearching(false);
				setRecipeList(searchRecipes(recipes, primarySearch));
			}

			if (searchItem.length >= 1) {
				setRecipeList(tagSearch(recipes, searchItem));
			}

			if (isSearching) {
				if (primarySearch.length <= 2) {
					setIsSearching(false);
					setRecipeList(recipes);
				}

				if (primarySearch.length >= 3) {
					setIsSearching(false);
					setRecipeList(searchRecipes(recipes, primarySearch));
				}
			}

			if (!isSearching && !!searchItem.length) {
				console.log("fired");
			}
		}
	}, [primarySearch, searchItem]);

	const addSearchTerm = (e) => {
		const newSearchTerm = e.target.innerHTML;
		const valueType = e.target.getAttribute("value");

		setTagSelected(true);

		setSearchItem((prevSearchItem) => {
			return [
				{
					type: valueType,
					text: newSearchTerm,
					key: searchItem.length + valueType,
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

	const handleSearchInput = (e, term) => {
		setPrimarySearch(term);

		if (term.length >= 3) {
			setIsSearching(true);
			setRecipeList(searchRecipes(recipes, primarySearch));
		}

		if (term.length <= 2) {
			setIsSearching(true);
			setRecipeList(recipes);
		}
	};

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
