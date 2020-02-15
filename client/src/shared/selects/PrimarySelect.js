import React from 'react';

const PrimarySelect = props => {
  const { label, value, name, options, onChange } = props;

  return (
    <label>
      {label}
      <select value={value} onChange={onChange} name={name}>
        {options.map(option => {
          return (
            <option key={option.key} value={option.desc}>
              {option.desc}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default PrimarySelect;
