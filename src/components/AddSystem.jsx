import { useState } from "react";

export default function AddSystem({ onAdd }) {
  const [formData, setFormData] = useState({
    keyName: "",
    severity: "NONE", // default no alert
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.keyName) return;

    const newSystem = {
      id: Date.now().toString(), // unique id
      keyName: formData.keyName,
      matchFound: false,
      alertedAt: null,
      matchCount: 0,
      reason: "",
      severity: formData.severity,
      status: "Open",
    };

    onAdd(newSystem);
    setFormData({ keyName: "", severity: "NONE" });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New System/Interface</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">System Name</label>
          <input
            type="text"
            value={formData.keyName}
            onChange={(e) =>
              setFormData({ ...formData, keyName: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="e.g. i018 (OBD)"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Severity</label>
          <select
            value={formData.severity}
            onChange={(e) =>
              setFormData({ ...formData, severity: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="CRITICAL">Critical</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add System
        </button>
      </form>
    </div>
  );
}
