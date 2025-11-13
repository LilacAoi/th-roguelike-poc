import {
  Rarity,
  RARITY_CONFIG,
  WeaponType,
  EquipmentSlot,
  Weapon,
  Equipment,
  Stats,
  Rune,
  RuneType,
} from '../types';

// ユニークIDを生成
let idCounter = 0;
export const generateId = (): string => `item_${Date.now()}_${idCounter++}`;

// ランダムなレアリティを生成（ドロップ率に基づく）
export const getRandomRarity = (isBoss = false): Rarity => {
  const multiplier = isBoss ? 4 : 1; // ボスは4倍のドロップ率
  const rand = Math.random();
  let cumulative = 0;

  const rarities = Object.entries(RARITY_CONFIG).sort(
    (a, b) => b[1].dropRate - a[1].dropRate
  );

  for (const [rarity, config] of rarities) {
    cumulative += config.dropRate * multiplier;
    if (rand <= cumulative) {
      return rarity as Rarity;
    }
  }

  return Rarity.Common;
};

// レアリティに基づいてステータスの基礎値を計算
const getStatMultiplier = (rarity: Rarity): number => {
  const multipliers: Record<Rarity, number> = {
    [Rarity.Common]: 1.0,
    [Rarity.LessCommon]: 1.2,
    [Rarity.Uncommon]: 1.5,
    [Rarity.Rare]: 2.0,
    [Rarity.VeryRare]: 2.8,
    [Rarity.Epic]: 4.0,
  };
  return multipliers[rarity] ?? 1.0;
};

// 武器名の生成
const WEAPON_PREFIXES = ['Ancient', 'Ethereal', 'Blazing', 'Frozen', 'Thunder', 'Shadow', 'Divine', 'Cursed'];
const WEAPON_SUFFIXES = ['of Power', 'of Destruction', 'of the Gods', 'of Eternity', 'of Chaos', 'of Light'];

const generateWeaponName = (type: WeaponType, rarity: Rarity): string => {
  const rarityIndex = Object.keys(Rarity).indexOf(rarity);
  if (rarityIndex >= 3) {
    // Rare以上は特殊な名前
    const prefix = WEAPON_PREFIXES[Math.floor(Math.random() * WEAPON_PREFIXES.length)] ?? 'Ancient';
    const suffix = WEAPON_SUFFIXES[Math.floor(Math.random() * WEAPON_SUFFIXES.length)] ?? 'of Power';
    return `${prefix} ${type} ${suffix}`;
  }
  return `${type}`;
};

// 武器を生成
export const generateWeapon = (rarity?: Rarity): Weapon => {
  const actualRarity = rarity ?? getRandomRarity();
  const type = Object.values(WeaponType)[Math.floor(Math.random() * Object.values(WeaponType).length)] ?? WeaponType.Sword;
  const multiplier = getStatMultiplier(actualRarity);

  // 武器タイプに応じた基礎ステータス
  const baseStats: Record<WeaponType, Stats> = {
    [WeaponType.Sword]: { attack: 25, defense: 5, speed: 15, criticalChance: 0.1, hp: 0 },
    [WeaponType.Staff]: { attack: 30, defense: 2, speed: 10, criticalChance: 0.15, hp: 0 },
    [WeaponType.Hammer]: { attack: 35, defense: 8, speed: 8, criticalChance: 0.05, hp: 0 },
    [WeaponType.Pistol]: { attack: 20, defense: 3, speed: 20, criticalChance: 0.2, hp: 0 },
    [WeaponType.Rifle]: { attack: 28, defense: 4, speed: 12, criticalChance: 0.12, hp: 0 },
    [WeaponType.Cannon]: { attack: 40, defense: 6, speed: 5, criticalChance: 0.08, hp: 0 },
  };

  const base = baseStats[type] ?? baseStats[WeaponType.Sword];

  return {
    id: generateId(),
    name: generateWeaponName(type, actualRarity),
    type,
    rarity: actualRarity,
    stats: {
      attack: Math.round(base.attack * multiplier),
      defense: Math.round(base.defense * multiplier),
      speed: Math.round(base.speed * multiplier),
      criticalChance: Math.min(0.5, base.criticalChance * multiplier),
      hp: base.hp,
    },
    runeSlots: RARITY_CONFIG[actualRarity]?.runeSlots ?? 1,
    equippedRunes: Array(RARITY_CONFIG[actualRarity]?.runeSlots ?? 1).fill(null),
  };
};

// 装備名の生成
const EQUIPMENT_PREFIXES = ['Reinforced', 'Mystic', 'Dragon', 'Phoenix', 'Titan', 'Celestial', 'Infernal', 'Sacred'];
const EQUIPMENT_SUFFIXES = ['of Protection', 'of Resilience', 'of the Ancients', 'of Valor', 'of Glory'];

