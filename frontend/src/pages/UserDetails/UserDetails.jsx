import MainLayout from "../../layouts/MainLayout";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaUserTie,
  FaCalendarAlt,
  FaCheckCircle,
  FaEdit,
  FaTrash,
  FaKey,
  FaShareAlt
} from "react-icons/fa";

import "./UserDetails.css";

export default function UserDetails() {

  const user = {
    employeeId: "EMP001",
    name: "Satya Niveditha",
    email: "satya@company.com",
    phone: "9876543210",
    department: "IT",
    designation: "Software Engineer",
    role: "Super Admin",
    status: "Active",
    created: "02 July 2026",
    passwordExpiry: "02 October 2026"
  };

  return (
    <MainLayout>

      <div className="details-card">

        <div className="details-header">

          <div className="profile-section">

            <div className="avatar">
              <FaUser />
            </div>

            <div>
              <h2>{user.name}</h2>
              <p>{user.role}</p>
            </div>

          </div>

          <div className="action-buttons">

            <button className="edit-btn">
              <FaEdit /> Edit
            </button>

            <button className="password-btn">
              <FaKey /> Password
            </button>

            <button className="share-btn">
              <FaShareAlt /> Share
            </button>

            <button className="delete-btn">
              <FaTrash /> Delete
            </button>

          </div>

        </div>

        <div className="details-grid">

          <div className="info-box">
            <FaUser />
            <div>
              <h5>Employee ID</h5>
              <p>{user.employeeId}</p>
            </div>
          </div>

          <div className="info-box">
            <FaEnvelope />
            <div>
              <h5>Email</h5>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="info-box">
            <FaPhone />
            <div>
              <h5>Mobile</h5>
              <p>{user.phone}</p>
            </div>
          </div>

          <div className="info-box">
            <FaBuilding />
            <div>
              <h5>Department</h5>
              <p>{user.department}</p>
            </div>
          </div>

          <div className="info-box">
            <FaUserTie />
            <div>
              <h5>Designation</h5>
              <p>{user.designation}</p>
            </div>
          </div>

          <div className="info-box">
            <FaCalendarAlt />
            <div>
              <h5>Password Expiry</h5>
              <p>{user.passwordExpiry}</p>
            </div>
          </div>

          <div className="info-box">
            <FaCheckCircle />
            <div>
              <h5>Status</h5>
              <p>{user.status}</p>
            </div>
          </div>

        </div>

      </div>

    </MainLayout>
  );
}