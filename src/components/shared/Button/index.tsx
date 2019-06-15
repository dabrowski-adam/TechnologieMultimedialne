import React from 'react';

const buttonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '121px',
  height: '60px',
  padding: '0 30px, 0 30px',
  margin: '1px',
  background: 'lightskyblue',
  color: 'white',
  userSelect: 'none'
};

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;
};

const Button = ({ children, onClick, style, className }: ButtonProps) => (
  <div
    style={{ ...buttonStyle, ...style }}
    onClick={onClick}
    className={className}
  >
    {children}
  </div>
);

export default Button;
