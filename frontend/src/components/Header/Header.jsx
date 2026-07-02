import { useState } from "react";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaChevronDown,
  FaUser,
  FaKey,
  FaSignOutAlt
} from "react-icons/fa";

import "./Header.css";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="header">

      <div className="search-box">
        <FaSearch />
        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="header-right">

        <div className="date">
          {today}
        </div>

        <div className="notification">
          <FaBell />
          <span>3</span>
        </div>

        <div
          className="profile-menu"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FaUserCircle className="profile-icon" />

          <div className="user-info">
            <h5>Super Admin</h5>
            <small>superadmin@company.com</small>
          </div>

          <FaChevronDown />

          {showMenu && (
            <div className="dropdown">

              <div className="dropdown-item">
                <FaUser />
                My Profile
              </div>

              <div className="dropdown-item">
                <FaKey />
                Change Password
              </div>

              <div className="dropdown-item logout">
                <FaSignOutAlt />
                Logout
              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}