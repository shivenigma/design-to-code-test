import React from 'react';
import { X } from 'lucide-react';

interface InstructionsProps {
  onClose: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="lmnt-theme-surface-bg p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold lmnt-theme-primary">How to Play</h2>
          <button 
            onClick={onClose}
            className="lmnt-theme-surface-variant-bg p-2 rounded-full hover:opacity-80"
            aria-label="Close instructions"
          >
            <X className="w-5 h-5 lmnt-theme-on-surface" />
          </button>
        </div>
        
        <div className="space-y-4 lmnt-theme-on-surface">
          <p>
            <strong>2048</strong> is a sliding puzzle game. The goal is to combine tiles with the same numbers to create a tile with the value 2048.
          </p>
          
          <h3 className="text-lg font-semibold lmnt-theme-secondary mt-2">Game Rules:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use arrow keys or swipe to move all tiles in one direction.</li>
            <li>When two tiles with the same number touch, they merge into one with their sum.</li>
            <li>After each move, a new tile (2 or 4) appears in a random empty spot.</li>
            <li>Your score increases by the value of each merged tile.</li>
            <li>The game ends when you can't make any more moves.</li>
            <li>You win when you create a tile with the value 2048!</li>
          </ul>
          
          <h3 className="text-lg font-semibold lmnt-theme-secondary mt-2">Controls:</h3>
          <ul className="list-disc pl-5">
            <li>Desktop: Use arrow keys (↑, ↓, ←, →)</li>
            <li>Mobile: Swipe up, down, left, or right</li>
          </ul>
          
          <p className="mt-4 text-sm">
            Your game progress is automatically saved, so you can continue where you left off when you return.
          </p>
        </div>
        
        <button 
          onClick={onClose}
          className="lmnt-theme-primary-bg lmnt-theme-on-primary py-2 px-4 rounded-md mt-6 w-full hover:opacity-90 transition-opacity"
        >
          Start Playing
        </button>
      </div>
    </div>
  );
};

export default Instructions;