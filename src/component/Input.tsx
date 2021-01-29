import React from 'react'
import {TextFieldProps} from '../interface'

const Input: React.FC<TextFieldProps> = ({
	label,
	onChange,
	name,
	value
}) => {
	return (
		<fieldset className="bn flex flex-column pa0 mb4">
			<label className="b mb2">{label}*</label>
			<input
				data-testid="input"
				className="pa2 rounded-2"
				name={name}
				onChange={onChange}
				value={value}
			/>
		</fieldset>
	)
};

export default Input;
