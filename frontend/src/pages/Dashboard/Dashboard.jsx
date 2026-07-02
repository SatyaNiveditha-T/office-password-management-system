import MainLayout from "../../layouts/MainLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import QuickActions from "../../components/QuickActions/QuickActions";
import RecentActivity from "../../components/RecentActivity/RecentActivity";

import {
  FaUsers,
  FaUserShield,
  FaCrown,
  FaLock,
  FaUserSlash
} from "react-icons/fa";

import "./Dashboard.css";

export default function Dashboard() {
  return (
    <MainLayout>

      <h2 className="page-title">
        Dashboard
      </h2>

      <div className="dashboard-grid">

        <DashboardCard
          title="Total Users"
          value="25"
          icon={<FaUsers />}
          color="#2563eb"
        />

        <DashboardCard
          title="Admin"
          value="5"
          icon={<FaUserShield />}
          color="#16a34a"
        />

        <DashboardCard
          title="Super Admin"
          value="1"
          icon={<FaCrown />}
          color="#7c3aed"
        />

        <DashboardCard
          title="MFA Enabled"
          value="20"
          icon={<FaLock />}
          color="#f59e0b"
        />

        <DashboardCard
          title="Inactive Accounts"
          value="2"
          icon={<FaUserSlash />}
          color="#dc2626"
        />

      </div>
<QuickActions />
<RecentActivity />
    </MainLayout>
  );
}