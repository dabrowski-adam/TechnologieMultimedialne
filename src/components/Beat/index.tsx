import React from 'react';

type BeatProps = {
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  id: string;
  isPlaying: boolean;
};

const Beat = ({ isActive, onClick, id, isPlaying }: BeatProps) => {
  return (
    <div
      style={{
        width: '60px',
        background: isActive
          ? 'lightcoral'
          : isPlaying
          ? 'lightgreen'
          : 'lightgrey',
        margin: '1px'
      }}
      id={id}
      onClick={onClick}
    />
  );
};

export default Beat;
