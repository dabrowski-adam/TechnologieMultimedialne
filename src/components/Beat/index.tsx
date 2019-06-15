import React from 'react';

type BeatProps = {
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  id: string;
  isPlaying: boolean;
  updateMouseDown: (beat: number) => void;
  updateMouseUp: (beat: number) => void;
  mouseEnter: (beat: number) => void;
  mouseLeave: (beat: number) => void;
  isRangeSelected: boolean;
};

const Beat = ({
  isActive,
  onClick,
  id,
  isPlaying,
  updateMouseDown,
  updateMouseUp,
  mouseEnter,
  mouseLeave,
  isRangeSelected
}: BeatProps) => {
  return (
    <div
      className={`beat-${id}`}
      style={{
        width: '60px',
        background: isRangeSelected
          ? 'blue'
          : isActive
          ? isPlaying
            ? 'brown'
            : 'lightcoral'
          : isPlaying
          ? 'lightgreen'
          : 'lightgrey',
        margin: '1px'
      }}
      id={id}
      // onClick={onClick}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault();
        updateMouseDown(parseInt(id));
      }}
      onMouseUp={(event: React.MouseEvent) => updateMouseUp(parseInt(id))}
      onMouseEnter={(event: React.MouseEvent) => mouseEnter(parseInt(id))}
      onMouseLeave={(event: React.MouseEvent) => mouseLeave(parseInt(id))}
    />
  );
};

export default Beat;
