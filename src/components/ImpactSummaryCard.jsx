import data from "../data/mockdata.json";

export default function ImpactSummaryCard() {
  const totalSystems = 20; // fixed total systems/interfaces
  const impacted = data.length; // from mockdat.json
  const percentage = Math.round((impacted / totalSystems) * 100);

  return (
    <div className="bg-yellow-200 rounded-2xl p-6 w-96 shadow-md text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold tracking-wide">TOTAL IMPACT SUMMARY</h2>
        <button className="bg-yellow-300 p-2 rounded-full shadow" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ⬆
        </button>
      </div>

      <div className="flex items-end mb-2">
        <span className="text-4xl font-bold">{impacted}</span>
        <span className="ml-2 text-sm text-gray-700">
          Out of {totalSystems} systems
        </span>
      </div>

      <div className="mb-4 text-xs font-medium text-gray-600">
        {percentage}% impacted
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-red-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Avatars or placeholders */}
      <div className="flex -space-x-2">
        {data.slice(0, 9).map((item) => (
          <div
            key={item.id}
            className="w-8 h-8 rounded-full bg-red-300 flex items-center justify-center text-xs font-bold text-red-900 border-2 border-yellow-200"
          >
            {item.keyName.split(" ")[1]} {/* e.g. “01” from Interface 01 */}
          </div>
        ))}
      </div>
    </div>
  );
}
