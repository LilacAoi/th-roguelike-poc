# TooHuman Roguelike - Freya's Quest

A TooHuman-inspired roguelike game built with React, TypeScript, and Vite. Play as Freya, the Norse goddess of love, beauty, and battle, as she fights through waves of mechanized enemies and faces the fearsome boss Garm.

## 🎮 Game Overview

**TooHuman Roguelike** is a browser-based roguelike game featuring:
- **Action-packed combat** against AI drones inspired by fantasy creatures
- **Hack-and-slash loot system** with 6 tiers of rarity
- **Dynamic boss battles** with multiple phases
- **Strategic equipment management** with weapons, armor, and runes

### Story

Set in a cyberpunk Norse mythology world, Freya embarks on a quest to defeat mechanized monsters that threaten the realms. Stage 1 culminates in an epic battle against Garm, the mechanized hound guarding the gates.

## ✨ Features

### Main Character
- **Freya** - Champion Class: Pistol Master
  - Starting HP: 100
  - Balanced stats (Attack: 20, Defense: 15, Speed: 18)
  - Special abilities: Critical Strike (2x damage), Valiant's Might

### Enemy Types
1. **Mephit** - Small flying drones with Death Burst ability
2. **Missile Mephit** - Artillery drones with area-of-effect attacks
3. **Golem** - Heavy frost-element units with high defense
4. **Elite Mephit** - Enhanced versions with better drop rates

### Boss: Garm
- **Phase 1**: Swift attacks and claw barrages
- **Phase 2** (< 50% HP): Enhanced abilities including Drone Summon, Charge Attack, and Beam Blast

### Loot System

#### Weapon Types
- **Melee**: Swords, Staves, Hammers
- **Ranged**: Pistols, Rifles, Cannons

#### Equipment Slots
- Helm, Torso, Shoulder, Gauntlet, Legging, Boots

#### Rarity Tiers
- 🔘 **Common** (Gray) - 50% drop rate
- 🟢 **Less Common** (Green) - 30% drop rate
- 🔵 **Uncommon** (Blue) - 15% drop rate
- 🟣 **Rare** (Purple) - 4% drop rate
- 🟠 **Very Rare** (Orange) - 0.9% drop rate
- 🔴 **Epic** (Red) - 0.1% drop rate

Boss drops have 4x the normal drop rate!

#### Rune System
Enhance your equipment with runes that provide stat bonuses:
- Strength, Vitality, Defense, Critical Chance, Speed
- Higher rarity equipment has more rune slots

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/LilacAoi/th-roguelike-poc.git
cd th-roguelike-poc

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The project uses:
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **ESLint** for code quality

## 🎯 How to Play

1. **Start Game**: Click "Start Adventure" on the character select screen
2. **Combat**: Click on enemies to attack them
3. **Inventory**: Manage your equipment and weapons in the right panel
4. **Boss Fight**: Defeat all enemies to face Garm in an epic boss battle
5. **Victory**: Collect legendary loot and complete Stage 1!

### Tips
- Equip higher rarity items for better stats
- Watch enemy abilities in combat
- Manage your HP carefully - healing is limited!
- Elite Mephits drop better loot
- Boss Phase 2 is significantly harder - prepare accordingly

## 🏗️ Project Structure

```
th-roguelike-poc/
├── src/
│   ├── components/       # UI components
│   │   ├── CharacterSelect.tsx
│   │   ├── GameMap.tsx
│   │   ├── HPBar.tsx
│   │   ├── Inventory.tsx
│   │   ├── LogPanel.tsx
│   │   ├── GameOver.tsx
│   │   └── Victory.tsx
│   ├── hooks/            # React hooks
│   │   └── useGameLogic.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   ├── itemGenerator.ts
│   │   ├── enemyGenerator.ts
│   │   └── combatUtils.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html
├── package.json
├── tsconfig.json         # TypeScript config (strict mode)
├── vite.config.ts        # Vite config
├── tailwind.config.js    # Tailwind CSS config
└── README.md
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript (Strict Mode)
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **Linting**: ESLint 9
- **Type Checking**: TypeScript 5.6

## 🎨 Design Philosophy

This game is inspired by TooHuman but is a completely original work:
- **Roguelike mechanics** with permanent death and random loot
- **Hack-and-slash gameplay** with satisfying combat
- **Deep itemization** similar to Diablo-style ARPGs
- **Norse mythology** aesthetic with cyberpunk elements

## 📝 Future Improvements (Beyond PoC)

- Additional stages (2-4)
- Cybernetic modification system
- Route choices (Human vs Cybernetic path)
- More weapons and equipment varieties
- Advanced rune evolution mechanics
- Better enemy AI and pathfinding
- Sound effects and music
- Save system

## 🤝 Contributing

This is a proof-of-concept project. Feedback and suggestions are welcome!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by TooHuman by Silicon Knights
- Norse mythology as the thematic foundation
- Roguelike and ARPG genres for gameplay inspiration

## 🐛 Known Issues

- Mobile responsiveness could be improved
- No sound effects yet
- Limited enemy variety in Stage 1
- No save/load functionality

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Stage 1 PoC Complete** ✓

Enjoy your adventure as Freya! ⚔️
