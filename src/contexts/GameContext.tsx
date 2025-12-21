import React, { createContext, useContext, useState, ReactNode } from 'react';

export type GameScreen = 
  | 'title' 
  | 'tutorial' 
  | 'round1' 
  | 'round1-results' 
  | 'round2' 
  | 'round2-results' 
  | 'final-mission' 
  | 'case1' 
  | 'case2' 
  | 'case3' 
  | 'final-results';

interface ScoreBreakdown {
  round1: number;
  round2: number;
  case1: number;
  case2: number;
  case3: number;
}

interface GameContextType {
  currentScreen: GameScreen;
  setCurrentScreen: (screen: GameScreen) => void;
  scores: ScoreBreakdown;
  updateScore: (round: keyof ScoreBreakdown, score: number) => void;
  totalScore: number;
  resetGame: () => void;
}

const initialScores: ScoreBreakdown = {
  round1: 0,
  round2: 0,
  case1: 0,
  case2: 0,
  case3: 0,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('title');
  const [scores, setScores] = useState<ScoreBreakdown>(initialScores);

  const updateScore = (round: keyof ScoreBreakdown, score: number) => {
    setScores(prev => ({ ...prev, [round]: score }));
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const resetGame = () => {
    setScores(initialScores);
    setCurrentScreen('title');
  };

  return (
    <GameContext.Provider value={{
      currentScreen,
      setCurrentScreen,
      scores,
      updateScore,
      totalScore,
      resetGame,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
