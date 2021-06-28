/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const ApplianceDropdown = (props) => {
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
		<div className="dropdown-btn appliance" onClick={handleClick}>
			<div>
				<input
					type="text"
					placeholder="Appareil"
					onChange={handleChange}
				/>
				{!openDialog && <span>{angleDown}</span>}
				{openDialog && <span>{angleUp}</span>}
			</div>
			<div className="item-container">
				{props && openDialog && (
					<ul>
						{props.appliances
							.filter((appliance) => {
								if (searchValue == "" || searchValue == null) {
									return appliance;
								} else if (
									appliance
										.toLowerCase()
										.includes(searchValue.toLowerCase())
								) {
									return appliance;
								}
							})
							.map((appliance, i) => {
								return (
									<li
										key={i}
										value="appliance"
										className="list-item"
										onClick={props.addSearchTerm}
									>
										{appliance}
									</li>
								);
							})}
					</ul>
				)}
			</div>
		</div>
	);
};

export default ApplianceDropdown;
