/* eslint-disable react/prop-types */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const FilterTags = (props) => {
	const { searchItem } = props;
	const cross = <FontAwesomeIcon icon={faTimesCircle} />;

	return (
		<>
			{searchItem.length ? (
				<div className="tag-container">
					{searchItem.map((tag) => {
						const { type, text, key } = tag;

						if (type === "ingredient") {
							return (
								<div key={key} className="ingredient-tag tag">
									<p className="item-text">{text}</p>
									<span
										onClick={props.removeSearchTerm}
										className="close-cross"
									>
										{cross}
									</span>
								</div>
							);
						}

						if (type === "appliance") {
							return (
								<div key={key} className="appliance-tag tag">
									<p className="item-text">{text}</p>
									<span
										onClick={props.removeSearchTerm}
										className="close-cross"
									>
										{cross}
									</span>
								</div>
							);
						}

						if (type === "utensil") {
							return (
								<div key={key} className="utensil-tag tag">
									<p className="item-text">{text}</p>
									<span
										onClick={props.removeSearchTerm}
										className="close-cross"
									>
										{cross}
									</span>
								</div>
							);
						}
					})}
				</div>
			) : null}
		</>
	);
};

export default FilterTags;
