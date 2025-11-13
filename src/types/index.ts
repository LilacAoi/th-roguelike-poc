// レアリティ定義
export enum Rarity {
  Common = 'Common',
  LessCommon = 'Less Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  VeryRare = 'Very Rare',
  Epic = 'Epic',
}

// レアリティの色とドロップ率
export const RARITY_CONFIG: Record<Rarity, { color: string; dropRate: number; runeSlots: number }> = {
  [Rarity.Common]: { color: 'text-rarity-common', dropRate: 0.50, runeSlots: 1 },
  [Rarity.LessCommon]: { color: 'text-rarity-less-common', dropRate: 0.30, runeSlots: 1 },
  [Rarity.Uncommon]: { color: 'text-rarity-uncommon', dropRate: 0.15, runeSlots: 2 },
  [Rarity.Rare]: { color: 'text-rarity-rare', dropRate: 0.04, runeSlots: 2 },
  [Rarity.VeryRare]: { color: 'text-rarity-very-rare', dropRate: 0.009, runeSlots: 3 },
  [Rarity.Epic]: { color: 'text-rarity-epic', dropRate: 0.001, runeSlots: 3 },
};

// 武器タイプ
export enum WeaponType {
  Sword = 'Sword',
  Staff = 'Staff',
  Hammer = 'Hammer',
  Pistol = 'Pistol',
  Rifle = 'Rifle',
  Cannon = 'Cannon',
}

// 装備スロット
export enum EquipmentSlot {
  Helm = 'Helm',
  Torso = 'Torso',
  Shoulder = 'Shoulder',
  Gauntlet = 'Gauntlet',
  Legging = 'Legging',
  Boots = 'Boots',
}

// ルーンタイプ
export enum RuneType {
  Strength = 'Strength',
  Vitality = 'Vitality',
  Defense = 'Defense',
  CriticalChance = 'Critical Chance',
  Speed = 'Speed',
}

// ステータス
export interface Stats {
  attack: number;
  defense: number;
  speed: number;
  criticalChance: number;
  hp: number;
}

// ルーン
export interface Rune {
  id: string;
  name: string;
  type: RuneType;
  rarity: Rarity;
  bonus: Partial<Stats>;
}

// 武器
export interface Weapon {
  id: string;
  name: string;
  type: WeaponType;
  rarity: Rarity;
  stats: Stats;
  runeSlots: number;
  equippedRunes: (Rune | null)[];
}

// 装備アイテム
export interface Equipment {
  id: string;
  name: string;
  slot: EquipmentSlot;
  rarity: Rarity;
  stats: Stats;
  runeSlots: number;
  equippedRunes: (Rune | null)[];
}

// プレイヤー
export interface Player {
  name: string;
  class: string;
  hp: number;
  maxHp: number;
  baseStats: Stats;
  weapon: Weapon | null;
  equipment: Record<EquipmentSlot, Equipment | null>;
  inventory: (Weapon | Equipment)[];
  runes: Rune[];
  position: Position;
}

// 敵タイプ
export enum EnemyType {
  Mephit = 'Mephit',
  MissileMephit = 'Missile Mephit',
  Golem = 'Golem',
  EliteMephit = 'Elite Mephit',
}

// 敵
export interface Enemy {
  id: string;
  type: EnemyType;
  name: string;
  hp: number;
  maxHp: number;
  stats: Stats;
  position: Position;
  isAlive: boolean;
  abilities: string[];
}

// ボス
export interface Boss extends Enemy {
  phase: 1 | 2;
  phaseThreshold: number;
}

// 位置情報
export interface Position {
  x: number;
  y: number;
}

// ゲーム状態
export enum GameState {
  CharacterSelect = 'CharacterSelect',
  Playing = 'Playing',
  BossFight = 'BossFight',
  Victory = 'Victory',
  GameOver = 'GameOver',
}

// ログメッセージ
export interface LogMessage {
  id: string;
  text: string;
  timestamp: number;
  type: 'info' | 'damage' | 'drop' | 'critical' | 'boss';
}

// ゲーム全体の状態
export interface GameData {
  state: GameState;
  player: Player;
  enemies: Enemy[];
  boss: Boss | null;
  logs: LogMessage[];
  turn: number;
}
