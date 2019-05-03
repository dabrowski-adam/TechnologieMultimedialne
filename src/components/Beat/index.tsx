import React from 'react';

type BeatProps = {
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  id: string;
};

const Beat = ({ isActive, onClick, id }: BeatProps) => {
  return (
    <div
      style={{
        width: '60px',
        background: isActive ? 'lightcoral' : 'lightgrey',
        margin: '1px'
      }}
      id={id}
      onClick={onClick}
    />
  );
};

export default Beat;
