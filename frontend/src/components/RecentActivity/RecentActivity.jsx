import "./RecentActivity.css";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: "Satya",
      role: "Super Admin",
      action: "Logged In",
      time: "10:15 AM",
    },
    {
      id: 2,
      user: "Ravi",
      role: "Admin",
      action: "Generated Password",
      time: "10:30 AM",
    },
    {
      id: 3,
      user: "Anitha",
      role: "User",
      action: "Changed Password",
      time: "11:00 AM",
    },
    {
      id: 4,
      user: "Kiran",
      role: "User",
      action: "OTP Verified",
      time: "11:20 AM",
    },
  ];

  return (
    <div className="recent-activity">
      <h3>Recent Activity</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Role</th>
            <th>Action</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {activities.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>{item.role}</td>
              <td>{item.action}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}