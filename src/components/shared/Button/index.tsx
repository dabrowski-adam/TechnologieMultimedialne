import React from 'react';

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '120px',
  height: '60px',
  padding: '0 30px, 0 30px',
  margin: '1px',
  background: 'lightskyblue',
  color: 'white'
};

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const Button = ({ children, onClick, style }: ButtonProps) => (
  <div style={{ ...buttonStyle, ...style }} onClick={onClick}>
    {children}
  </div>
);

export default Button;
