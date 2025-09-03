import data from "../data/mockdata.json";

export default function SeverityBreakdownCard() {
  // count per severity
  const counts = data.reduce(
    (acc, item) => {
      acc[item.severity] = (acc[item.severity] || 0) + 1;
      return acc;
    },
    { CRITICAL: 0, HIGH: 0, LOW: 0 }
  );

  const total = counts.CRITICAL + counts.HIGH + counts.LOW;

  return (
    <div className="bg-slate-400 rounded-2xl p-6 w-96 shadow-md text-gray-800 border border-gray-200">
      <h2 className="text-sm font-semibold tracking-wide mb-4">
        SEVERITY BREAKDOWN
      </h2>

      {/* Severity rows */}
      <div className="space-y-3">
        {/* Critical */}
        <SeverityRow
          label="Critical"
          value={counts.CRITICAL}
          total={total}
          color="bg-red-200 text-red-800"
          bar="bg-red-400"
        />

        {/* High */}
        <SeverityRow
          label="High"
          value={counts.HIGH}
          total={total}
          color="bg-amber-200 text-amber-800"
          bar="bg-amber-400"
        />

        {/* Low */}
        <SeverityRow
          label="Low"
          value={counts.LOW}
          total={total}
          color="bg-green-200 text-green-800"
          bar="bg-green-400"
        />
      </div>
    </div>
  );
}

function SeverityRow({ label, value, total, color, bar }) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-sm font-medium mb-1">
        <span className={`px-2 py-1 rounded ${color}`}>{label}</span>
        <span>{value} ({percentage}%)</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${bar}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
