import React from 'react';
import Button from '../shared/Button';

type PlayProps = {
  togglePlaying: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isPlaying: boolean;
};

const Play = ({ togglePlaying, isPlaying }: PlayProps) => (
  <Button onClick={togglePlaying} className="play">
    {isPlaying ? 'STOP' : 'PLAY'}
  </Button>
);

export default Play;
