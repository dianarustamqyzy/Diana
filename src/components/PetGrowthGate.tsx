import { ReactNode } from 'react';
import { Redirect, useLocation } from 'wouter';
import { useGame } from '../context/GameContext';
import { hasPetGrown } from '../lib/levelProgress';

export function PetGrowthGate({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { level } = useGame();
  const petHasGrown = hasPetGrown(level);

  if (petHasGrown && location !== '/new-pet') {
    return <Redirect to="/new-pet" replace />;
  }

  if (!petHasGrown && location === '/new-pet') {
    return <Redirect to="/game" replace />;
  }

  return children;
}
