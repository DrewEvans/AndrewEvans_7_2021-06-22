/* eslint-disable react/prop-types */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const FilterTags = (props) => {
	const cross = <FontAwesomeIcon icon={faTimesCircle} />;

	const { searchItem } = props;

	console.log(searchItem.length);

	return (
		<>
			{searchItem.length > 0 &&
				searchItem.map((tag) => {
					console.log(tag);
					<div>
						<p>{tag.text}</p>
						<span>{cross}</span>
					</div>;
				})}
		</>
	);
};

export default FilterTags;
