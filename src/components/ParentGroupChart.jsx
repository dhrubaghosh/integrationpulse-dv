import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import data from "../data/mockdata.json";

export default function ParentGroupChart() {
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Aggregate counts by parentGroup
  const groupCounts = data.reduce((acc, item) => {
    acc[item.parentGroup] = (acc[item.parentGroup] || 0) + 1;
    return acc;
  }, {});

  // Pie chart data
  const pieData = Object.entries(groupCounts).map(([name, count]) => ({
    name,
    y: count,
  }));

  // Donut chart data (if a group is selected)
  const donutData = selectedGroup
    ? data
        .filter((item) => item.parentGroup === selectedGroup)
        .map((item) => ({
          name: item.keyName,
          y: item.matchCount,
        }))
    : [];

  // Shared chart styles
  const baseChart = {
    style: { fontFamily: "Montserrat, sans-serif" },
    backgroundColor: "transparent",
  };

  // Pie chart options
  const pieOptions = {
    chart: {
      type: "pie",
      ...baseChart,
    },
    title: {
      text: "Group Distribution",
      style: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "600",
      },
    },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
          distance: 20, // keep labels outside
          style: { fontFamily: "Montserrat, sans-serif" },
        },
        events: {
          click: (e) => setSelectedGroup(e.point.name),
        },
      },
    },
    series: [
      {
        name: "Interfaces",
        colorByPoint: true,
        data: pieData,
      },
    ],
  };

  // Donut chart options
  const donutOptions = {
    chart: {
      type: "pie",
      ...baseChart,
    },
    title: {
      text: selectedGroup,
      align: "center",
      verticalAlign: "middle",
      style: {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "18px",
        fontWeight: "600",
      },
    },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        innerSize: "60%",
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.y}",
          distance: 20, // push labels outside donut
          style: { fontFamily: "Montserrat, sans-serif" },
        },
      },
    },
    series: [
      {
        name: "Match Count",
        data: donutData,
      },
    ],
  };

  return (
    <div className="w-full h-[500px] bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <HighchartsReact
          highcharts={Highcharts}
          options={selectedGroup ? donutOptions : pieOptions}
        />
      </div>

      {selectedGroup && (
        <button
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setSelectedGroup(null)}
        >
          ← Back to All Groups
        </button>
      )}
    </div>
  );
}
