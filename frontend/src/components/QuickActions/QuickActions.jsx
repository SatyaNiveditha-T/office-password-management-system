import {
  FaUserPlus,
  FaKey,
  FaClipboardList,
  FaCog
} from "react-icons/fa";

import "./QuickActions.css";

export default function QuickActions() {
  const actions = [
    {
      title: "Add User",
      icon: <FaUserPlus />,
      color: "#2563eb",
    },
    {
      title: "Generate Password",
      icon: <FaKey />,
      color: "#16a34a",
    },
    {
      title: "Audit Log",
      icon: <FaClipboardList />,
      color: "#f59e0b",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      color: "#7c3aed",
    },
  ];

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>

      <div className="action-grid">
        {actions.map((item, index) => (
          <div className="action-card" key={index}>
            <div
              className="action-icon"
              style={{ background: item.color }}
            >
              {item.icon}
            </div>

            <h5>{item.title}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}