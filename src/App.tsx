import { Route, Switch } from 'wouter';
import { AppShell } from './components/AppShell';
import { GameProvider } from './context/GameContext';
import { DiaryPage } from './pages/DiaryPage';
import { ChatPage } from './pages/ChatPage';
import { GamePage } from './pages/GamePage';
import { HomePage } from './pages/HomePage';
import { MissionsPage } from './pages/MissionsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ShopPage } from './pages/ShopPage';

export default function App() {
  return (
    <GameProvider>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/game"><AppShell><GamePage /></AppShell></Route>
        <Route path="/missions"><AppShell><MissionsPage /></AppShell></Route>
        <Route path="/shop"><AppShell><ShopPage /></AppShell></Route>
        <Route path="/diary"><AppShell><DiaryPage /></AppShell></Route>
        <Route path="/chat"><AppShell><ChatPage /></AppShell></Route>
        <Route component={NotFoundPage} />
      </Switch>
    </GameProvider>
  );
}
