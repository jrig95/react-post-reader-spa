import React, { ChangeEvent } from 'react';


interface InputProps {
  type: string;
  id: string;
  className: string;
  value: string;
  placeholder?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  id,
  className,
  value,
  onChange,
  required,
  placeholder
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <input
      type={type}
      id={id}
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      required={required}
    />
  );
};

export default Input;
