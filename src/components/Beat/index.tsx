import React from 'react';

type BeatProps = {
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  id: string;
  isPlaying: boolean;
  updateMouseDown: (beat: number) => void;
  updateMouseUp: (beat: number) => void;
};

const Beat = ({
  isActive,
  onClick,
  id,
  isPlaying,
  updateMouseDown,
  updateMouseUp
}: BeatProps) => {
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
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault();
        updateMouseDown(parseInt(id));
      }}
      onMouseUp={(event: React.MouseEvent) => updateMouseUp(parseInt(id))}
    />
  );
};

export default Beat;
