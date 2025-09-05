import { useState, useEffect } from "react";
import SYSTEMS from "../constants/systems";
import mockdata from "../data/mockdata.json";

// Severity → color mapping
const severityColors = {
  CRITICAL: "bg-red-500",
  MEDIUM: "bg-amber-400",
  LOW: "bg-lime-400",
};

// Default healthy green
const healthyColor = "bg-green-500";

export default function SystemHealth() {
  const [systems, setSystems] = useState([]);

  useEffect(() => {
    // Merge constant list with JSON alerts
    const merged = SYSTEMS.map((sys) => {
      const match = mockdata.find((m) => m.keyName === sys.keyName);
      if (match) {
        return {
          ...sys,
          ...match, // severity, reason, matchCount, alertedAt
          matchFound: true,
        };
      }
      return {
        ...sys,
        severity: sys.severityGroup,
        alertedAt: null,
        matchCount: 0,
        reason: "",
        matchFound: false,
      };
    });

    setSystems(merged);
  }, []);

  // FlipCard component
  const FlipCard = ({ sys, color }) => {
    const isHealthy = !sys.matchFound;

    return (
      <div
        className={`relative w-full h-28 [perspective:1000px] ${
          isHealthy ? "" : "group"
        }`}
      >
        {/* Inner container */}
        <div
          className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] rounded-lg shadow-md text-white ${
            isHealthy ? "" : "group-hover:[transform:rotateY(180deg)]"
          }`}
        >
          {/* Front */}
          <div
            className={`absolute inset-0 flex items-center justify-center font-semibold text-center rounded-lg shadow-md [backface-visibility:hidden] ${color}`}
          >
            {sys.keyName}
          </div>

          {/* Back (only for unhealthy) */}
          {!isHealthy && (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center text-xs p-2 rounded-lg shadow-md [transform:rotateY(180deg)] [backface-visibility:hidden] ${color}`}
            >
              <p className="mt-1">{sys.reason}</p>
              <p className="mt-1">Matching Found: {sys.matchCount}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGroup = (severity, label) => (
    <div className="mb-8">
      <h3 className="font-bold text-sm mb-3">{label} SEVERITY:</h3>
      <div className="grid grid-cols-5 gap-4">
        {systems
          .filter((s) => s.severityGroup === severity)
          .map((sys) => {
            const color = sys.matchFound
              ? severityColors[sys.severity] // RAG from log
              : healthyColor; // green if no log match

            return <FlipCard key={sys.id} sys={sys} color={color} />;
          })}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Systems/Interfaces Health:</h2>
      {renderGroup("CRITICAL", "CRITICAL")}
      {renderGroup("MEDIUM", "MEDIUM")}
      {renderGroup("LOW", "LOW")}
    </div>
  );
}
