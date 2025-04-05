import React from 'react';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="text-gray-800 text-sm mb-2 block">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-4 py-3 rounded-lg outline-purple-600"
      />
    </div>
  );
};

export default Input; 