import React from "react";

const Button = ({ type, disabled, color, size, block, onClick, children }) => {
	return (
		<button
			type={type}
			className={
				size
					? "btn " + color + " " + size
					: block
					? "btn " + color + " btn-block"
					: "btn " + color
			}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
