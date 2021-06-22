import { Logo, SearchBar, RecipeCard  } from "./components/index";
import {recipes, uniqueIngredients, uniqueUtensils, uniqueAppliances} from './data/recipes'

function App() {



  return (
  <>
  <Logo/>
  <SearchBar/>
  {
    recipes.map((recipe)=>{
      return <div className="card" key={recipe.id}> 
        <RecipeCard recipe={recipe} />
      </div>
    })
  }
  </>
  );
}

export default App;
