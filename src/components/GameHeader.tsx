import React from 'react';
import { QuestionMarkCircle, RefreshCw } from 'lucide-react';

interface GameHeaderProps {
  score: number;
  highScore: number;
  onReset: () => void;
  onShowInstructions: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ 
  score, 
  highScore, 
  onReset,
  onShowInstructions
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="lmnt-theme-primary text-3xl md:text-4xl font-bold">2048</h1>
        <div className="flex gap-2">
          <button 
            className="lmnt-theme-surface-variant-bg p-2 rounded-md hover:opacity-80 transition-opacity"
            onClick={onShowInstructions}
            aria-label="Show instructions"
          >
            <QuestionMarkCircle className="w-6 h-6 lmnt-theme-on-surface" />
          </button>
          <button 
            className="lmnt-theme-surface-variant-bg p-2 rounded-md hover:opacity-80 transition-opacity"
            onClick={onReset}
            aria-label="Reset game"
          >
            <RefreshCw className="w-6 h-6 lmnt-theme-on-surface" />
          </button>
        </div>
      </div>
      
      <div className="flex gap-4">
        <div className="lmnt-theme-secondary-bg rounded-md p-2 flex-1">
          <p className="text-xs lmnt-theme-on-secondary text-center">SCORE</p>
          <p className="text-xl font-bold lmnt-theme-on-secondary text-center">{score}</p>
        </div>
        <div className="lmnt-theme-secondary-variant-bg rounded-md p-2 flex-1">
          <p className="text-xs lmnt-theme-on-secondary text-center">BEST</p>
          <p className="text-xl font-bold lmnt-theme-on-secondary text-center">{highScore}</p>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;