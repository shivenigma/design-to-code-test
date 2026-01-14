import React from 'react';

interface GameOverProps {
  hasWon: boolean;
  score: number;
  onReset: () => void;
  onContinue: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ 
  hasWon, 
  score, 
  onReset,
  onContinue 
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg animate-[fadeIn_0.5s_ease-in-out]">
      <div className="lmnt-theme-surface-bg p-6 rounded-lg shadow-lg text-center w-3/4">
        <h2 className={`text-2xl font-bold mb-4 ${hasWon ? 'lmnt-theme-success' : 'lmnt-theme-danger'}`}>
          {hasWon ? 'You Won!' : 'Game Over!'}
        </h2>
        
        <p className="lmnt-theme-on-surface mb-4">
          {hasWon 
            ? 'Congratulations! You reached 2048!' 
            : 'No more moves available.'}
        </p>
        
        <p className="lmnt-theme-on-surface mb-6">
          Your score: <span className="font-bold">{score}</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {hasWon && (
            <button
              className="lmnt-theme-secondary-bg lmnt-theme-on-secondary py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
              onClick={onContinue}
            >
              Continue Playing
            </button>
          )}
          
          <button
            className="lmnt-theme-primary-bg lmnt-theme-on-primary py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
            onClick={onReset}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;