import { Link } from 'wouter';
import { BlockBoard } from '../components/BlockBoard';
import { BlockPieceTray } from '../components/BlockPieceTray';
import { useGame } from '../context/GameContext';
import { useBlockPuzzle } from '../hooks/useBlockPuzzle';

export function BlockGamePage() {
  const { addCoins } = useGame();
  const game = useBlockPuzzle(addCoins);

  return (
    <section className="block-game-page">
      <Link href="/games" className="back-to-games">← Все игры</Link>
      <header className="block-game-heading">
        <div>
          <p className="eyebrow">МИНИ-ИГРА</p>
          <h1>Уютные блоки</h1>
          <p>Собирай полные ряды и столбцы. За каждую собранную линию ты получишь 1 монетку!</p>
        </div>
        <div className="block-score-card">
          <span><small>СЧЁТ</small><strong>{game.score}</strong></span>
          <span><small>РЕКОРД</small><strong>{game.bestScore}</strong></span>
        </div>
      </header>

      <div className="block-game-card">
        <div className="block-board-wrap">
          <BlockBoard board={game.board} canPlaceAt={game.canPlaceAt} onPlace={game.placeAt} />
          {game.isOver && (
            <div className="block-game-over" role="dialog" aria-modal="true">
              <span>🌟</span><h2>Отличная попытка!</h2><p>Ты набрала {game.score} очков.</p>
              <button type="button" onClick={game.restart}>Играть ещё</button>
            </div>
          )}
        </div>

        <aside className="block-game-tools">
          <div><p className="eyebrow">ВЫБЕРИ ФИГУРУ</p><h2>Твой ход</h2></div>
          <BlockPieceTray pieces={game.pieces} selectedId={game.selectedId} onSelect={game.selectPiece} />
          <p className="block-game-tip">Нажми на фигуру, а потом — на клетку, с которой хочешь её поставить.</p>
          <button className="block-restart" type="button" onClick={game.restart}>Начать заново</button>
        </aside>
      </div>
    </section>
  );
}
