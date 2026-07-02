import MainLayout from "../../layouts/MainLayout";
import {
  FaSearch,
  FaDownload,
  FaFileExcel,
  FaFilePdf
} from "react-icons/fa";

import "./AuditLog.css";

export default function AuditLog() {

  const logs = [
    {
      id: 1,
      user: "Satya Niveditha",
      action: "User Login",
      module: "Login",
      ip: "192.168.1.20",
      date: "02-07-2026",
      time: "10:20 AM",
      status: "Success"
    },
    {
      id: 2,
      user: "Ravi Kumar",
      action: "Generated Password",
      module: "Password Management",
      ip: "192.168.1.35",
      date: "02-07-2026",
      time: "10:35 AM",
      status: "Success"
    },
    {
      id: 3,
      user: "Anitha",
      action: "OTP Verification",
      module: "OTP",
      ip: "192.168.1.42",
      date: "02-07-2026",
      time: "11:10 AM",
      status: "Failed"
    }
  ];

  return (
    <MainLayout>

      <div className="audit-container">

        <div className="audit-header">

          <h2>Audit Log</h2>

          <div className="export-buttons">

            <button>
              <FaFileExcel />
              Export Excel
            </button>

            <button>
              <FaFilePdf />
              Export PDF
            </button>

          </div>

        </div>

        <div className="search-box-audit">

          <FaSearch />

          <input
            type="text"
            placeholder="Search audit logs..."
          />

        </div>

        <table>

          <thead>

            <tr>

              <th>ID</th>
              <th>User</th>
              <th>Action</th>
              <th>Module</th>
              <th>IP Address</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {logs.map((log) => (

              <tr key={log.id}>

                <td>{log.id}</td>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{log.module}</td>
                <td>{log.ip}</td>
                <td>{log.date}</td>
                <td>{log.time}</td>

                <td>

                  <span
                    className={
                      log.status === "Success"
                        ? "success"
                        : "failed"
                    }
                  >
                    {log.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}