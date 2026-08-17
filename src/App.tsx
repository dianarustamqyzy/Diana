import { Route, Switch } from 'wouter';
import { AppShell } from './components/AppShell';
import { LevelGift } from './components/LevelGift';
import { GameProvider } from './context/GameContext';
import { DiaryPage } from './pages/DiaryPage';
import { ChatPage } from './pages/ChatPage';
import { BlockGamePage } from './pages/BlockGamePage';
import { GamePage } from './pages/GamePage';
import { GamesPage } from './pages/GamesPage';
import { HomePage } from './pages/HomePage';
import { MissionsPage } from './pages/MissionsPage';
import { MemoryGamePage } from './pages/MemoryGamePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PetHomePage } from './pages/PetHomePage';
import { ShopPage } from './pages/ShopPage';
import { RegisterPage } from './pages/RegisterPage';
import { RpsGamePage } from './pages/RpsGamePage';
import { QuickMathPage } from './pages/QuickMathPage';
import { SnakeGamePage } from './pages/SnakeGamePage';
import { SudokuPage } from './pages/SudokuPage';

export default function App() {
  return (
    <GameProvider>
      <LevelGift />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/game"><AppShell><GamePage /></AppShell></Route>
        <Route path="/pet-home"><AppShell><PetHomePage /></AppShell></Route>
        <Route path="/missions"><AppShell><MissionsPage /></AppShell></Route>
        <Route path="/shop"><AppShell><ShopPage /></AppShell></Route>
        <Route path="/diary"><AppShell><DiaryPage /></AppShell></Route>
        <Route path="/chat"><AppShell><ChatPage /></AppShell></Route>
        <Route path="/games"><AppShell><GamesPage /></AppShell></Route>
        <Route path="/block-game"><AppShell><BlockGamePage /></AppShell></Route>
        <Route path="/snake"><AppShell><SnakeGamePage /></AppShell></Route>
        <Route path="/memory"><AppShell><MemoryGamePage /></AppShell></Route>
        <Route path="/rps"><AppShell><RpsGamePage /></AppShell></Route>
        <Route path="/quick-math"><AppShell><QuickMathPage /></AppShell></Route>
        <Route path="/sudoku"><AppShell><SudokuPage /></AppShell></Route>
        <Route component={NotFoundPage} />
      </Switch>
    </GameProvider>
  );
}
