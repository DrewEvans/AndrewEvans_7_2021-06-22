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
import { searchRecipes, tagSearch } from "./functions/searchAlgo";
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
				console.log("tag added & prime search is layered");
			}

			if (primarySearch.length < 3) {
				searchItem.length <= 1
					? setRecipeList(tagSearch(recipes, searchItem))
					: setRecipeList(tagSearch(recipeList, searchItem));
			}
		}

		if (tagRemoved) {
			setTagRemoved(false);
			if (searchItem.length < 1 && primarySearch.length < 3) {
				setRecipeList(recipes);
				console.log("all tags removed & prime is invalid");
			}
			if (searchItem.length < 1 && primarySearch.length >= 3) {
				setRecipeList(searchRecipes(recipes, primarySearch));
				console.log(primarySearch);
				console.log(
					"tag removed but no tags remain but Prime search is valid"
				);
			}

			if (searchItem.length >= 1) {
				setRecipeList(tagSearch(recipes, searchItem));
				console.log("tag removed but one tag or more remains");
			}

			if (isSearching) {
				setIsSearching(false);
				if (primarySearch.length <= 2 && searchItem.length < 1) {
					setRecipeList(recipes);
					console.log(
						`user searching prime with invalid char count and no tags`
					);
				}

				if (primarySearch.length >= 3 && searchItem.length) {
					setRecipeList(searchRecipes(recipes, primarySearch));
					setRecipeList(tagSearch(recipeList, primarySearch));
					console.log("user is searching prime with tags enabled");
				}
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
		setIsSearching(true);

		if (term.length >= 3 && !searchItem.length) {
			setRecipeList(searchRecipes(recipes, primarySearch));
			console.log("prime updated and tag doesnt exist");
		}
		if (term.length >= 3 && searchItem.length) {
			setRecipeList(searchRecipes(recipeList, primarySearch));
			console.log("prime updated and tag exist");
		}

		if (term.length <= 2) {
			setRecipeList(recipes);
			console.log("primary search less than 2 reset");

			if (searchItem.length >= 1) {
				setRecipeList(tagSearch(recipes, searchItem));
				console.log("prime search invalid but tag exists");
			}
		}
	};

	// const compareFunction = (fn1, fn2, n = 1) => {
	// 	console.time("Fn1");
	// 	for (let i = 0; i < n; i++) {
	// 		fn1;
	// 	}
	// 	console.timeEnd("Fn1");
	// 	console.time("Fn2");
	// 	for (let i = 0; i < n; i++) {
	// 		fn2;
	// 	}
	// 	console.timeEnd("Fn2");
	// };

	// compareFunction(
	// 	// linearSearch(recipes, primarySearch),
	// 	searchRecipes(recipes, primarySearch)
	// );
	// console.log(searchRecipes(recipes, primarySearch));

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
				{recipeList.length ? (
					recipeList.map((recipe) => {
						return (
							<div className="card" key={recipe.id}>
								<RecipeCard recipe={recipe} />
							</div>
						);
					})
				) : (
					<h2>
						Aucune recette ne correspond à votre critère… vous
						pouvez chercher « tarte aux pommes », « poisson », etc.
					</h2>
				)}
				{/* {recipeList.map((recipe) => {
					return (
						<div className="card" key={recipe.id}>
							<RecipeCard recipe={recipe} />
						</div>
					);
				})} */}
			</MainWrapper>
		</>
	);
}

export default App;
