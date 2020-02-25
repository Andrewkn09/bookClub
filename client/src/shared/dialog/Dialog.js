import React from 'react';
import './dialog.scss';

const Dialog = props => {
  return props.isOpen ? (
    <div className='dialogBackground'>
      <div className='dialogWrapper'>
        <button className='dialogCloseButtonStyles' onClick={props.handleClose}>
          X
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default Dialog;
