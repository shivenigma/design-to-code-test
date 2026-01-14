import React, { useState, useEffect } from 'react';
import './styles/bayer-theme.css';
import Board from './components/Board';
import GameHeader from './components/GameHeader';
import GameOver from './components/GameOver';
import { useGame } from './hooks/useGame';
import Instructions from './components/Instructions';

function App() {
  const {
    board,
    score,
    highScore,
    hasWon,
    isGameOver,
    moveBoard,
    resetGame,
    continueGame
  } = useGame();
  
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGameOver && !hasWon) {
        switch (event.key) {
          case 'ArrowUp':
            moveBoard('up');
            break;
          case 'ArrowDown':
            moveBoard('down');
            break;
          case 'ArrowLeft':
            moveBoard('left');
            break;
          case 'ArrowRight':
            moveBoard('right');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveBoard, isGameOver, hasWon]);

  // Handle touch events for mobile
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const xDiff = touchStart.x - touchEnd.x;
    const yDiff = touchStart.y - touchEnd.y;
    
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      // Horizontal swipe
      if (xDiff > 20) {
        moveBoard('left');
      } else if (xDiff < -20) {
        moveBoard('right');
      }
    } else {
      // Vertical swipe
      if (yDiff > 20) {
        moveBoard('up');
      } else if (yDiff < -20) {
        moveBoard('down');
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div 
      className="min-h-screen lmnt-theme-surface-bg flex flex-col items-center justify-center p-4 md:p-8"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full max-w-md">
        <GameHeader 
          score={score} 
          highScore={highScore} 
          onReset={resetGame}
          onShowInstructions={() => setShowInstructions(true)}
        />
        
        <div className="relative mt-4">
          <Board board={board} />
          
          {(isGameOver || hasWon) && (
            <GameOver 
              hasWon={hasWon} 
              score={score} 
              onReset={resetGame}
              onContinue={continueGame}
            />
          )}
        </div>

        <div className="mt-6 lmnt-theme-on-surface text-center text-sm">
          <p>Use arrow keys or swipe to move tiles.</p>
        </div>
      </div>

      {showInstructions && (
        <Instructions onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
}

export default App;