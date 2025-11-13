interface GameOverProps {
  onRestart: () => void;
}

export const GameOver = ({ onRestart }: GameOverProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl border-2 border-red-500/50">
        <div className="text-center">
          <div className="text-6xl mb-4">💀</div>
          <h2 className="text-4xl font-bold mb-4 text-red-400">Defeated</h2>
          <p className="text-gray-300 mb-6">
            Freya has fallen in battle. The journey ends here, but legends never die.
          </p>
          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Try Again
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
