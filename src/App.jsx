import React, { useState, useEffect } from 'react';
import { Settings, RotateCcw, Lightbulb, Trophy, Info, X, Timer, Undo } from 'lucide-react';

const EmaSudoku = () => {
  // Configurazione
  const [gridSize, setGridSize] = useState(4);
  const [symbolSet, setSymbolSet] = useState('numbers');
  const [difficulty, setDifficulty] = useState('easy');
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [showErrors, setShowErrors] = useState(true);
  const [smartFilter, setSmartFilter] = useState(false);

  // Set di simboli disponibili con stile associato
  const symbolSets = {
    numbers: { 
      4: ['1','2','3','4'], 
      6: ['1','2','3','4','5','6'], 
      9: ['1','2','3','4','5','6','7','8','9'],
      style: 'classic',
      name: 'Numerico'
    },
    animals: { 
      4: ['🐶','🐱','🐭','🐹'],
      6: ['🐶','🐱','🐭','🐹','🐰','🦊'],
      9: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨'],
      style: 'nature',
      name: 'Animalesco'
    },
    dinosaurs: {
      4: ['🦕','🦖','🦴','🥚'],
      6: ['🦕','🦖','🦴','🥚','🐊','🦎'],
      9: ['🦕','🦖','🦴','🥚','🐊','🦎','🐢','🦂','🕷️'],
      style: 'forest',
      name: 'Preistorico'
    },
    fruits: {
      4: ['🍎','🍊','🍋','🍇'],
      6: ['🍎','🍊','🍋','🍇','🍓','🍒'],
      9: ['🍎','🍊','🍋','🍇','🍓','🍒','🍑','🍉','🍌'],
      style: 'tropical',
      name: 'Fruttoso'
    },
    shapes: {
      4: ['🔴','🔵','🟡','🟢'],
      6: ['🔴','🔵','🟡','🟢','🟣','🟠'],
      9: ['🔴','🔵','🟡','🟢','🟣','🟠','🟤','⚫','⚪'],
      style: 'rainbow',
      name: 'Geometrico'
    },
    sports: {
      4: ['⚽','🏀','🎾','⚾'],
      6: ['⚽','🏀','🎾','⚾','🏐','🏈'],
      9: ['⚽','🏀','🎾','⚾','🏐','🏈','🏉','🎱','🏓'],
      style: 'sporty',
      name: 'Sportivo'
    },
    vegetables: {
      4: ['🥕','🥦','🌽','🍅'],
      6: ['🥕','🥦','🌽','🍅','🥒','🫑'],
      9: ['🥕','🥦','🌽','🍅','🥒','🫑','🧅','🧄','🥔'],
      style: 'veggie',
      name: 'Vegetale'
    },
    desserts: {
      4: ['🍰','🍪','🍩','🧁'],
      6: ['🍰','🍪','🍩','🧁','🍦','🍫'],
      9: ['🍰','🍪','🍩','🧁','🍦','🍫','🎂','🍮','🍭'],
      style: 'sweet',
      name: 'Goloso'
    },
    flowers: {
      4: ['🌸','🌺','🌻','🌷'],
      6: ['🌸','🌺','🌻','🌷','🌹','💐'],
      9: ['🌸','🌺','🌻','🌷','🌹','💐','🏵️','🌼','🥀'],
      style: 'floral',
      name: 'Fiorito'
    },
    monsters: {
      4: ['👻','💀','🧛','🧟'],
      6: ['👻','💀','🧛','🧟','👹','👺'],
      9: ['👻','💀','🧛','🧟','👹','👺','🎃','😈','🤡'],
      style: 'spooky',
      name: 'Mostruoso'
    }
  };

  // Ottieni lo stile corrente basato sul set di simboli
  const currentColorStyle = symbolSets[symbolSet].style;

  // Stili di colore
  const colorStyles = {
    classic: {
      name: 'Classico',
      light: { 
        grid: 'border-gray-800',
        block: 'border-gray-400',
        cell: 'border-gray-300',
        lineBlock: '#9ca3af', // gray-400
        lineCell: '#d1d5db', // gray-300
        cellBg: 'bg-white',
        fixedBg: 'bg-gray-100',
        selected: 'ring-blue-500',
        buttonActive: 'bg-gray-700/80 hover:bg-gray-800/80 text-white',
        buttonInactive: 'bg-gray-200 text-gray-400'
      },
      dark: {
        grid: 'border-gray-400',
        block: 'border-gray-600',
        cell: 'border-gray-700',
        lineBlock: '#4b5563', // gray-600
        lineCell: '#374151', // gray-700
        cellBg: 'bg-gray-800',
        fixedBg: 'bg-gray-700',
        selected: 'ring-blue-400',
        buttonActive: 'bg-gray-600/80 hover:bg-gray-500/80 text-white',
        buttonInactive: 'bg-gray-700 text-gray-500'
      }
    },
    forest: {
      name: 'Foresta',
      light: {
        grid: 'border-green-700',
        block: 'border-green-500',
        cell: 'border-green-200',
        lineBlock: '#22c55e',
        lineCell: '#bbf7d0',
        cellBg: 'bg-green-50',
        fixedBg: 'bg-green-100',
        selected: 'ring-emerald-500',
        buttonActive: 'bg-green-600/70 hover:bg-green-700/70 text-white',
        buttonInactive: 'bg-green-100 text-green-300'
      },
      dark: {
        grid: 'border-emerald-400',
        block: 'border-emerald-600',
        cell: 'border-emerald-800',
        lineBlock: '#059669',
        lineCell: '#064e3b',
        cellBg: 'bg-gray-800',
        fixedBg: 'bg-gray-700',
        selected: 'ring-emerald-400',
        buttonActive: 'bg-emerald-600/70 hover:bg-emerald-500/70 text-white',
        buttonInactive: 'bg-gray-700 text-gray-500'
      }
    },
    nature: {
      name: 'Natura',
      light: {
        grid: 'border-amber-700',
        block: 'border-amber-500',
        cell: 'border-amber-200',
        lineBlock: '#f59e0b',
        lineCell: '#fde68a',
        cellBg: 'bg-amber-50',
        fixedBg: 'bg-amber-100',
        selected: 'ring-yellow-500',
        buttonActive: 'bg-amber-600/70 hover:bg-amber-700/70 text-white',
        buttonInactive: 'bg-amber-100 text-amber-300'
      },
      dark: {
        grid: 'border-yellow-500',
        block: 'border-yellow-600',
        cell: 'border-yellow-800',
        lineBlock: '#ca8a04',
        lineCell: '#713f12',
        cellBg: 'bg-gray-800',
        fixedBg: 'bg-gray-700',
        selected: 'ring-yellow-400',
        buttonActive: 'bg-yellow-600/70 hover:bg-yellow-500/70 text-white',
        buttonInactive: 'bg-gray-700 text-gray-500'
      }
    },
    tropical: {
      name: 'Tropicale',
      light: {
        grid: 'border-orange-600',
        block: 'border-orange-400',
        cell: 'border-orange-200',
        lineBlock: '#fb923c',
        lineCell: '#fed7aa',
        cellBg: 'bg-orange-50',
        fixedBg: 'bg-orange-100',
        selected: 'ring-red-500',
        buttonActive: 'bg-orange-500/70 hover:bg-orange-600/70 text-white',
        buttonInactive: 'bg-orange-100 text-orange-300'
      },
      dark: {
        grid: 'border-orange-400',
        block: 'border-orange-600',
        cell: 'border-orange-800',
        lineBlock: '#ea580c',
        lineCell: '#7c2d12',
        cellBg: 'bg-gray-800',
        fixedBg: 'bg-gray-700',
        selected: 'ring-orange-400',
        buttonActive: 'bg-orange-600/70 hover:bg-orange-500/70 text-white',
        buttonInactive: 'bg-gray-700 text-gray-500'
      }
    },
    rainbow: {
      name: 'Arcobaleno',
      light: {
        grid: 'border-purple-600',
        block: 'border-purple-400',
        cell: 'border-purple-200',
        lineBlock: '#a78bfa',
        lineCell: '#e9d5ff',
        cellBg: 'bg-purple-50',
        fixedBg: 'bg-purple-100',
        selected: 'ring-pink-500',
        buttonActive: 'bg-purple-500/70 hover:bg-purple-600/70 text-white',
        buttonInactive: 'bg-purple-100 text-purple-300'
      },
      dark: {
        grid: 'border-purple-400',
        block: 'border-purple-600',
        cell: 'border-purple-800',
        lineBlock: '#7c3aed',
        lineCell: '#581c87',
        cellBg: 'bg-gray-800',
        fixedBg: 'bg-gray-700',
        selected: 'ring-purple-400',
        buttonActive: 'bg-purple-600/70 hover:bg-purple-500/70 text-white',
        buttonInactive: 'bg-gray-700 text-gray-500'
      }
    },
    sporty: {
      name: 'Sportivo',
      light: {
        grid: 'border-blue-700',
        block: 'border-blue-500',
        cell: 'border-blue-200',
        lineBlock: '#3b82f6',
        lineCell: '#bfdbfe',
        cellBg: 'bg-blue-50',
        fixedBg: 'bg-blue-100',
        selected: 'ring-sky-500',
        buttonActive: 'bg-blue-600/70 hover:bg-blue-700/70 text-white',
        buttonInactive: 'bg-blue-100 text-blue-300'
      },
      dark: {
        grid: 'border-sky-400',
        block: 'border-sky-600',
        cell: 'border-sky-800',
        lineBlock: '#0284c7',
        lineCell: '#075985',
        cellBg: 'bg-gray-800',
        fixedBg: 'bg-gray-700',
        selected: 'ring-sky-400',
        buttonActive: 'bg-sky-600/70 hover:bg-sky-500/70 text-white',
        buttonInactive: 'bg-gray-700 text-gray-500'
      }
    },
    veggie: {
      name: 'Vegetale',
      light: {
        grid: 'border-lime-700',
        block: 'border-lime-500',
        cell: 'border-lime-200',
        lineBlock: '#84cc16',
        lineCell: '#d9f99d',
        cellBg: 'bg-lime-50',
        fixedBg: 'bg-lime-100',
        selected: 'ring-green-500',
        buttonActive: 'bg-lime-600/70 hover:bg-lime-700/70 text-white',
        buttonInactive: 'bg-lime-100 text-lime-300'
      },
      dark: {
        grid: 'border-lime-400',
        block: 'border-lime-600',
        cell: 'border-lime-800',
        lineBlock: '#65a30d',
        lineCell: '#3f6212',
        cellBg: 'bg-gray-800',
        fixedBg: 'bg-gray-700',
        selected: 'ring-lime-400',
        buttonActive: 'bg-lime-600/70 hover:bg-lime-500/70 text-white',
        buttonInactive: 'bg-gray-700 text-gray-500'
      }
    },
    sweet: {
      name: 'Goloso',
      light: {
        grid: 'border-pink-600',
        block: 'border-pink-400',
        cell: 'border-pink-200',
        lineBlock: '#f472b6',
        lineCell: '#fbcfe8',
        cellBg: 'bg-pink-50',
        fixedBg: 'bg-pink-100',
        selected: 'ring-rose-500',
        buttonActive: 'bg-pink-500/70 hover:bg-pink-600/70 text-white',
        buttonInactive: 'bg-pink-100 text-pink-300'
      },
      dark: {
        grid: 'border-pink-400',
        block: 'border-pink-600',
        cell: 'border-pink-800',
        lineBlock: '#db2777',
        lineCell: '#831843',
        cellBg: 'bg-gray-800',
        fixedBg: 'bg-gray-700',
        selected: 'ring-pink-400',
        buttonActive: 'bg-pink-600/70 hover:bg-pink-500/70 text-white',
        buttonInactive: 'bg-gray-700 text-gray-500'
      }
    },
    floral: {
      name: 'Fiorito',
      light: {
        grid: 'border-rose-700',
        block: 'border-rose-500',
        cell: 'border-rose-200',
        lineBlock: '#f43f5e',
        lineCell: '#fecdd3',
        cellBg: 'bg-rose-50',
        fixedBg: 'bg-rose-100',
        selected: 'ring-pink-500',
        buttonActive: 'bg-rose-600/70 hover:bg-rose-700/70 text-white',
        buttonInactive: 'bg-rose-100 text-rose-300'
      },
      dark: {
        grid: 'border-rose-400',
        block: 'border-rose-600',
        cell: 'border-rose-800',
        lineBlock: '#e11d48',
        lineCell: '#881337',
        cellBg: 'bg-gray-800',
        fixedBg: 'bg-gray-700',
        selected: 'ring-rose-400',
        buttonActive: 'bg-rose-600/70 hover:bg-rose-500/70 text-white',
        buttonInactive: 'bg-gray-700 text-gray-500'
      }
    },
    spooky: {
      name: 'Mostruoso',
      light: {
        grid: 'border-indigo-700',
        block: 'border-indigo-500',
        cell: 'border-indigo-200',
        lineBlock: '#6366f1',
        lineCell: '#c7d2fe',
        cellBg: 'bg-indigo-50',
        fixedBg: 'bg-indigo-100',
        selected: 'ring-violet-500',
        buttonActive: 'bg-indigo-600/70 hover:bg-indigo-700/70 text-white',
        buttonInactive: 'bg-indigo-100 text-indigo-300'
      },
      dark: {
        grid: 'border-indigo-400',
        block: 'border-indigo-600',
        cell: 'border-indigo-800',
        lineBlock: '#4f46e5',
        lineCell: '#3730a3',
        cellBg: 'bg-gray-800',
        fixedBg: 'bg-gray-700',
        selected: 'ring-indigo-400',
        buttonActive: 'bg-indigo-600/70 hover:bg-indigo-500/70 text-white',
        buttonInactive: 'bg-gray-700 text-gray-500'
      }
    }
  };

  // Generatore Sudoku universale
  const generateSudoku = (size) => {
    const blockRows = size === 4 ? 2 : size === 6 ? 2 : 3;
    const blockCols = size === 4 ? 2 : size === 6 ? 3 : 3;
    
    // Crea griglia vuota
    const grid = Array(size).fill(null).map(() => Array(size).fill(0));
    
    // Riempi la griglia con backtracking
    const isValid = (grid, row, col, num) => {
      // Check riga
      for (let x = 0; x < size; x++) {
        if (grid[row][x] === num) return false;
      }
      
      // Check colonna
      for (let x = 0; x < size; x++) {
        if (grid[x][col] === num) return false;
      }
      
      // Check blocco
      const startRow = row - (row % blockRows);
      const startCol = col - (col % blockCols);
      for (let i = 0; i < blockRows; i++) {
        for (let j = 0; j < blockCols; j++) {
          if (grid[startRow + i][startCol + j] === num) return false;
        }
      }
      
      return true;
    };
    
    const solveSudoku = (grid) => {
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (grid[row][col] === 0) {
            const nums = Array.from({length: size}, (_, i) => i + 1);
            // Shuffle per randomness
            for (let i = nums.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [nums[i], nums[j]] = [nums[j], nums[i]];
            }
            
            for (let num of nums) {
              if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                if (solveSudoku(grid)) return true;
                grid[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    };
    
    solveSudoku(grid);
    const solution = grid.map(row => [...row]);
    
    // Funzione per contare soluzioni (si ferma a 2 per efficienza)
    const countSolutions = (grid, maxSolutions = 2) => {
      let count = 0;
      
      const solve = (g) => {
        if (count >= maxSolutions) return; // Stop early
        
        for (let row = 0; row < size; row++) {
          for (let col = 0; col < size; col++) {
            if (g[row][col] === 0) {
              for (let num = 1; num <= size; num++) {
                if (isValid(g, row, col, num)) {
                  g[row][col] = num;
                  solve(g);
                  g[row][col] = 0;
                }
              }
              return;
            }
          }
        }
        // Soluzione completa trovata
        count++;
      };
      
      const gridCopy = grid.map(row => [...row]);
      solve(gridCopy);
      return count;
    };
    
    // Rimuovi numeri in base alla difficoltà, garantendo soluzione univoca
    const difficultyLevels = {
      easy: { 4: 6, 6: 12, 9: 30 },
      medium: { 4: 8, 6: 16, 9: 45 },
      hard: { 4: 10, 6: 20, 9: 55 }
    };
    
    const cellsToRemove = difficultyLevels[difficulty][size];
    const cellsToTry = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        cellsToTry.push([i, j]);
      }
    }
    // Shuffle celle da provare
    for (let i = cellsToTry.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cellsToTry[i], cellsToTry[j]] = [cellsToTry[j], cellsToTry[i]];
    }
    
    let removed = 0;
    for (let [row, col] of cellsToTry) {
      if (removed >= cellsToRemove) break;
      
      if (grid[row][col] !== 0) {
        const backup = grid[row][col];
        grid[row][col] = 0;
        
        // Verifica che ci sia ancora una sola soluzione
        if (countSolutions(grid) === 1) {
          removed++;
        } else {
          // Ripristina se ci sono più soluzioni
          grid[row][col] = backup;
        }
      }
    }
    
    return { puzzle: grid, solution };
  };

  const [game, setGame] = useState(() => generateSudoku(gridSize));
  const [board, setBoard] = useState(game.puzzle.map(row => [...row]));
  const [selected, setSelected] = useState(null);
  const [errors, setErrors] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [hints, setHints] = useState(3);
  const [timerActive, setTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [history, setHistory] = useState([]);

  // Ricarica gioco quando cambiano impostazioni
  useEffect(() => {
    const newGame = generateSudoku(gridSize);
    setGame(newGame);
    setBoard(newGame.puzzle.map(row => [...row]));
    setSelected(null);
    setErrors([]);
    setCompleted(false);
    setHints(3);
    setTimerActive(false);
    setSeconds(0);
    setHistory([]);
  }, [gridSize, difficulty]);

  // Controlla completamento
  useEffect(() => {
    const isFilled = board.every(row => row.every(cell => cell !== 0));
    if (isFilled) {
      const isCorrect = board.every((row, r) => 
        row.every((cell, c) => cell === game.solution[r][c])
      );
      if (isCorrect && !completed) {
        setCompleted(true);
        setTimerActive(false);
      }
    }
  }, [board, game.solution, completed]);

  // Timer
  useEffect(() => {
    let interval;
    if (timerActive && !completed) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, completed]);

  // Input da tastiera (solo per tema numerico)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (completed) return;
      
      // Backspace o Delete per Undo
      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleUndo();
        return;
      }
      
      // Input numerico solo se tema numerico e cella selezionata
      if (!selected || symbolSet !== 'numbers') return;
      if (game.puzzle[selected.row][selected.col] !== 0) return;
      
      const num = parseInt(e.key);
      if (num >= 1 && num <= gridSize) {
        handleSymbolClick(num - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selected, completed, symbolSet, gridSize, game.puzzle, history]);

  const handleCellClick = (row, col) => {
    // Permetti selezione anche di celle fisse (per aiutare visivamente)
    setSelected({ row, col });
  };

  const handleSymbolClick = (symbolIndex) => {
    if (selected && game.puzzle[selected.row][selected.col] === 0) {
      // Salva lo stato corrente nella history
      setHistory(prev => [...prev.slice(-19), board.map(row => [...row])]);
      
      const newBoard = board.map(row => [...row]);
      newBoard[selected.row][selected.col] = symbolIndex + 1;
      setBoard(newBoard);
      
      // Mostra errore solo se l'opzione è attiva
      if (showErrors && symbolIndex + 1 !== game.solution[selected.row][selected.col]) {
        setErrors([...errors, `${selected.row}-${selected.col}`]);
        setTimeout(() => {
          setErrors(errors.filter(e => e !== `${selected.row}-${selected.col}`));
        }, 800);
      }
    }
  };

  const handleNewGame = () => {
    const newGame = generateSudoku(gridSize);
    setGame(newGame);
    setBoard(newGame.puzzle.map(row => [...row]));
    setSelected(null);
    setErrors([]);
    setCompleted(false);
    setHints(3);
    setTimerActive(false);
    setSeconds(0);
    setHistory([]);
  };

  const handleHint = () => {
    if (hints > 0 && selected && game.puzzle[selected.row][selected.col] === 0 && board[selected.row][selected.col] === 0) {
      // Salva lo stato corrente nella history
      setHistory(prev => [...prev.slice(-19), board.map(row => [...row])]);
      
      const newBoard = board.map(row => [...row]);
      newBoard[selected.row][selected.col] = game.solution[selected.row][selected.col];
      setBoard(newBoard);
      setHints(hints - 1);
      setSelected(null);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousBoard = history[history.length - 1];
      setBoard(previousBoard);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Conta quante volte ogni simbolo appare nella griglia
  const getSymbolCount = (symbolValue) => {
    let count = 0;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (board[i][j] === symbolValue) {
          count++;
        }
      }
    }
    return count;
  };

  // Verifica se un simbolo è completato (usato gridSize volte)
  const isSymbolCompleted = (symbolValue) => {
    return hideCompleted && getSymbolCount(symbolValue) >= gridSize;
  };

  // Calcola quali simboli sono validi per una data cella (per filtro intelligente)
  const getValidSymbols = (row, col) => {
    if (!smartFilter || !selected) return Array.from({ length: gridSize }, (_, i) => i + 1);
    
    const blockRows = gridSize === 4 ? 2 : gridSize === 6 ? 2 : 3;
    const blockCols = gridSize === 4 ? 2 : gridSize === 6 ? 3 : 3;
    const blockRow = Math.floor(row / blockRows);
    const blockCol = Math.floor(col / blockCols);
    
    const usedNumbers = new Set();
    
    // Controlla riga
    for (let c = 0; c < gridSize; c++) {
      if (board[row][c] !== 0) usedNumbers.add(board[row][c]);
    }
    
    // Controlla colonna
    for (let r = 0; r < gridSize; r++) {
      if (board[r][col] !== 0) usedNumbers.add(board[r][col]);
    }
    
    // Controlla blocco
    const startRow = blockRow * blockRows;
    const startCol = blockCol * blockCols;
    for (let r = startRow; r < startRow + blockRows; r++) {
      for (let c = startCol; c < startCol + blockCols; c++) {
        if (board[r][c] !== 0) usedNumbers.add(board[r][c]);
      }
    }
    
    // Ritorna simboli validi (quelli non usati)
    const validSymbols = [];
    for (let i = 1; i <= gridSize; i++) {
      if (!usedNumbers.has(i)) {
        validSymbols.push(i);
      }
    }
    
    return validSymbols;
  };

  const getSymbol = (num) => {
    if (num === 0) return '';
    return symbolSets[symbolSet][gridSize][num - 1];
  };

  const getCellBorderClasses = (row, col) => {
    // Non usiamo più bordi sulle celle, usiamo gap con sfondo colorato
    return '';
  };

  const getBlockBorder = (row, col) => {
    return '';
  };

  const currentStyle = colorStyles[currentColorStyle][darkMode ? 'dark' : 'light'];
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-300';
  const hoverBg = darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} p-4 sm:p-8 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight flex items-center gap-3 flex-shrink-0" style={{ fontFamily: '"Righteous", sans-serif' }}>
            Ema Sudoku 🥷
          </h1>
          <div className="flex gap-2 items-center flex-shrink-0 flex-wrap justify-center">
            <button
              onClick={() => setTimerActive(!timerActive)}
              className={`p-2 rounded-lg border ${borderColor} ${hoverBg} transition-colors ${
                timerActive ? (darkMode ? 'bg-blue-900 border-blue-500' : 'bg-blue-100 border-blue-500') : cardBg
              }`}
              title={timerActive ? "Ferma timer" : "Avvia timer"}
            >
              <Timer size={24} />
            </button>
            {timerActive && (
              <div className={`px-3 py-1 rounded-lg ${cardBg} border ${borderColor} font-mono font-bold`}>
                {formatTime(seconds)}
              </div>
            )}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`p-2 rounded-lg ${cardBg} border ${borderColor} ${hoverBg} transition-colors`}
              title="Informazioni"
            >
              <Info size={24} />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg ${cardBg} border ${borderColor} ${hoverBg} transition-colors`}
            >
              <Settings size={24} />
            </button>
          </div>
        </div>

        {/* Info Modal */}
        {showInfo && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
              onClick={() => setShowInfo(false)}
            ></div>
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 pointer-events-none">
              <div 
                className={`${cardBg} border ${borderColor} rounded-lg p-6 shadow-2xl max-w-2xl w-full mx-4 pointer-events-auto animate-slideDown`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl">Come si gioca</h3>
                  <button onClick={() => setShowInfo(false)} className={`p-1 rounded-lg ${hoverBg} transition-colors`}>
                    <X size={20} />
                  </button>
                </div>
                <p className="text-sm opacity-90">
                  Completa la griglia inserendo i simboli in modo che ogni riga, colonna e blocco contenga tutti i simboli una sola volta. 
                  Seleziona una casella vuota e poi clicca sul simbolo che vuoi inserire.
                  {symbolSet === 'numbers' && (
                    <span className="block mt-2 font-semibold">
                      💡 Suggerimento: Con il tema Numerico puoi usare la tastiera per inserire i numeri più velocemente!
                    </span>
                  )}
                  <span className="block mt-2 font-semibold">
                    ⌫ Premi Backspace o Delete per annullare l'ultima mossa!
                  </span>
                </p>
              </div>
            </div>
          </>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
              onClick={() => setShowSettings(false)}
            ></div>
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 pointer-events-none overflow-y-auto">
              <div 
                className={`${cardBg} border ${borderColor} rounded-lg p-6 shadow-2xl max-w-4xl w-full mx-4 my-4 pointer-events-auto animate-slideDown`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-xl">Impostazioni</h3>
                  <button onClick={() => setShowSettings(false)} className={`p-1 rounded-lg ${hoverBg} transition-colors`}>
                    <X size={20} />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Dimensione griglia */}
              <div>
                <label className="block font-semibold mb-2">Dimensione Griglia</label>
                <div className="flex gap-2">
                  {[4, 6, 9].map(size => (
                    <button
                      key={size}
                      onClick={() => setGridSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        gridSize === size 
                          ? `${darkMode ? 'border-blue-500 bg-blue-900' : 'border-blue-500 bg-blue-50'}` 
                          : `${borderColor} ${hoverBg}`
                      }`}
                    >
                      {size}×{size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Temi */}
              <div>
                <label className="block font-semibold mb-2">Tema</label>
                <select
                  value={symbolSet}
                  onChange={(e) => setSymbolSet(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${borderColor} ${cardBg} ${textColor}`}
                >
                  <option value="numbers">{symbolSets.numbers.name}</option>
                  <option value="animals">{symbolSets.animals.name}</option>
                  <option value="dinosaurs">{symbolSets.dinosaurs.name}</option>
                  <option value="fruits">{symbolSets.fruits.name}</option>
                  <option value="shapes">{symbolSets.shapes.name}</option>
                  <option value="sports">{symbolSets.sports.name}</option>
                  <option value="vegetables">{symbolSets.vegetables.name}</option>
                  <option value="desserts">{symbolSets.desserts.name}</option>
                  <option value="flowers">{symbolSets.flowers.name}</option>
                  <option value="monsters">{symbolSets.monsters.name}</option>
                </select>
              </div>

              {/* Difficoltà */}
              <div>
                <label className="block font-semibold mb-2">Difficoltà</label>
                <div className="flex gap-2">
                  {['easy', 'medium', 'hard'].map(level => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all flex-1 ${
                        difficulty === level 
                          ? `${darkMode ? 'border-blue-500 bg-blue-900' : 'border-blue-500 bg-blue-50'}` 
                          : `${borderColor} ${hoverBg}`
                      }`}
                    >
                      {level === 'easy' ? 'Facile' : level === 'medium' ? 'Medio' : 'Difficile'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-semibold">Modalità Scura</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-14 h-7 rounded-full transition-colors ${
                      darkMode ? 'bg-blue-600' : 'bg-gray-300'
                    }`}></div>
                    <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      darkMode ? 'translate-x-7' : 'translate-x-0'
                    }`}></div>
                  </div>
                </label>
              </div>

              {/* Nascondi Elementi Completati Toggle */}
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-semibold">Nascondi Completati</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={hideCompleted}
                      onChange={(e) => setHideCompleted(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-14 h-7 rounded-full transition-colors ${
                      hideCompleted ? 'bg-blue-600' : 'bg-gray-300'
                    }`}></div>
                    <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      hideCompleted ? 'translate-x-7' : 'translate-x-0'
                    }`}></div>
                  </div>
                </label>
                <p className="text-xs opacity-70 mt-1">
                  Disabilita i simboli già inseriti {gridSize} volte
                </p>
              </div>

              {/* Mostra Errori Toggle */}
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-semibold">Evidenzia Errori</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={showErrors}
                      onChange={(e) => setShowErrors(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-14 h-7 rounded-full transition-colors ${
                      showErrors ? 'bg-blue-600' : 'bg-gray-300'
                    }`}></div>
                    <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      showErrors ? 'translate-x-7' : 'translate-x-0'
                    }`}></div>
                  </div>
                </label>
                <p className="text-xs opacity-70 mt-1">
                  Mostra feedback rosso per errori
                </p>
              </div>

              {/* Filtro Intelligente Toggle */}
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-semibold">Filtro Intelligente</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={smartFilter}
                      onChange={(e) => setSmartFilter(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-14 h-7 rounded-full transition-colors ${
                      smartFilter ? 'bg-blue-600' : 'bg-gray-300'
                    }`}></div>
                    <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      smartFilter ? 'translate-x-7' : 'translate-x-0'
                    }`}></div>
                  </div>
                </label>
                <p className="text-xs opacity-70 mt-1">
                  Mostra solo simboli validi per la casella
                </p>
              </div>
            </div>
              </div>
            </div>
          </>
        )}

        {/* Griglia Sudoku */}
        <div className="flex justify-center mb-6 max-w-4xl mx-auto">
          <div className={`${cardBg} border ${borderColor} rounded-lg p-3 sm:p-4 shadow-lg w-full`}>
            {/* Contenitore esterno con bordo più spesso */}
            <div 
              className={`border-[3px] ${currentStyle.grid} mx-auto overflow-hidden rounded-sm`}
              style={{ 
                maxWidth: gridSize === 9 ? '590px' : gridSize === 6 ? '560px' : '480px',
                width: '100%'
              }}
            >
              {(() => {
                // Definizione blocchi per ogni tipo di griglia
                const blockRows = gridSize === 4 ? 2 : gridSize === 6 ? 2 : 3;
                const blockCols = gridSize === 4 ? 2 : gridSize === 6 ? 3 : 3;
                const totalBlockRows = gridSize / blockRows;
                const totalBlockCols = gridSize / blockCols;
                const totalBlocks = totalBlockRows * totalBlockCols;
                
                return (
                  <div 
                    className="grid"
                    style={{ 
                      gridTemplateColumns: `repeat(${totalBlockCols}, 1fr)`,
                      gridTemplateRows: `repeat(${totalBlockRows}, 1fr)`,
                      gap: '2px',
                      backgroundColor: currentStyle.lineBlock
                    }}
                  >
                    {Array.from({ length: totalBlocks }).map((_, blockIndex) => {
                      const blockRow = Math.floor(blockIndex / totalBlockCols);
                      const blockCol = blockIndex % totalBlockCols;
                      
                      return (
                        <div 
                          key={blockIndex}
                          className="grid"
                          style={{
                            gridTemplateColumns: `repeat(${blockCols}, 1fr)`,
                            gridTemplateRows: `repeat(${blockRows}, 1fr)`,
                            gap: '1px',
                            backgroundColor: currentStyle.lineCell
                          }}
                        >
                          {Array.from({ length: blockRows * blockCols }).map((_, cellIndex) => {
                            const cellRow = Math.floor(cellIndex / blockCols);
                            const cellCol = cellIndex % blockCols;
                            const rowIndex = blockRow * blockRows + cellRow;
                            const colIndex = blockCol * blockCols + cellCol;
                            
                            // Safety check
                            if (!board[rowIndex] || board[rowIndex][colIndex] === undefined) {
                              return null;
                            }
                            
                            const cell = board[rowIndex][colIndex];
                            const isSelected = selected?.row === rowIndex && selected?.col === colIndex;
                            const isInSameRow = selected?.row === rowIndex;
                            const isInSameCol = selected?.col === colIndex;
                            const isHighlighted = (isInSameRow || isInSameCol) && !isSelected;
                            const isFixed = game.puzzle[rowIndex][colIndex] !== 0;
                            const isError = errors.includes(`${rowIndex}-${colIndex}`);
                            
                            return (
                              <button
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                disabled={completed}
                                className={`
                                  aspect-square flex items-center justify-center
                                  ${isFixed ? currentStyle.fixedBg : currentStyle.cellBg}
                                  ${isHighlighted ? (darkMode ? 'brightness-125' : 'brightness-90') : ''}
                                  ${!completed ? 'cursor-pointer hover:brightness-95' : 'cursor-default'}
                                  ${isSelected ? `ring-4 ring-inset ${currentStyle.selected}` : ''}
                                  ${isError ? 'animate-shake bg-red-200 dark:bg-red-900' : ''}
                                  transition-all duration-150
                                  ${gridSize === 9 ? 'text-2xl sm:text-4xl' : gridSize === 6 ? 'text-3xl sm:text-5xl' : 'text-4xl sm:text-6xl'}
                                  font-bold
                                `}
                              >
                                {getSymbol(cell)}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Tastiera simboli */}
        {!completed && (
          <div className={`${cardBg} border ${borderColor} rounded-lg p-3 sm:p-4 shadow-lg mb-4 max-w-4xl mx-auto`}>
            <div className="flex gap-2 justify-center items-center flex-wrap">
              {symbolSets[symbolSet][gridSize].map((symbol, index) => {
                const symbolValue = index + 1;
                const isCompleted = isSymbolCompleted(symbolValue);
                
                // Calcola simboli validi per la cella selezionata (filtro intelligente)
                const validSymbols = selected ? getValidSymbols(selected.row, selected.col) : [];
                const isValidForCell = !smartFilter || validSymbols.includes(symbolValue);
                
                // Determina lo stato del pulsante
                const isFixedCell = selected && game.puzzle[selected.row][selected.col] !== 0;
                const isCurrentValue = selected && board[selected.row][selected.col] === symbolValue;
                const isClickable = selected && !isFixedCell && !isCompleted && isValidForCell;
                
                // Stati visuali
                let buttonStyle = '';
                if (!selected || isFixedCell || isCompleted || !isValidForCell) {
                  // Stato 1: Disabilitato (bianco/grigio)
                  buttonStyle = `${currentStyle.buttonInactive} cursor-not-allowed opacity-50`;
                } else if (isCurrentValue) {
                  // Stato 3: Valore corrente (evidenziato con ring)
                  buttonStyle = `${currentStyle.buttonActive} ring-4 ${currentStyle.selected} shadow-lg cursor-pointer`;
                } else {
                  // Stato 2: Attivo normale
                  buttonStyle = `${currentStyle.buttonActive} hover:brightness-110 hover:shadow-xl hover:border-white/40 active:scale-95 shadow-md cursor-pointer`;
                }
                
                // Tooltip informativo
                let tooltipText = '';
                if (isCompleted) {
                  tooltipText = `Tutti i ${symbol} sono stati inseriti`;
                } else if (smartFilter && !isValidForCell && selected && !isFixedCell) {
                  tooltipText = `${symbol} non può stare qui (già presente in riga, colonna o blocco)`;
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => isClickable && handleSymbolClick(index)}
                    disabled={!isClickable}
                    className={`
                      rounded-lg font-bold transition-all border-2
                      ${buttonStyle}
                      ${gridSize === 9 
                        ? 'text-xl sm:text-2xl w-12 h-12 sm:w-14 sm:h-14' 
                        : gridSize === 6 
                        ? 'text-2xl sm:text-3xl w-14 h-14 sm:w-16 sm:h-16' 
                        : 'text-3xl sm:text-4xl w-16 h-16 sm:w-20 sm:h-20'
                      }
                    `}
                    title={tooltipText}
                  >
                    {symbol}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Controlli */}
        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
          <button
            onClick={handleNewGame}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:scale-105
              ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
          >
            <RotateCcw size={20} />
            Nuovo Gioco
          </button>
          
          {!completed && (
            <button
              onClick={handleUndo}
              disabled={history.length === 0}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-md transition-all
                ${history.length > 0
                  ? `${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white hover:shadow-lg transform hover:scale-105`
                  : `${darkMode ? 'bg-gray-700' : 'bg-gray-300'} ${darkMode ? 'text-gray-500' : 'text-gray-500'} cursor-not-allowed`
                }`}
              title="Annulla ultima mossa (Backspace/Delete)"
            >
              <Undo size={20} />
              Annulla
            </button>
          )}
          
          {!completed && (
            <button
              onClick={handleHint}
              disabled={hints === 0 || !selected}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-md transition-all
                ${hints > 0 && selected
                  ? `${darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'} text-white hover:shadow-lg transform hover:scale-105`
                  : `${darkMode ? 'bg-gray-700' : 'bg-gray-300'} ${darkMode ? 'text-gray-500' : 'text-gray-500'} cursor-not-allowed`
                }`}
            >
              <Lightbulb size={20} />
              Aiuto ({hints})
            </button>
          )}
        </div>

        {/* Modal completamento */}
        {completed && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`${cardBg} rounded-2xl p-8 max-w-md text-center shadow-2xl`}>
              <Trophy size={64} className="mx-auto mb-4 text-yellow-500" />
              <h2 className="text-3xl font-bold mb-4">Complimenti! 🎉</h2>
              <p className="text-lg mb-6 opacity-90">
                Hai completato il Sudoku!
              </p>
              <button
                onClick={handleNewGame}
                className={`px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105
                  ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                Gioca Ancora
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EmaSudoku;
