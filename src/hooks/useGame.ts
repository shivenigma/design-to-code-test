import { useState, useEffect, useCallback } from 'react';

// Define types
export type Board = (number | null)[][];
export type Direction = 'up' | 'down' | 'left' | 'right';

const BOARD_SIZE = 4;
const WINNING_VALUE = 2048;
const STORAGE_KEY = 'game2048State';

// Initialize empty board
const createEmptyBoard = (): Board => {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
};

// Add a new tile to the board (2 or 4)
const addRandomTile = (board: Board): Board => {
  const newBoard = JSON.parse(JSON.stringify(board)) as Board;
  const emptyCells: { row: number; col: number }[] = [];
  
  // Find all empty cells
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (newBoard[row][col] === null) {
        emptyCells.push({ row, col });
      }
    }
  }
  
  // If there are empty cells, add a new tile
  if (emptyCells.length > 0) {
    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    // 90% chance of a 2, 10% chance of a 4
    newBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
  }
  
  return newBoard;
};

// Initialize board with two random tiles
const initializeBoard = (): Board => {
  let board = createEmptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

// Check if the game is over
const checkGameOver = (board: Board): boolean => {
  // Check if the board is full
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === null) {
        return false;
      }
    }
  }
  
  // Check if there are any possible merges
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const currentValue = board[row][col];
      
      // Check adjacent cells
      if (row < BOARD_SIZE - 1 && board[row + 1][col] === currentValue) return false;
      if (col < BOARD_SIZE - 1 && board[row][col + 1] === currentValue) return false;
    }
  }
  
  return true;
};

// Check if the player has won
const checkWin = (board: Board): boolean => {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === WINNING_VALUE) {
        return true;
      }
    }
  }
  return false;
};

// Custom hook for game logic
export const useGame = () => {
  // Try to load game state from local storage
  const loadGameState = () => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const { board, score, highScore } = JSON.parse(savedState);
        return { board, score, highScore };
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
    return { board: initializeBoard(), score: 0, highScore: 0 };
  };

  const initialState = loadGameState();
  
  const [board, setBoard] = useState<Board>(initialState.board);
  const [score, setScore] = useState<number>(initialState.score);
  const [highScore, setHighScore] = useState<number>(initialState.highScore);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasWonAndContinuing, setHasWonAndContinuing] = useState<boolean>(false);

  // Save game state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ board, score, highScore }));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, [board, score, highScore]);

  // Check for win or game over
  useEffect(() => {
    if (!hasWonAndContinuing && checkWin(board)) {
      setHasWon(true);
    }
    if (checkGameOver(board)) {
      setIsGameOver(true);
    }
  }, [board, hasWonAndContinuing]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  // Move and merge tiles in the specified direction
  const moveBoard = useCallback((direction: Direction) => {
    if (isGameOver || (hasWon && !hasWonAndContinuing)) return;

    let boardChanged = false;
    let newScore = score;
    let newBoard = JSON.parse(JSON.stringify(board)) as Board;

    const moveAndMergeTiles = () => {
      // Process rows or columns based on direction
      const isHorizontal = direction === 'left' || direction === 'right';
      const isReverse = direction === 'right' || direction === 'down';

      // Iterate through rows or columns
      for (let i = 0; i < BOARD_SIZE; i++) {
        // Extract the row or column
        let line: (number | null)[] = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
          if (isHorizontal) {
            line.push(newBoard[i][j]);
          } else {
            line.push(newBoard[j][i]);
          }
        }

        // Filter out nulls
        let nonNulls = line.filter(cell => cell !== null) as number[];
        if (isReverse) nonNulls.reverse();

        // Merge adjacent identical values
        let mergedLine: number[] = [];
        for (let j = 0; j < nonNulls.length; j++) {
          if (j < nonNulls.length - 1 && nonNulls[j] === nonNulls[j + 1]) {
            const mergedValue = nonNulls[j] * 2;
            mergedLine.push(mergedValue);
            newScore += mergedValue;
            j++; // Skip the next tile as it's been merged
          } else {
            mergedLine.push(nonNulls[j]);
          }
        }

        // Fill with nulls to maintain size
        while (mergedLine.length < BOARD_SIZE) {
          mergedLine.push(null as unknown as number); // TypeScript workaround
        }

        if (isReverse) mergedLine.reverse();

        // Update the board
        for (let j = 0; j < BOARD_SIZE; j++) {
          const newValue = mergedLine[j];
          const oldValue = isHorizontal ? newBoard[i][j] : newBoard[j][i];
          
          if (newValue !== oldValue) {
            boardChanged = true;
          }

          if (isHorizontal) {
            newBoard[i][j] = newValue;
          } else {
            newBoard[j][i] = newValue;
          }
        }
      }
    };

    moveAndMergeTiles();

    // If the board changed, add a new tile and update the score
    if (boardChanged) {
      newBoard = addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);
    }
  }, [board, score, isGameOver, hasWon, hasWonAndContinuing]);

  // Reset the game
  const resetGame = useCallback(() => {
    setBoard(initializeBoard());
    setScore(0);
    setHasWon(false);
    setIsGameOver(false);
    setHasWonAndContinuing(false);
  }, []);

  // Continue playing after winning
  const continueGame = useCallback(() => {
    setHasWonAndContinuing(true);
    setHasWon(false);
  }, []);

  return {
    board,
    score,
    highScore,
    hasWon,
    isGameOver,
    moveBoard,
    resetGame,
    continueGame
  };
};