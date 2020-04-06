import React from 'react';
import './_buttons.scss';

const PrimaryButton = (props) => {
  const { description = 'Primary Button', handleClick } = props;

  return (
    <React.Fragment>
      <button className='primary-button' onClick={handleClick}>
        {description}
      </button>
    </React.Fragment>
  );
};

export default PrimaryButton;
