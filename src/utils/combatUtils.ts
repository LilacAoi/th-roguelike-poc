import { Player, Enemy, Boss, Stats, EquipmentSlot, LogMessage } from '../types';
import { generateId } from './itemGenerator';

// プレイヤーの総合ステータスを計算
export const calculateTotalStats = (player: Player): Stats => {
  const baseStats = { ...player.baseStats };

  // 武器のステータスを加算
  if (player.weapon) {
    baseStats.attack += player.weapon.stats.attack;
    baseStats.defense += player.weapon.stats.defense;
    baseStats.speed += player.weapon.stats.speed;
    baseStats.criticalChance += player.weapon.stats.criticalChance;

    // 武器に装着されたルーンのボーナスを加算
    player.weapon.equippedRunes.forEach((rune) => {
      if (rune) {
        baseStats.attack += rune.bonus.attack ?? 0;
        baseStats.defense += rune.bonus.defense ?? 0;
        baseStats.speed += rune.bonus.speed ?? 0;
        baseStats.criticalChance += rune.bonus.criticalChance ?? 0;
        baseStats.hp += rune.bonus.hp ?? 0;
      }
    });
  }

  // 装備のステータスを加算
  Object.values(EquipmentSlot).forEach((slot) => {
    const equipment = player.equipment[slot];
    if (equipment) {
      baseStats.attack += equipment.stats.attack;
      baseStats.defense += equipment.stats.defense;
      baseStats.speed += equipment.stats.speed;
      baseStats.criticalChance += equipment.stats.criticalChance;
      baseStats.hp += equipment.stats.hp;

      // 装備に装着されたルーンのボーナスを加算
      equipment.equippedRunes.forEach((rune) => {
        if (rune) {
          baseStats.attack += rune.bonus.attack ?? 0;
          baseStats.defense += rune.bonus.defense ?? 0;
          baseStats.speed += rune.bonus.speed ?? 0;
          baseStats.criticalChance += rune.bonus.criticalChance ?? 0;
          baseStats.hp += rune.bonus.hp ?? 0;
        }
      });
    }
  });

  return baseStats;
};

// ダメージ計算
export const calculateDamage = (
  attackerStats: Stats,
  defenderStats: Stats,
  isCritical = false
): number => {
  const baseDamage = Math.max(1, attackerStats.attack - defenderStats.defense * 0.5);
  const finalDamage = isCritical ? baseDamage * 2 : baseDamage;
  return Math.round(finalDamage);
};

// クリティカルヒット判定
export const isCriticalHit = (criticalChance: number): boolean => {
  return Math.random() < criticalChance;
};

// ログメッセージを生成
export const createLogMessage = (
  text: string,
  type: LogMessage['type'] = 'info'
): LogMessage => {
  return {
    id: generateId(),
    text,
    timestamp: Date.now(),
    type,
  };
};

// プレイヤーが敵を攻撃
export const playerAttackEnemy = (
  player: Player,
  enemy: Enemy | Boss,
  playerStats: Stats
): { updatedEnemy: Enemy | Boss; log: LogMessage } => {
  const critical = isCriticalHit(playerStats.criticalChance);
  const damage = calculateDamage(playerStats, enemy.stats, critical);

  const updatedEnemy = {
    ...enemy,
    hp: Math.max(0, enemy.hp - damage),
    isAlive: enemy.hp - damage > 0,
  };

  const logText = critical
    ? `⚔️ ${player.name} dealt ${damage} CRITICAL damage to ${enemy.name}!`
    : `⚔️ ${player.name} dealt ${damage} damage to ${enemy.name}.`;

  return {
    updatedEnemy,
    log: createLogMessage(logText, critical ? 'critical' : 'damage'),
  };
};

// 敵がプレイヤーを攻撃
export const enemyAttackPlayer = (
  enemy: Enemy | Boss,
  player: Player,
  playerStats: Stats
): { damage: number; log: LogMessage } => {
  const critical = isCriticalHit(enemy.stats.criticalChance);
  const damage = calculateDamage(enemy.stats, playerStats, critical);

  const logText = critical
    ? `💥 ${enemy.name} dealt ${damage} CRITICAL damage to ${player.name}!`
    : `💥 ${enemy.name} dealt ${damage} damage to ${player.name}.`;

  return {
    damage,
    log: createLogMessage(logText, critical ? 'critical' : 'damage'),
  };
};

// ボスのフェーズ変更をチェック
export const checkBossPhaseChange = (boss: Boss): Boss => {
  if (boss.phase === 1 && boss.hp / boss.maxHp <= boss.phaseThreshold) {
    return {
      ...boss,
      phase: 2,
      abilities: ['Swift Strike', 'Claw Barrage', 'Drone Summon', 'Charge Attack', 'Beam Blast'],
      stats: {
        ...boss.stats,
        attack: boss.stats.attack + 10,
        speed: boss.stats.speed + 5,
      },
    };
  }
  return boss;
};

// 距離計算
export const calculateDistance = (
  pos1: { x: number; y: number },
  pos2: { x: number; y: number }
): number => {
  return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
};
