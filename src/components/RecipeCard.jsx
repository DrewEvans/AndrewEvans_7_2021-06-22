/* eslint-disable react/prop-types */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const RecipeCard = ({ recipe }) => {
	const clockIcon = <FontAwesomeIcon icon={faClock} />;

	return (
		<>
			<div key={recipe.id} className="img-block"></div>
			<div className="card-body">
				<h2 className="card-title">{recipe.name}</h2>
				<p className="duration">
					<span className="clock-icon">{clockIcon}</span>{" "}
					{recipe.time} min
				</p>
			</div>
			<div className="details">
				<div className="ingredients-container">
					<ul>
						{recipe.ingredients.map((obj) => {
							const { ingredient, quantity, unit } = obj;
							if (!quantity && !unit) {
								return <li>{ingredient}</li>;
							}
							if (unit) {
								return (
									<li>
										{ingredient}: {quantity}
										{unit
											.replaceAll("rammes", "")
											.replaceAll(
												"cuillères à soupe",
												"  c. à s."
											)
											.replaceAll("sachets", " sachets")}
									</li>
								);
							}
							return true;
						})}
					</ul>
				</div>
				<div className="description">{recipe.description}</div>
			</div>
		</>
	);
};

export default RecipeCard;
