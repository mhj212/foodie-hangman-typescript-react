import React from 'react';

const Button = ({id, className, text, onClick}) => (
  <button id={id} className={className} onClick={onClick}>
    {text}
  </button>
);

export default Button;