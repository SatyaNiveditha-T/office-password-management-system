

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OTP.css";

export default function OTP() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (user?.isSuperAdmin) {
        navigate("/");
      }
    } catch (e) {
      // ignore
    }
  }, [navigate]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const verifyOTP = () => {
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    // TODO: Verify OTP with backend API
    navigate("/dashboard");
  };

  const resendOTP = () => {
    setTimer(60);
    setOtp(["", "", "", "", "", ""]);

    // TODO: Call backend API to resend OTP
    alert("OTP sent successfully.");
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2>OTP Verification</h2>

        <p>
          Enter the 6-digit OTP sent to your registered email and mobile
          number.
        </p>

        <div className="otp-boxes">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index + 1}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </div>

        <button className="verify-btn" onClick={verifyOTP}>
          Verify OTP
        </button>

        <div className="timer-section">
          {timer > 0 ? (
            <p>Resend OTP in <strong>{timer}</strong> seconds</p>
          ) : (
            <button className="resend-btn" onClick={resendOTP}>
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}