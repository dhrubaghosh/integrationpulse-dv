// src/constants/systems.js
const SYSTEMS = [
  // Critical group
  { id: "sys-001", keyName: "i018 (OBD)", severityGroup: "CRITICAL" },
  { id: "sys-002", keyName: "i055", severityGroup: "CRITICAL" },
  { id: "sys-003", keyName: "i056", severityGroup: "CRITICAL" },
  { id: "sys-004", keyName: "i057", severityGroup: "CRITICAL" },
  { id: "sys-005", keyName: "i058", severityGroup: "CRITICAL" },

  // Medium group
  { id: "sys-006", keyName: "i101", severityGroup: "MEDIUM" },
  { id: "sys-007", keyName: "i102", severityGroup: "MEDIUM" },
  { id: "sys-008", keyName: "i103", severityGroup: "MEDIUM" },
  { id: "sys-009", keyName: "i104", severityGroup: "MEDIUM" },
  { id: "sys-010", keyName: "i105", severityGroup: "MEDIUM" },

  // Low group
  { id: "sys-012", keyName: "sys-201", severityGroup: "LOW" },
  { id: "sys-013", keyName: "sys-202", severityGroup: "LOW" },
  { id: "sys-014", keyName: "sys-203", severityGroup: "LOW" },
  { id: "sys-015", keyName: "sys-204", severityGroup: "LOW" },
  { id: "sys-016", keyName: "sys-205", severityGroup: "LOW" },

];

export default SYSTEMS;
