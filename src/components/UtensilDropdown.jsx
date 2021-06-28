/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const UtensilDropdown = (props) => {
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
		<div className="utensil dropdown-btn" onClick={handleClick}>
			<div>
				<input
					type="text"
					placeholder="Ustensiles"
					onChange={handleChange}
				/>
				{!openDialog && <span>{angleDown}</span>}
				{openDialog && <span>{angleUp}</span>}
			</div>
			<div className="item-container">
				{props && openDialog && (
					<ul>
						{props.utensils
							.filter((utensil) => {
								if (searchValue == "" || searchValue == null) {
									return utensil;
								} else if (
									utensil
										.toLowerCase()
										.includes(searchValue.toLowerCase())
								) {
									return utensil;
								}
							})
							.map((utensil, i) => {
								return (
									<li
										key={i}
										className="list-item"
										value="utensil"
										onClick={props.addSearchTerm}
									>
										{utensil}
									</li>
								);
							})}
					</ul>
				)}
			</div>
		</div>
	);
};

export default UtensilDropdown;
