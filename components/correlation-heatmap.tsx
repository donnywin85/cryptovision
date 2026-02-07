"use client";

const ASSETS = ["BTC", "ETH", "SOL", "ADA", "LINK"];

const CORRELATIONS: number[][] = [
  [1.0, 0.85, 0.72, 0.58, 0.65],
  [0.85, 1.0, 0.78, 0.62, 0.71],
  [0.72, 0.78, 1.0, 0.55, 0.68],
  [0.58, 0.62, 0.55, 1.0, 0.45],
  [0.65, 0.71, 0.68, 0.45, 1.0],
];

function getCorrelationColor(value: number): string {
  if (value >= 0.8) return "bg-indigo-500/80";
  if (value >= 0.7) return "bg-indigo-500/60";
  if (value >= 0.6) return "bg-indigo-500/40";
  if (value >= 0.5) return "bg-indigo-500/25";
  return "bg-indigo-500/15";
}

function getTextColor(value: number): string {
  if (value >= 0.7) return "text-white";
  return "text-zinc-300";
}

interface CorrelationHeatmapProps {
  assets?: string[];
  correlations?: number[][];
}

export function CorrelationHeatmap({
  assets = ASSETS,
  correlations = CORRELATIONS,
}: CorrelationHeatmapProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 text-left text-xs font-medium text-zinc-500" />
            {assets.map((asset) => (
              <th
                key={asset}
                className="p-2 text-center text-xs font-medium text-zinc-400"
              >
                {asset}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {assets.map((rowAsset, rowIndex) => (
            <tr key={rowAsset}>
              <td className="p-2 text-xs font-medium text-zinc-400">
                {rowAsset}
              </td>
              {assets.map((colAsset, colIndex) => {
                const value = correlations[rowIndex][colIndex];
                return (
                  <td key={colAsset} className="p-1">
                    <div
                      className={`flex h-12 w-full items-center justify-center rounded-md text-xs font-medium ${getCorrelationColor(value)} ${getTextColor(value)}`}
                    >
                      {value.toFixed(2)}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-500">
        <span>Low</span>
        <div className="flex gap-1">
          <div className="h-3 w-6 rounded bg-indigo-500/15" />
          <div className="h-3 w-6 rounded bg-indigo-500/25" />
          <div className="h-3 w-6 rounded bg-indigo-500/40" />
          <div className="h-3 w-6 rounded bg-indigo-500/60" />
          <div className="h-3 w-6 rounded bg-indigo-500/80" />
        </div>
        <span>High</span>
      </div>
    </div>
  );
}
