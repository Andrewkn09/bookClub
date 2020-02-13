import React from 'react';
const dialogStyles = {
  width: '500px',
  maxWidth: '100%',
  margin: '0 auto',
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '999',
  backgroundColor: '#eee',
  padding: '10px 20px 40px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
};

const dialogCloseButtonStyles = {
  marginBottom: '15px',
  padding: '3px 8px',
  cursor: 'pointer',
  borderRadius: '50%',
  border: 'none',
  border: 'none',
  width: '30px',
  height: '30px',
  fontWeight: 'bold',
  alignSelf: 'flex-end',
};

const Dialog = props => {
  return props.isOpen ? (
    <div style={dialogStyles}>
      <button style={dialogCloseButtonStyles} onClick={props.handleClose}>
        X
      </button>
      {props.children}
    </div>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default Dialog;
