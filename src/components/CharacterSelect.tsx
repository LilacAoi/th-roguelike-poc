interface CharacterSelectProps {
  onStart: () => void;
}

export const CharacterSelect = ({ onStart }: CharacterSelectProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl w-full mx-4">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            TooHuman Roguelike
          </h1>
          <p className="text-xl text-gray-300">Freya's Quest</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-purple-500/30">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-6xl">
                ⚔️
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-2 text-purple-300">Freya</h2>
              <p className="text-lg text-gray-400 mb-4">
                Goddess of Love, Beauty, and Battle
              </p>

              <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                <h3 className="text-xl font-semibold mb-3 text-pink-300">
                  Champion Class - Pistol Master
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">⚡</span>
                    <span>Pistol Mastery - Enhanced pistol damage and accuracy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">💥</span>
                    <span>Critical Strike - 2x damage on critical hits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">🌟</span>
                    <span>Valiant's Might - Battle cry launches enemies airborne</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                <div className="bg-slate-900/50 rounded p-3 text-center">
                  <div className="text-2xl mb-1">💖</div>
                  <div className="text-gray-400">HP</div>
                  <div className="text-xl font-bold text-pink-400">100</div>
                </div>
                <div className="bg-slate-900/50 rounded p-3 text-center">
                  <div className="text-2xl mb-1">⚔️</div>
                  <div className="text-gray-400">Attack</div>
                  <div className="text-xl font-bold text-red-400">20</div>
                </div>
                <div className="bg-slate-900/50 rounded p-3 text-center">
                  <div className="text-2xl mb-1">🛡️</div>
                  <div className="text-gray-400">Defense</div>
                  <div className="text-xl font-bold text-blue-400">15</div>
                </div>
              </div>

              <button
                onClick={onStart}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Start Adventure
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>TooHuman-inspired roguelike • Stage 1 PoC</p>
          <p className="mt-2">Controls: Click on enemies to attack • Manage inventory to equip items</p>
        </div>
      </div>
    </div>
  );
};
