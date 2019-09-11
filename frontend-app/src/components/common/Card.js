import React from "react";

const Card = ({ title, className, children }) => {
	return (
		<div className={className ? "card " + className : "card"}>
			{title ? <div className="card-header text-center ">{title}</div> : null}
			<div className="card-body">{children}</div>
		</div>
	);
};

export default Card;
