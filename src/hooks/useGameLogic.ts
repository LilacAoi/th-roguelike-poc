import { useState, useCallback } from 'react';
import {
  GameData,
  GameState,
  Player,
  Enemy,
  Boss,
  EquipmentSlot,
  Weapon,
  Equipment,
  Rune,
  LogMessage,
} from '../types';
import { generateWeapon, generateRandomDrop } from '../utils/itemGenerator';
import { generateEnemyWave, generateBoss } from '../utils/enemyGenerator';
import {
  calculateTotalStats,
  playerAttackEnemy,
  enemyAttackPlayer,
  checkBossPhaseChange,
  createLogMessage,
} from '../utils/combatUtils';

const MAP_WIDTH = 20;
const MAP_HEIGHT = 15;
const INITIAL_ENEMY_COUNT = 8;

// 初期プレイヤーを生成
const createInitialPlayer = (): Player => {
  const startingWeapon = generateWeapon();
  return {
    name: 'Freya',
    class: 'Champion - Pistol Master',
    hp: 100,
    maxHp: 100,
    baseStats: {
      attack: 20,
      defense: 15,
      speed: 18,
      criticalChance: 0.15,
      hp: 100,
    },
    weapon: startingWeapon,
    equipment: {
      [EquipmentSlot.Helm]: null,
      [EquipmentSlot.Torso]: null,
      [EquipmentSlot.Shoulder]: null,
      [EquipmentSlot.Gauntlet]: null,
      [EquipmentSlot.Legging]: null,
      [EquipmentSlot.Boots]: null,
    },
    inventory: [],
    runes: [],
    position: { x: 1, y: 1 },
  };
};

