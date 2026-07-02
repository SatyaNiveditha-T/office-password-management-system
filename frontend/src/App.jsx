import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import OTP from "./pages/OTP/OTP";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import UserDetails from "./pages/UserDetails/UserDetails";
import DataEntry from "./pages/DataEntry/DataEntry";
import PasswordManagement from "./pages/PasswordManagement/PasswordManagement";
import Settings from "./pages/Settings/Settings";
import AuditLog from "./pages/AuditLog/AuditLog";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/users" element={<Users />} />
<Route path="/user-details" element={<UserDetails />} />
<Route path="/data-entry" element={<DataEntry />} />
<Route path="/password-management" element={<PasswordManagement />} />
<Route path="/settings" element={<Settings />} />
<Route path="/audit-log" element={<AuditLog />} />
    </Routes>
  );
}

export default App;