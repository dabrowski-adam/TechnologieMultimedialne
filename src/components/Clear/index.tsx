import React from 'react';
import Button from '../shared/Button';

type ClearProps = {
  clearSelection: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Clear = ({ clearSelection }: ClearProps) => (
  <Button
    style={{ background: 'sandybrown' }}
    onClick={clearSelection}
    className="clear"
  >
    CLEAR
  </Button>
);

export default Clear;