const generateEquipmentName = (slot: EquipmentSlot, rarity: Rarity): string => {
  const rarityIndex = Object.keys(Rarity).indexOf(rarity);
  if (rarityIndex >= 3) {
    const prefix = EQUIPMENT_PREFIXES[Math.floor(Math.random() * EQUIPMENT_PREFIXES.length)] ?? 'Reinforced';
    const suffix = EQUIPMENT_SUFFIXES[Math.floor(Math.random() * EQUIPMENT_SUFFIXES.length)] ?? 'of Protection';
    return `${prefix} ${slot} ${suffix}`;
  }
  return `${slot}`;
};

// 装備を生成
export const generateEquipment = (slot?: EquipmentSlot, rarity?: Rarity): Equipment => {
  const actualRarity = rarity ?? getRandomRarity();
  const actualSlot = slot ?? Object.values(EquipmentSlot)[
    Math.floor(Math.random() * Object.values(EquipmentSlot).length)
  ] ?? EquipmentSlot.Helm;
  const multiplier = getStatMultiplier(actualRarity);

  // スロットに応じた基礎ステータス
  const baseStats: Record<EquipmentSlot, Stats> = {
    [EquipmentSlot.Helm]: { attack: 2, defense: 12, speed: 0, criticalChance: 0, hp: 15 },
    [EquipmentSlot.Torso]: { attack: 0, defense: 20, speed: -2, criticalChance: 0, hp: 30 },
    [EquipmentSlot.Shoulder]: { attack: 3, defense: 8, speed: 2, criticalChance: 0.02, hp: 10 },
    [EquipmentSlot.Gauntlet]: { attack: 5, defense: 6, speed: 3, criticalChance: 0.03, hp: 8 },
    [EquipmentSlot.Legging]: { attack: 0, defense: 15, speed: -1, criticalChance: 0, hp: 20 },
    [EquipmentSlot.Boots]: { attack: 1, defense: 5, speed: 8, criticalChance: 0.01, hp: 5 },
  };

  const base = baseStats[actualSlot] ?? baseStats[EquipmentSlot.Helm];

  return {
    id: generateId(),
    name: generateEquipmentName(actualSlot, actualRarity),
    slot: actualSlot,
    rarity: actualRarity,
    stats: {
      attack: Math.round(base.attack * multiplier),
      defense: Math.round(base.defense * multiplier),
      speed: Math.round(base.speed * multiplier),
      criticalChance: Math.min(0.3, base.criticalChance * multiplier),
      hp: Math.round(base.hp * multiplier),
    },
    runeSlots: RARITY_CONFIG[actualRarity]?.runeSlots ?? 1,
    equippedRunes: Array(RARITY_CONFIG[actualRarity]?.runeSlots ?? 1).fill(null),
  };
};

// ルーン名の生成
const RUNE_NAMES: Record<RuneType, string[]> = {
  [RuneType.Strength]: ['Might', 'Power', 'Force', 'Brutality'],
  [RuneType.Vitality]: ['Life', 'Endurance', 'Fortitude', 'Vigor'],
  [RuneType.Defense]: ['Protection', 'Shielding', 'Warding', 'Barrier'],
  [RuneType.CriticalChance]: ['Precision', 'Accuracy', 'Focus', 'Sharpness'],
  [RuneType.Speed]: ['Swiftness', 'Haste', 'Agility', 'Celerity'],
};

// ルーンを生成
export const generateRune = (rarity?: Rarity): Rune => {
  const actualRarity = rarity ?? getRandomRarity();
  const type = Object.values(RuneType)[Math.floor(Math.random() * Object.values(RuneType).length)] ?? RuneType.Strength;
  const multiplier = getStatMultiplier(actualRarity);

  const names = RUNE_NAMES[type] ?? ['Unknown'];
  const name = `Rune of ${names[Math.floor(Math.random() * names.length)] ?? 'Power'}`;

  const bonusMap: Record<RuneType, Partial<Stats>> = {
    [RuneType.Strength]: { attack: Math.round(10 * multiplier) },
    [RuneType.Vitality]: { hp: Math.round(20 * multiplier) },
    [RuneType.Defense]: { defense: Math.round(8 * multiplier) },
    [RuneType.CriticalChance]: { criticalChance: 0.05 * multiplier },
    [RuneType.Speed]: { speed: Math.round(5 * multiplier) },
  };

  return {
    id: generateId(),
    name,
    type,
    rarity: actualRarity,
    bonus: bonusMap[type] ?? {},
  };
};

// ランダムなアイテムをドロップ（武器か装備）
export const generateRandomDrop = (isBoss = false): Weapon | Equipment => {
  const rarity = getRandomRarity(isBoss);
  return Math.random() < 0.5 ? generateWeapon(rarity) : generateEquipment(undefined, rarity);
};
