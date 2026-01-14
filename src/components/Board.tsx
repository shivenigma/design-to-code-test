import React from 'react';
import { Board as BoardType } from '../hooks/useGame';
import Tile from './Tile';

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className="lmnt-theme-secondary-bg p-3 rounded-lg">
      <div className="grid grid-cols-4 gap-3 w-full h-full">
        {board.map((row, rowIndex) => (
          row.map((value, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="relative">
              <div className="lmnt-theme-surface-variant-bg w-full aspect-square rounded-md"></div>
              {value !== null && (
                <Tile value={value} position={{ row: rowIndex, col: colIndex }} />
              )}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default Board;