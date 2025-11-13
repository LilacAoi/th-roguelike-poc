interface VictoryProps {
  onRestart: () => void;
}

export const Victory = ({ onRestart }: VictoryProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl border-2 border-purple-500/50">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Victory!
          </h2>
          <p className="text-gray-300 mb-2">
            Freya has triumphed over Garm and completed Stage 1!
          </p>
          <p className="text-sm text-gray-400 mb-6">
            The mechanized hound has been defeated. The path forward is clear.
          </p>

          <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2 text-purple-300">
              🏆 Stage Complete
            </h3>
            <div className="text-sm text-gray-400 space-y-1">
              <p>✓ All enemies defeated</p>
              <p>✓ Boss Garm vanquished</p>
              <p>✓ Legendary loot acquired</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Play Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Return to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
