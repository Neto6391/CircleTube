import React from "react";

const FieldGroup = ({
	className,
	name,
	placeholder,
	value,
	// error,
	// icon,
	type,
	onChange,
	disabled
}) => {
	return (
		<div className="form-group mb-3">
			<input
				className={className}
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				disabled={disabled}
			/>
		</div>
	);
};

export default FieldGroup;
