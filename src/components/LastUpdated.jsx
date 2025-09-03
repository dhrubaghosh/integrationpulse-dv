import data from "../data/mockdata.json";

export default function LastUpdated() {
  // find the latest alert from mock data
  const latest = data.reduce((a, b) =>
    new Date(a.alertedAt) > new Date(b.alertedAt) ? a : b
  );

  const date = new Date(latest.alertedAt).toLocaleString();

  return (
    <div className="absolute top-6 right-6 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow-md text-sm font-medium">
      <span className="font-semibold">Last Updated: </span>
      {date}
    </div>
  );
}