export const useGameLogic = () => {
  const [gameData, setGameData] = useState<GameData>({
    state: GameState.CharacterSelect,
    player: createInitialPlayer(),
    enemies: [],
    boss: null,
    logs: [],
    turn: 0,
  });

  // ログを追加
  const addLog = useCallback((log: LogMessage) => {
    setGameData((prev) => ({
      ...prev,
      logs: [log, ...prev.logs].slice(0, 50), // 最新50件のみ保持
    }));
  }, []);

  // ゲーム開始
  const startGame = useCallback(() => {
    const player = createInitialPlayer();
    const enemies = generateEnemyWave(MAP_WIDTH, MAP_HEIGHT, INITIAL_ENEMY_COUNT);

    setGameData({
      state: GameState.Playing,
      player,
      enemies,
      boss: null,
      logs: [createLogMessage('🎮 Game Started! Freya enters the battlefield.', 'info')],
      turn: 0,
    });
  }, []);

  // 敵を攻撃
  const attackEnemy = useCallback(
    (enemyId: string) => {
      setGameData((prev) => {
        const playerStats = calculateTotalStats(prev.player);
        const enemy = prev.enemies.find((e) => e.id === enemyId);

        if (!enemy || !enemy.isAlive) return prev;

        const { updatedEnemy, log } = playerAttackEnemy(prev.player, enemy, playerStats);
        addLog(log);

        let updatedEnemies = prev.enemies.map((e) =>
          e.id === enemyId ? (updatedEnemy as Enemy) : e
        );

        const newLogs = [log];

        // 敵が倒された場合、ドロップを生成
        if (!updatedEnemy.isAlive) {
          const dropLog = createLogMessage(`💀 ${enemy.name} has been defeated!`, 'info');
          newLogs.push(dropLog);

          // エリートメフィットは高確率でドロップ
          const dropChance = enemy.type === 'Elite Mephit' ? 0.8 : 0.5;
          if (Math.random() < dropChance) {
            const drop = generateRandomDrop(false);
            const dropMsg = createLogMessage(
              `✨ ${drop.name} (${drop.rarity}) dropped!`,
              'drop'
            );
            newLogs.push(dropMsg);

            // インベントリに追加
            prev.player.inventory.push(drop);
          }

          // Death Burst効果（メフィット系）
          if (enemy.abilities.includes('Death Burst')) {
            const burstDamage = 5;
            const burstLog = createLogMessage(
              `💥 Death Burst! ${prev.player.name} takes ${burstDamage} damage.`,
              'damage'
            );
            newLogs.push(burstLog);
            prev.player.hp = Math.max(0, prev.player.hp - burstDamage);
          }

          updatedEnemies = updatedEnemies.filter((e) => e.isAlive);

          // 全ての敵を倒したらボス戦へ
          if (updatedEnemies.length === 0 && !prev.boss) {
            const boss = generateBoss({ x: MAP_WIDTH / 2, y: MAP_HEIGHT / 2 });
            const bossLog = createLogMessage(
              `🔥 BOSS APPEARS: ${boss.name}!`,
              'boss'
            );
            newLogs.push(bossLog);

            return {
              ...prev,
              state: GameState.BossFight,
              enemies: updatedEnemies,
              boss,
              logs: [...newLogs, ...prev.logs].slice(0, 50),
              turn: prev.turn + 1,
            };
          }
        }

        // 敵のターン
        const enemyTurnLogs: LogMessage[] = [];
        updatedEnemies.forEach((e) => {
          if (e.isAlive) {
            const { damage, log: enemyLog } = enemyAttackPlayer(e, prev.player, playerStats);
            enemyTurnLogs.push(enemyLog);
            prev.player.hp = Math.max(0, prev.player.hp - damage);
          }
        });

        // プレイヤーが死亡したかチェック
        if (prev.player.hp <= 0) {
          const gameOverLog = createLogMessage('💀 You have been defeated...', 'info');
          return {
            ...prev,
            state: GameState.GameOver,
            enemies: updatedEnemies,
            logs: [gameOverLog, ...enemyTurnLogs, ...newLogs, ...prev.logs].slice(0, 50),
          };
        }

        return {
          ...prev,
          enemies: updatedEnemies,
          logs: [...enemyTurnLogs, ...newLogs, ...prev.logs].slice(0, 50),
          turn: prev.turn + 1,
        };
      });
    },
    [addLog]
  );

  // ボスを攻撃
  const attackBoss = useCallback(() => {
    setGameData((prev) => {
      if (!prev.boss || !prev.boss.isAlive) return prev;

      const playerStats = calculateTotalStats(prev.player);
      const { updatedEnemy: updatedBoss, log } = playerAttackEnemy(
        prev.player,
        prev.boss,
        playerStats
      );
      const newLogs = [log];

      let boss = checkBossPhaseChange(updatedBoss as Boss);

      // フェーズ変更の確認
      if (boss.phase === 2 && prev.boss.phase === 1) {
        const phaseLog = createLogMessage(
          `⚡ ${boss.name} enters Phase 2! Enhanced abilities activated!`,
          'boss'
        );
        newLogs.push(phaseLog);
      }

      // ボスが倒された場合
      if (!boss.isAlive) {
        const victoryLog = createLogMessage(
          `🎉 VICTORY! ${boss.name} has been defeated!`,
          'boss'
        );
        newLogs.push(victoryLog);

        // ボスのドロップ（3-5個）
        const dropCount = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < dropCount; i++) {
          const drop = generateRandomDrop(true);
          const dropMsg = createLogMessage(
            `✨ BOSS DROP: ${drop.name} (${drop.rarity})!`,
            'drop'
          );
          newLogs.push(dropMsg);
          prev.player.inventory.push(drop);
        }

        return {
          ...prev,
          state: GameState.Victory,
          boss,
          logs: [...newLogs, ...prev.logs].slice(0, 50),
        };
      }

      // ボスのターン
      const { damage, log: bossLog } = enemyAttackPlayer(boss, prev.player, playerStats);
      newLogs.push(bossLog);
      prev.player.hp = Math.max(0, prev.player.hp - damage);

      // フェーズ2の特殊攻撃
      if (boss.phase === 2 && Math.random() < 0.3) {
        const specialAttack = Math.random() < 0.5 ? 'Charge Attack' : 'Beam Blast';
        const specialDamage = Math.round(damage * 1.5);
        const specialLog = createLogMessage(
          `⚡ ${boss.name} uses ${specialAttack}! ${prev.player.name} takes ${specialDamage} additional damage!`,
          'damage'
        );
        newLogs.push(specialLog);
        prev.player.hp = Math.max(0, prev.player.hp - specialDamage);
      }

      // プレイヤーが死亡したかチェック
      if (prev.player.hp <= 0) {
        const gameOverLog = createLogMessage('💀 You have been defeated...', 'info');
        return {
          ...prev,
          state: GameState.GameOver,
          boss,
          logs: [gameOverLog, ...newLogs, ...prev.logs].slice(0, 50),
        };
      }

      return {
        ...prev,
        boss,
        logs: [...newLogs, ...prev.logs].slice(0, 50),
        turn: prev.turn + 1,
      };
    });
  }, []);

  // 装備を変更
  const equipItem = useCallback((item: Weapon | Equipment) => {
    setGameData((prev) => {
      const player = { ...prev.player };

      if ('type' in item) {
        // 武器の場合
        if (player.weapon) {
          player.inventory.push(player.weapon);
        }
        player.weapon = item;
        player.inventory = player.inventory.filter((i) => i.id !== item.id);
      } else {
        // 装備の場合
        const currentEquipment = player.equipment[item.slot];
        if (currentEquipment) {
          player.inventory.push(currentEquipment);
        }
        player.equipment[item.slot] = item;
        player.inventory = player.inventory.filter((i) => i.id !== item.id);
      }

      // HPの最大値が変わった場合、現在HPを調整
      const newTotalStats = calculateTotalStats(player);
      const newMaxHp = player.baseStats.hp + newTotalStats.hp;
      player.maxHp = newMaxHp;
      player.hp = Math.min(player.hp, newMaxHp);

      addLog(createLogMessage(`✓ Equipped ${item.name}`, 'info'));

      return {
        ...prev,
        player,
      };
    });
  }, [addLog]);

  // ルーンを装備
  const equipRune = useCallback((rune: Rune, targetItem: Weapon | Equipment, slotIndex: number) => {
    setGameData((prev) => {
      const player = { ...prev.player };

      if ('type' in targetItem) {
        // 武器の場合
        if (player.weapon?.id === targetItem.id) {
          player.weapon.equippedRunes[slotIndex] = rune;
          player.runes = player.runes.filter((r) => r.id !== rune.id);
        }
      } else {
        // 装備の場合
        const equipment = player.equipment[targetItem.slot];
        if (equipment?.id === targetItem.id) {
          equipment.equippedRunes[slotIndex] = rune;
          player.runes = player.runes.filter((r) => r.id !== rune.id);
        }
      }

      addLog(createLogMessage(`✓ ${rune.name} equipped to ${targetItem.name}`, 'info'));

      return {
        ...prev,
        player,
      };
    });
  }, [addLog]);

  // ゲームをリセット
  const resetGame = useCallback(() => {
    setGameData({
      state: GameState.CharacterSelect,
      player: createInitialPlayer(),
      enemies: [],
      boss: null,
      logs: [],
      turn: 0,
    });
  }, []);

  return {
    gameData,
    startGame,
    attackEnemy,
    attackBoss,
    equipItem,
    equipRune,
    resetGame,
  };
};
