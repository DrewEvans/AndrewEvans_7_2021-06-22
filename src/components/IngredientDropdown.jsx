import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const IngredientDropdown = (ingredients) => {
	const [openDialog, setOpenDialog] = useState(false);
	const [searchValue, setSearchValue] = useState(null);

	const handleChange = (e) => {
		e.isTrusted
			? (setSearchValue(e.target.value), setOpenDialog(true))
			: null;
	};

	const handleClick = (e) => {
		if (e.isTrusted) {
			setOpenDialog(true);
		}
		if (e.isTrusted && openDialog && setSearchValue === "") {
			setOpenDialog(false);
			setSearchValue(null);
		}
		if (e.isTrusted && openDialog) {
			setOpenDialog(false);
		}
	};

	const angleUp = <FontAwesomeIcon icon={faAngleUp} />;
	const angleDown = <FontAwesomeIcon icon={faAngleDown} />;

	return (
		<div className="ingredients dropdown-btn" onClick={handleClick}>
			<div>
				<input
					type="text"
					placeholder="Ingredients"
					onChange={handleChange}
				/>
				{!openDialog && <span>{angleDown}</span>}
				{openDialog && <span>{angleUp}</span>}
			</div>
			<div className="item-container">
				{ingredients && openDialog && (
					<ul>
						{ingredients.ingredients
							.filter((ingredient) => {
								if (searchValue == "" || searchValue == null) {
									return ingredient;
								} else if (
									ingredient
										.toLowerCase()
										.includes(searchValue.toLowerCase())
								) {
									return ingredient;
								}
							})
							.map((ingredient, i) => {
								return (
									<li key={i} className="list-item">
										{ingredient}
									</li>
								);
							})}
					</ul>
				)}
			</div>
		</div>
	);
};

export default IngredientDropdown;
