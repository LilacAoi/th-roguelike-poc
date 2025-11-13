import { GameState } from './types';
import { useGameLogic } from './hooks/useGameLogic';
import { CharacterSelect } from './components/CharacterSelect';
import { GameMap } from './components/GameMap';
import { Inventory } from './components/Inventory';
import { LogPanel } from './components/LogPanel';
import { GameOver } from './components/GameOver';
import { Victory } from './components/Victory';

function App() {
  const { gameData, startGame, attackEnemy, attackBoss, equipItem, resetGame } = useGameLogic();

  // キャラクター選択画面
  if (gameData.state === GameState.CharacterSelect) {
    return <CharacterSelect onStart={startGame} />;
  }

  // ゲームプレイ画面
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            TooHuman Roguelike
          </h1>
          <p className="text-gray-400">Stage 1: Freya vs. The Mechanized Horde</p>
        </div>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 左カラム: ゲームマップ */}
          <div className="lg:col-span-2">
            <GameMap
              player={gameData.player}
              enemies={gameData.enemies}
              boss={gameData.boss}
              gameState={gameData.state}
              onAttackEnemy={attackEnemy}
              onAttackBoss={attackBoss}
            />

            {/* ログパネル (モバイルでは下に表示) */}
            <div className="mt-4 lg:hidden">
              <LogPanel logs={gameData.logs} />
            </div>
          </div>

          {/* 右カラム */}
          <div className="space-y-4">
            {/* インベントリ */}
            <Inventory player={gameData.player} onEquipItem={equipItem} />

            {/* ログパネル (デスクトップでは右に表示) */}
            <div className="hidden lg:block">
              <LogPanel logs={gameData.logs} />
            </div>
          </div>
        </div>
      </div>

      {/* オーバーレイ */}
      {gameData.state === GameState.GameOver && <GameOver onRestart={resetGame} />}
      {gameData.state === GameState.Victory && <Victory onRestart={resetGame} />}
    </div>
  );
}

export default App;
