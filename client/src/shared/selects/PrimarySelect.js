import React from 'react';

const PrimarySelect = props => {
  const { label, value, name, options, onChange } = props;

  return (
    <select className={name} value={value} onChange={onChange} name={name}>
      {options.map(option => {
        return (
          <option key={option.key} value={option.desc}>
            {option.desc}
          </option>
        );
      })}
    </select>
  );
};

export default PrimarySelect;
