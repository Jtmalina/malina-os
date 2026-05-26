import React, { useState, useEffect, useCallback } from 'react';
import styles from './Minesweeper.module.css';

type CellValue = number | 'mine';
interface Cell {
  value: CellValue;
  revealed: boolean;
  flagged: boolean;
}

interface Difficulty {
  name: string;
  rows: number;
  cols: number;
  mines: number;
}

interface MinesweeperProps {
  onRequestResize?: (width: number, height: number) => void;
}

const DIFFICULTIES: Difficulty[] = [
  { name: 'Beginner', rows: 9, cols: 9, mines: 10 },
  { name: 'Intermediate', rows: 16, cols: 16, mines: 40 },
  { name: 'Expert', rows: 16, cols: 30, mines: 99 },
];

const Minesweeper: React.FC<MinesweeperProps> = ({ onRequestResize }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[0]);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'won' | 'lost'>('ready');
  const [minesLeft, setMinesLeft] = useState(difficulty.mines);
  const [timer, setTimer] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Resize window when difficulty changes
  useEffect(() => {
    if (onRequestResize) {
      // Adjusted constants to match the "perfect" Beginner size and scale up
      const width = Math.max(280, difficulty.cols * 25 + 50);
      const height = difficulty.rows * 25 + 155;
      onRequestResize(width, height);
    }
  }, [difficulty, onRequestResize]);

  const initGrid = useCallback(() => {
    const { rows, cols, mines } = difficulty;
    const newGrid: Cell[][] = Array(rows).fill(null).map(() =>
      Array(cols).fill(null).map(() => ({
        value: 0,
        revealed: false,
        flagged: false,
      }))
    );

    // Place mines
    let placedMines = 0;
    while (placedMines < mines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (newGrid[r][c].value !== 'mine') {
        newGrid[r][c].value = 'mine';
        placedMines++;
      }
    }

    // Calculate neighbor numbers
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newGrid[r][c].value === 'mine') continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && newGrid[nr][nc].value === 'mine') {
              count++;
            }
          }
        }
        newGrid[r][c].value = count;
      }
    }

    setGrid(newGrid);
    setGameState('ready');
    setMinesLeft(mines);
    setTimer(0);
  }, [difficulty]);

  useEffect(() => {
    initGrid();
  }, [initGrid]);

  useEffect(() => {
    let interval: number;
    if (gameState === 'playing') {
      interval = window.setInterval(() => {
        setTimer(t => Math.min(t + 1, 999));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const revealCell = (r: number, c: number) => {
    if (gameState === 'lost' || gameState === 'won' || grid[r][c].revealed || grid[r][c].flagged) return;

    let newGameState = gameState;
    if (gameState === 'ready') newGameState = 'playing';

    const newGrid = [...grid.map(row => [...row])];

    if (newGrid[r][c].value === 'mine') {
      newGrid[r][c].revealed = true;
      setGameState('lost');
      revealAllMines(newGrid);
      return;
    }

    const { rows, cols } = difficulty;
    const revealRecursive = (row: number, col: number) => {
      if (row < 0 || row >= rows || col < 0 || col >= cols || newGrid[row][col].revealed || newGrid[row][col].flagged) return;
      
      newGrid[row][col].revealed = true;
      if (newGrid[row][col].value === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            revealRecursive(row + dr, col + dc);
          }
        }
      }
    };

    revealRecursive(r, c);
    
    const win = newGrid.every(row => row.every(cell => cell.value === 'mine' || cell.revealed));
    if (win) {
      setGameState('won');
      setMinesLeft(0);
    } else {
      setGameState(newGameState);
    }
    
    setGrid(newGrid);
  };

  const revealAllMines = (currentGrid: Cell[][]) => {
    const finalGrid = currentGrid.map(row => 
      row.map(cell => cell.value === 'mine' ? { ...cell, revealed: true } : cell)
    );
    setGrid(finalGrid);
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameState === 'lost' || gameState === 'won' || grid[r][c].revealed) return;

    const newGrid = [...grid.map(row => [...row])];
    const isFlagged = !newGrid[r][c].flagged;
    newGrid[r][c].flagged = isFlagged;
    setGrid(newGrid);
    setMinesLeft(prev => isFlagged ? prev - 1 : prev + 1);
  };

  const getFace = () => {
    if (gameState === 'won') return '😎';
    if (gameState === 'lost') return '😵';
    return '🙂';
  };

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.menuBar}>
        <div className={styles.menuItem} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          Game
          {isMenuOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownItem} onClick={initGrid}>New</div>
              <div style={{ borderBottom: '1px solid #808080', margin: '2px 0' }}></div>
              {DIFFICULTIES.map((diff) => (
                <div 
                  key={diff.name} 
                  className={styles.dropdownItem} 
                  onClick={() => handleDifficultyChange(diff)}
                >
                  {difficulty.name === diff.name && <span className={styles.check}>✓</span>}
                  {diff.name}
                </div>
              ))}
              <div style={{ borderBottom: '1px solid #808080', margin: '2px 0' }}></div>
              <div className={styles.dropdownItem}>Exit</div>
            </div>
          )}
        </div>
        <div className={styles.menuItem}>Help</div>
      </div>

      <div className={styles.mainGame}>
        <div className={`${styles.header} inset`}>
          <div className={`${styles.counter} inset-deep`}>{String(Math.max(minesLeft, 0)).padStart(3, '0')}</div>
          <button className={styles.resetBtn} onClick={initGrid}>{getFace()}</button>
          <div className={`${styles.counter} inset-deep`}>{String(timer).padStart(3, '0')}</div>
        </div>
        <div className={`${styles.board} inset`}>
          {grid.map((row, r) => (
            <div key={r} className={styles.row}>
              {row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  className={`${styles.cell} ${cell.revealed ? styles.revealed : ''}`}
                  onClick={() => revealCell(r, c)}
                  onContextMenu={(e) => toggleFlag(e, r, c)}
                >
                  {cell.revealed && cell.value !== 0 && (
                    <span className={cell.value === 'mine' ? styles.mine : styles[`num${cell.value}`]}>
                      {cell.value === 'mine' ? '💣' : cell.value}
                    </span>
                  )}
                  {!cell.revealed && cell.flagged && <span className={styles.flag}>🚩</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Minesweeper;
