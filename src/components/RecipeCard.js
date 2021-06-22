

const RecipeCard = ({recipe})  => {
    const {
        id,
        name,
        ingredients,
        time,
        description,
    } = recipe;
 


    return (<>
    <div key={id} className="img-block"></div>
    <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="duration"><span className="clock-icon">clock</span> {time} min</p>
    </div>
    <div className="details">
        <div className="ingredients-container">
            <ul>
                {ingredients.map((obj)=>{
                    const {ingredient, quantity, unit} = obj;
                    if(!quantity && !unit){
                        return <li>{ingredient}</li>
                    }
                    if(unit){
                        return <li>{ingredient}: {quantity}{unit.replaceAll("rammes","").replaceAll("cuillères à soupe", "  c. à s.").replaceAll("sachets"," sachets")}</li>
                    }
                return true
                }
            )}
            </ul>
        </div>
        <div className="description">
            {description}
        </div>
    </div>
    </>
    )
}
        
export default RecipeCard
