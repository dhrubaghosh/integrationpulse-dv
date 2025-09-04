import data from "../data/mockdata.json"; // adjust path if needed

const severityColors = {
  LOW: "bg-green-700 ",
  HIGH: "bg-amber-400 ",
  CRITICAL: "bg-red-400",
};

export default function InterfaceMatrix() {
  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      {data.map((item) => (
        <FlipCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function FlipCard({ item }) {
  const canFlip = ["LOW", "HIGH", "CRITICAL"].includes(item.severity);

  return (
    <div className="group w-96 h-28 [perspective:1000px] ml-12">
      
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] rounded-2xl shadow-xl cursor-pointer
        ${canFlip ? "group-hover:[transform:rotateY(180deg)]" : ""}`}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 flex items-center justify-center text-white text-lg font-bold rounded-2xl shadow-xl [backface-visibility:hidden]
          ${severityColors[item.severity] || "bg-gray-400"}`}
        >
          {item.keyName}
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-4 text-white text-xs font-semibold rounded-2xl shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden]
          ${severityColors[item.severity] || "bg-gray-400"}`}
        >
          {item.reason}
        </div>
      </div>
    </div>
  );
}
