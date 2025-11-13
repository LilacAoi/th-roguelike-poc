import { Player, Enemy, Boss, GameState } from '../types';
import { HPBar } from './HPBar';

interface GameMapProps {
  player: Player;
  enemies: Enemy[];
  boss: Boss | null;
  gameState: GameState;
  onAttackEnemy: (enemyId: string) => void;
  onAttackBoss: () => void;
}

export const GameMap = ({
  player,
  enemies,
  boss,
  gameState,
  onAttackEnemy,
  onAttackBoss,
}: GameMapProps) => {
  const isBossFight = gameState === GameState.BossFight;

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-purple-500/30">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2 text-purple-300">
          {isBossFight ? '🔥 Boss Battle' : '⚔️ Battle Arena'}
        </h2>
        <div className="text-sm text-gray-400">
          Turn: <span className="text-purple-400 font-semibold">#{player.position.x}</span>
        </div>
      </div>

      {/* プレイヤー情報 */}
      <div className="mb-6 bg-slate-900/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="text-3xl">⚔️</div>
            <div>
              <div className="font-bold text-lg text-purple-300">{player.name}</div>
              <div className="text-sm text-gray-400">{player.class}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Weapon</div>
            <div className="text-sm font-semibold text-purple-300">
              {player.weapon?.name ?? 'None'}
            </div>
          </div>
        </div>
        <HPBar current={player.hp} max={player.maxHp} showLabel />
      </div>

      {/* ボス戦 */}
      {isBossFight && boss && boss.isAlive && (
        <div className="mb-6">
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-lg p-4 border-2 border-red-500/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-4xl">🐺</div>
                <div>
                  <div className="font-bold text-xl text-red-300">{boss.name}</div>
                  <div className="text-sm text-orange-300">
                    Phase {boss.phase} {boss.phase === 2 && '⚡'}
                  </div>
                </div>
              </div>
            </div>
            <HPBar current={boss.hp} max={boss.maxHp} showLabel color="red" />
            <div className="mt-3 flex flex-wrap gap-2">
              {boss.abilities.map((ability) => (
                <span
                  key={ability}
                  className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded"
                >
                  {ability}
                </span>
              ))}
            </div>
            <button
              onClick={onAttackBoss}
              className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold py-3 px-4 rounded transition-all duration-200 transform hover:scale-105"
            >
              ⚔️ Attack Boss
            </button>
          </div>
        </div>
      )}

      {/* 通常の敵 */}
      {!isBossFight && enemies.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-purple-300">
            Enemies ({enemies.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {enemies.map((enemy) => (
              <div
                key={enemy.id}
                className="bg-slate-900/50 rounded-lg p-3 border border-red-500/30 hover:border-red-500/60 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">
                      {enemy.type === 'Mephit' && '👻'}
                      {enemy.type === 'Missile Mephit' && '🚀'}
                      {enemy.type === 'Golem' && '🗿'}
                      {enemy.type === 'Elite Mephit' && '👹'}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-red-300">{enemy.name}</div>
                      <div className="text-xs text-gray-400">
                        ATK: {enemy.stats.attack} | DEF: {enemy.stats.defense}
                      </div>
                    </div>
                  </div>
                </div>
                <HPBar current={enemy.hp} max={enemy.maxHp} size="sm" />
                <div className="mt-2 flex flex-wrap gap-1">
                  {enemy.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="text-xs bg-red-900/30 text-red-400 px-1.5 py-0.5 rounded"
                    >
                      {ability}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onAttackEnemy(enemy.id)}
                  className="w-full mt-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2 px-3 rounded transition-all duration-200"
                >
                  ⚔️ Attack
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 敵がいない場合 */}
      {!isBossFight && enemies.length === 0 && !boss && (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-2">🎯</div>
          <div>Preparing for the boss battle...</div>
        </div>
      )}
    </div>
  );
};
