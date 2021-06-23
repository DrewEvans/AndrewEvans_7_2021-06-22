import React from "react";
import {
	Logo,
	SearchBar,
	RecipeCard,
	DropdownSearch,
} from "./components/index";
import {
	uniqueIngredients,
	uniqueAppliances,
	uniqueUtensils,
} from "./functions/UniqueArrays";
import { recipes } from "./data/recipes";
import styled from "styled-components";

import "./App.scss";

const Wrapper = styled.main`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

function App() {
	const onChange = (e) => {
		console.log(e);
	};
	uniqueIngredients(recipes);
	// uniqueIngredients(recipes);
	uniqueUtensils(recipes);
	uniqueAppliances(recipes);

	return (
		<>
			<Logo />
			<SearchBar />
			<DropdownSearch onChange={onChange} />
			<Wrapper>
				{recipes.map((recipe) => {
					return (
						<div className="card" key={recipe.id}>
							<RecipeCard recipe={recipe} />
						</div>
					);
				})}
			</Wrapper>
		</>
	);
}

export default App;
