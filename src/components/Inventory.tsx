import { Player, Weapon, Equipment, RARITY_CONFIG } from '../types';
import { calculateTotalStats } from '../utils/combatUtils';

interface InventoryProps {
  player: Player;
  onEquipItem: (item: Weapon | Equipment) => void;
}

export const Inventory = ({ player, onEquipItem }: InventoryProps) => {
  const totalStats = calculateTotalStats(player);

  const isWeapon = (item: Weapon | Equipment): item is Weapon => {
    return 'type' in item;
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-purple-500/30">
      <h2 className="text-2xl font-bold mb-4 text-purple-300">📦 Inventory & Stats</h2>

      {/* 総合ステータス */}
      <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-3 text-pink-300">Total Stats</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-gray-400">Attack</div>
            <div className="text-xl font-bold text-red-400">{totalStats.attack}</div>
          </div>
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-gray-400">Defense</div>
            <div className="text-xl font-bold text-blue-400">{totalStats.defense}</div>
          </div>
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-gray-400">Speed</div>
            <div className="text-xl font-bold text-green-400">{totalStats.speed}</div>
          </div>
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-gray-400">Crit Chance</div>
            <div className="text-xl font-bold text-purple-400">
              {(totalStats.criticalChance * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* 装備中のアイテム */}
      <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-3 text-pink-300">Equipped</h3>

        {/* 武器 */}
        <div className="mb-3">
          <div className="text-sm text-gray-400 mb-1">Weapon</div>
          {player.weapon ? (
            <div
              className={`bg-slate-800/50 rounded p-2 border ${RARITY_CONFIG[player.weapon.rarity]?.color ?? 'text-gray-400'
                } border-current/30`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className={`font-semibold ${RARITY_CONFIG[player.weapon.rarity]?.color ?? 'text-gray-400'}`}>
                    {player.weapon.name}
                  </div>
                  <div className="text-xs text-gray-400">{player.weapon.type}</div>
                </div>
                <div className="text-xs text-gray-400">{player.weapon.rarity}</div>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                ATK +{player.weapon.stats.attack} | SPD +{player.weapon.stats.speed}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">No weapon equipped</div>
          )}
        </div>

        {/* 装備 */}
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(player.equipment).map(([slot, equipment]) => (
            <div key={slot}>
              <div className="text-xs text-gray-400 mb-1">{slot}</div>
              {equipment ? (
                <div
                  className={`bg-slate-800/50 rounded p-2 border text-xs ${RARITY_CONFIG[equipment.rarity]?.color ?? 'text-gray-400'
                    } border-current/30`}
                >
                  <div className={`font-semibold ${RARITY_CONFIG[equipment.rarity]?.color ?? 'text-gray-400'}`}>
                    {equipment.name.split(' ').slice(0, 2).join(' ')}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    DEF +{equipment.stats.defense}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-500 italic">Empty</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* インベントリアイテム */}
      <div className="bg-slate-900/50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 text-pink-300">
          Items ({player.inventory.length})
        </h3>

        {player.inventory.length === 0 ? (
          <div className="text-sm text-gray-500 italic text-center py-4">
            No items in inventory
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {player.inventory.map((item) => (
              <div
                key={item.id}
                className={`bg-slate-800/50 rounded p-3 border ${RARITY_CONFIG[item.rarity]?.color ?? 'text-gray-400'
                  } border-current/30 hover:bg-slate-800/80 transition-all`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className={`font-semibold ${RARITY_CONFIG[item.rarity]?.color ?? 'text-gray-400'}`}>
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {isWeapon(item) ? item.type : item.slot} • {item.rarity}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  {isWeapon(item) ? (
                    <>
                      ATK +{item.stats.attack} | DEF +{item.stats.defense} | SPD +
                      {item.stats.speed}
                    </>
                  ) : (
                    <>
                      DEF +{item.stats.defense} | HP +{item.stats.hp}
                    </>
                  )}
                </div>
                <button
                  onClick={() => onEquipItem(item)}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold py-1.5 px-3 rounded transition-all duration-200"
                >
                  Equip
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
