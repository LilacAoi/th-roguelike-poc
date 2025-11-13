interface HPBarProps {
  current: number;
  max: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'red' | 'purple';
}

export const HPBar = ({
  current,
  max,
  showLabel = false,
  size = 'md',
  color = 'green',
}: HPBarProps) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const colors = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
  };

  const bgColors = {
    green: 'bg-green-900/30',
    red: 'bg-red-900/30',
    purple: 'bg-purple-900/30',
  };

  return (
    <div>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">HP</span>
          <span className="font-semibold text-gray-200">
            {Math.round(current)} / {max}
          </span>
        </div>
      )}
      <div className={`w-full ${bgColors[color]} rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${colors[color]} ${heights[size]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
