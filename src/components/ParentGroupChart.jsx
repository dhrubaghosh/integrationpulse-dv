import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import data from "../data/mockdata.json";

export default function ParentGroupChart() {
  const [selectedGroup, setSelectedGroup] = useState("Integrator"); // Start with first group
  const [selectedInterface, setSelectedInterface] = useState(null);

  // Severity → color mapping
  const severityColors = {
    CRITICAL: "#f87171", // red-400
    HIGH: "#facc15", // yellow-400
    LOW: "#4ade80", // green-400
  };

  // Get unique parent groups for navigation
  const parentGroups = [...new Set(data.map((item) => item.parentGroup))];

  // Donut chart data for selected group
  const donutData = selectedGroup
    ? data
        .filter((item) => item.parentGroup === selectedGroup)
        .map((item) => ({
          name: item.keyName,
          y: item.matchCount,
          color: severityColors[item.severity] || "#94a3b8",
          custom: {
            reason: item.reason,
            severity: item.severity,
          },
        }))
    : [];

  // Shared chart styles
  const baseChart = {
    style: { fontFamily: "Montserrat, sans-serif" },
    backgroundColor: "transparent",
  };

  // Donut chart data - show single color when interface selected
  const chartData = selectedInterface
    ? [
        {
          name: selectedInterface.name,
          y: 100, // Full circle
          color: severityColors[selectedInterface.options.custom.severity],
        },
      ]
    : donutData;

  // Donut chart options
  const donutOptions = {
    chart: { type: "pie", ...baseChart },
    title: {
      text: selectedInterface ? selectedInterface.name : selectedGroup,
      align: "center",
      verticalAlign: "middle",
      style: {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "18px",
        fontWeight: "600",
        color: selectedInterface
          ? severityColors[selectedInterface.options.custom.severity]
          : "#111827",
      },
    },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        innerSize: "60%",
        colorByPoint: false,
        dataLabels: {
          enabled: !selectedInterface, // Hide labels when showing single color
          format: "{point.name}: {point.y}",
          distance: 20,
        },
        point: {
          events: {
            click: function () {
              if (!selectedInterface) {
                // Only allow clicks when not in single view
                setSelectedInterface(this);
              }
            },
          },
        },
      },
    },
    series: [
      {
        name: "Match Count",
        data: chartData,
        colors: chartData.map((item) => item.color),
      },
    ],
  };

  return (
    <div className="w-full h-[500px] bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl flex gap-6">
        {/* Chart */}
        <div className="flex-1">
          {/* Modern Toggle Slider for Group Selection */}
          <div className="mb-6 flex justify-center">
            <div className="relative bg-gray-100 p-1 rounded-full shadow-inner w-80">
              <div
                className="absolute top-1 bottom-1 bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out"
                style={{
                  width: "calc(50% - 4px)",
                  left:
                    selectedGroup === "Integrator" ? "4px" : "calc(50% + 0px)",
                }}
              />

              <div className="relative flex">
                <button
                  className={`flex-1 py-3 px-6 rounded-full text-sm font-semibold transition-all duration-300 relative z-10 ${
                    selectedGroup === "Integrator"
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => {
                    setSelectedGroup("Integrator");
                    setSelectedInterface(null);
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        selectedGroup === "Integrator"
                          ? "bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                    Integrator
                  </span>
                </button>

                <button
                  className={`flex-1 py-3 px-6 rounded-full text-sm font-semibold transition-all duration-300 relative z-10 ${
                    selectedGroup === "InterChange"
                      ? "text-purple-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => {
                    setSelectedGroup("InterChange");
                    setSelectedInterface(null);
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        selectedGroup === "InterChange"
                          ? "bg-purple-500"
                          : "bg-gray-400"
                      }`}
                    />
                    InterChange
                  </span>
                </button>
              </div>
            </div>
          </div>

          <HighchartsReact highcharts={Highcharts} options={donutOptions} />

          {selectedInterface && (
            <button
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 font-semibold text-xs mb-4"
              onClick={() => setSelectedInterface(null)}
            >
              ← Back
            </button>
          )}
        </div>

        {/* Stylish Details Panel */}
        {selectedInterface && (
          <div
            className="w-80 h-96 p-6 bg-gradient-to-br from-white to-gray-50 border-l-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 mt-12 -ml-48"
            style={{
              borderLeftColor:
                severityColors[selectedInterface.options.custom.severity],
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-4 h-4 rounded-full shadow-md"
                style={{
                  backgroundColor:
                    severityColors[selectedInterface.options.custom.severity],
                }}
              ></div>
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {selectedInterface.name}
              </h3>
            </div>

            {/* Severity Badge */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Severity Level
              </span>
              <div className="mt-1">
                <span
                  className="inline-flex px-3 py-1 rounded-full text-sm font-bold text-white shadow-md"
                  style={{
                    backgroundColor:
                      severityColors[selectedInterface.options.custom.severity],
                  }}
                >
                  {selectedInterface.options.custom.severity}
                </span>
              </div>
            </div>

            {/* Reason */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Issue Description
              </span>
              <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                {selectedInterface.options.custom.reason}
              </p>
            </div>

            {/* Match Count */}
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
              <span className="text-sm font-semibold text-gray-600">
                Match Count
              </span>
              <span className="text-xl font-bold text-gray-800">
                {selectedInterface.y}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
