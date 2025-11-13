import { Enemy, EnemyType, Boss, Position, Stats } from '../types';
import { generateId } from './itemGenerator';

// 敵の基礎ステータス
const ENEMY_BASE_STATS: Record<EnemyType, { hp: number; stats: Stats; abilities: string[] }> = {
  [EnemyType.Mephit]: {
    hp: 40,
    stats: { attack: 12, defense: 5, speed: 18, criticalChance: 0.05, hp: 40 },
    abilities: ['Flying', 'Death Burst'],
  },
  [EnemyType.MissileMephit]: {
    hp: 50,
    stats: { attack: 18, defense: 6, speed: 12, criticalChance: 0.08, hp: 50 },
    abilities: ['Flying', 'Missile Launch (AOE)'],
  },
  [EnemyType.Golem]: {
    hp: 120,
    stats: { attack: 25, defense: 20, speed: 8, criticalChance: 0.02, hp: 120 },
    abilities: ['Frost Aura', 'Shockwave (AOE)'],
  },
  [EnemyType.EliteMephit]: {
    hp: 70,
    stats: { attack: 22, defense: 10, speed: 20, criticalChance: 0.12, hp: 70 },
    abilities: ['Flying', 'Death Burst', 'Enhanced Drop Rate'],
  },
};

// 敵を生成
export const generateEnemy = (type: EnemyType, position: Position): Enemy => {
  const base = ENEMY_BASE_STATS[type] ?? ENEMY_BASE_STATS[EnemyType.Mephit];

  return {
    id: generateId(),
    type,
    name: type,
    hp: base.hp,
    maxHp: base.hp,
    stats: { ...base.stats },
    position,
    isAlive: true,
    abilities: [...base.abilities],
  };
};

// ランダムな敵を生成
export const generateRandomEnemy = (position: Position): Enemy => {
  const types = Object.values(EnemyType);
  // エリートメフィットは10%の確率でしか出現しない
  const weights = [0.4, 0.3, 0.2, 0.1]; // Mephit, MissileMephit, Golem, EliteMephit
  const rand = Math.random();
  let cumulative = 0;

  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    if (weight === undefined) continue;
    cumulative += weight;
    if (rand <= cumulative) {
      const type = types[i];
      if (type === undefined) continue;
      return generateEnemy(type, position);
    }
  }

  return generateEnemy(EnemyType.Mephit, position);
};

// ボス（ガルム）を生成
export const generateBoss = (position: Position): Boss => {
  return {
    id: generateId(),
    type: EnemyType.Mephit, // 便宜上
    name: 'Garm - The Mechanized Hound',
    hp: 500,
    maxHp: 500,
    stats: {
      attack: 35,
      defense: 25,
      speed: 15,
      criticalChance: 0.1,
      hp: 500,
    },
    position,
    isAlive: true,
    abilities: ['Swift Strike', 'Claw Barrage'],
    phase: 1,
    phaseThreshold: 0.5, // HP 50%でフェーズ2へ
  };
};

// 敵の群れを生成（ステージ開始時）
export const generateEnemyWave = (mapWidth: number, mapHeight: number, count: number): Enemy[] => {
  const enemies: Enemy[] = [];

  for (let i = 0; i < count; i++) {
    const position: Position = {
      x: Math.floor(Math.random() * mapWidth),
      y: Math.floor(Math.random() * mapHeight),
    };
    enemies.push(generateRandomEnemy(position));
  }

  return enemies;
};
