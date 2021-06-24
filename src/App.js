import React from "react";
import {
	Logo,
	SearchBar,
	RecipeCard,
	IngredientDropdown,
	UtensilDropdown,
	ApplianceDropdown,
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
	return (
		<>
			<Logo />
			<SearchBar />
			<IngredientDropdown ingredients={uniqueIngredients(recipes)} />
			<ApplianceDropdown ingredients={uniqueAppliances(recipes)} />
			<UtensilDropdown ingredients={uniqueUtensils(recipes)} />
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
