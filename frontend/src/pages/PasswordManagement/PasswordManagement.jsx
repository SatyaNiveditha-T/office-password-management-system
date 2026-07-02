import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  FaCopy,
  FaEye,
  FaEyeSlash,
  FaSync,
  FaShareAlt,
  FaEnvelope
} from "react-icons/fa";

import "./PasswordManagement.css";

export default function PasswordManagement() {

  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("Ab@12345xyz");

  const generatePassword = () => {

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";

    let pass = "";

    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setPassword(pass);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied successfully.");
  };

  return (
    <MainLayout>

      <div className="password-page">

        <h2>Password Management</h2>

        <div className="password-card">

          <div className="form-group">
            <label>User</label>

            <select>
              <option>Satya Niveditha</option>
              <option>Ravi Kumar</option>
              <option>Anitha</option>
            </select>
          </div>

          <div className="form-group">
            <label>Office URL</label>

            <input
              type="text"
              value="https://portal.office.com"
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly
              />

              <button
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>
          </div>

          <div className="button-group">

            <button onClick={generatePassword}>
              <FaSync /> Generate
            </button>

            <button onClick={copyPassword}>
              <FaCopy /> Copy
            </button>

            <button>
              <FaEnvelope /> Email
            </button>

            <button>
              <FaShareAlt /> Share URL
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}