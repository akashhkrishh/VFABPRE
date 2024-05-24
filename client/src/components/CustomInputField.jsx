import React from 'react';

const CustomInputField = ({ validation, label, type, placeholder, value, onChange,onBlur }) => {
    function capitalize(str) {
        // Check if the string is empty or null
        if (!str) return '';
    
        // Capitalize the first letter and concatenate with the rest of the string
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <div>
            <label className="block font-medium ">{capitalize(label)}</label>
            <input
                onBlur={onBlur}
                autoComplete='off'
                type={type}
                id={label}
                name={label}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:border-c_blue block w-full sm:text-md"
            />
        </div>
    );
};

export default CustomInputField;
