/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const IngredientDropdown = (props) => {
	const [openDialog, setOpenDialog] = useState(false);
	const [searchValue, setSearchValue] = useState(null);

	const handleChange = (e) => {
		setSearchValue(e.target.value);
		setOpenDialog(true);
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
				{props && openDialog && (
					<ul>
						{props.ingredients
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
									<li
										key={i}
										className="list-item"
										value="ingredient"
										onClick={props.addSearchTerm}
										style={{ display: "absolute" }}
									>
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
