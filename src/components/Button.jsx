import React from 'react';

function Button(props) {
  const {
    onClick, title, children, disabled = false,
  } = props;
  return (
    // eslint-disable-next-line react/button-has-type
    <button {...props} onClick={onClick} disabled={disabled} title={title}>{children}</button>
  );
}

export default Button;
