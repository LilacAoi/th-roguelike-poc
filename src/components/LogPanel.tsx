import { LogMessage } from '../types';

interface LogPanelProps {
  logs: LogMessage[];
}

export const LogPanel = ({ logs }: LogPanelProps) => {
  const getLogColor = (type: LogMessage['type']) => {
    switch (type) {
      case 'damage':
        return 'text-red-400';
      case 'critical':
        return 'text-orange-400 font-bold';
      case 'drop':
        return 'text-green-400';
      case 'boss':
        return 'text-purple-400 font-bold';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-purple-500/30">
      <h3 className="text-lg font-semibold mb-3 text-purple-300">📜 Battle Log</h3>
      <div className="bg-slate-900/50 rounded-lg p-3 h-64 overflow-y-auto">
        {logs.length === 0 ? (
          <div className="text-sm text-gray-500 italic text-center py-4">
            No battle logs yet...
          </div>
        ) : (
          <div className="space-y-1">
            {logs.map((log) => (
              <div key={log.id} className={`text-sm ${getLogColor(log.type)}`}>
                {log.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
