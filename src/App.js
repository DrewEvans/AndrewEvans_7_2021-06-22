import React, { useState } from "react";
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
} from "./functions/UniqueArrays";
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

	const addSearchTerm = (e) => {
		e.preventDefault();
		const newSearchTerm = e.target.innerHTML;
		const valueType = e.target.getAttribute("value");
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

	console.log(searchItem);
	return (
		<>
			<Logo />
			<SearchBar />
			<FilterTags searchItem={searchItem} />
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
