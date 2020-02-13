import React from 'react';

const PrimaryButton = props => {
  const { description = 'Primary Button', handleClick } = props;

  return (
    <React.Fragment>
      <button onClick={handleClick}>{description}</button>
    </React.Fragment>
  );
};

export default PrimaryButton;
