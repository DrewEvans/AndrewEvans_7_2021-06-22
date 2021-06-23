import React from "react";
import { Logo, SearchBar, RecipeCard } from "./components/index";
import {
	recipes,
	// uniqueIngredients,
	// uniqueUtensils,
	// uniqueAppliances,
} from "./data/recipes";
import styled from "styled-components";

import "./App.scss";

const Wrapper = styled.main`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

function App() {
	return (
		<>
			<Logo />
			<SearchBar />
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
