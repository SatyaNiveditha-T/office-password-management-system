import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUserShield,
  FaUserPlus,
  FaKey,
  FaCog,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">

      <div className="logo">
        <h2>SITHAFAL</h2>
        <span>Office Password Management</span>
      </div>

      <ul>

  <li onClick={() => navigate("/dashboard")}>
    <FaHome />
    Dashboard
  </li>

  <li onClick={() => navigate("/users")}>
    <FaUsers />
    Users List
  </li>

  <li onClick={() => navigate("/user-details")}>
    <FaUserShield />
    Detail View
  </li>

  <li onClick={() => navigate("/data-entry")}>
    <FaUserPlus />
    Data Entry
  </li>

  <li onClick={() => navigate("/password-management")}>
    <FaKey />
    Password Management
  </li>

  <li onClick={() => navigate("/settings")}>
    <FaCog />
    Settings
  </li>

  <li onClick={() => navigate("/audit-log")}>
    <FaClipboardList />
    Audit Log
  </li>

</ul>

      <div className="bottom-menu">

        <div className="profile">

          <FaUserCircle />

          <div>

            <h5>Super Admin</h5>

            <small>Administrator</small>

          </div>

        </div>

        <button>

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>
  );
}