import React, { ReactElement } from 'react';

interface ButtonProps {
  id: string;
  className: string;
  text: string;
  onClick: () => void;
}

const Button = ({id, className, text, onClick}: ButtonProps): ReactElement => (
  <button id={id} className={className} onClick={onClick}>
    {text}
  </button>
);

export default Button;