import MainLayout from "../../layouts/MainLayout";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaShareAlt,
  FaPlus
} from "react-icons/fa";

import "./Users.css";

export default function Users() {

  const users = [
    {
      id: 1,
      name: "Satya Niveditha",
      email: "satya@company.com",
      mobile: "9876543210",
      role: "Super Admin",
      status: "Active"
    },
    {
      id: 2,
      name: "Ravi Kumar",
      email: "ravi@company.com",
      mobile: "9876543211",
      role: "Admin",
      status: "Active"
    },
    {
      id: 3,
      name: "Anitha",
      email: "anitha@company.com",
      mobile: "9876543212",
      role: "User",
      status: "Inactive"
    }
  ];

  return (
    <MainLayout>

      <div className="users-header">

        <h2>Users List</h2>

        <button className="add-user-btn">
          <FaPlus /> Add User
        </button>

      </div>

      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search users..."
        />
      </div>

      <div className="users-table">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id}>

                <td>{user.id}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.mobile}</td>

                <td>{user.role}</td>

                <td>
                  <span
                    className={
                      user.status === "Active"
                        ? "active"
                        : "inactive"
                    }
                  >
                    {user.status}
                  </span>
                </td>

                <td>

                  <button className="view">
                    <FaEye />
                  </button>

                  <button className="edit">
                    <FaEdit />
                  </button>

                  <button className="share">
                    <FaShareAlt />
                  </button>

                  <button className="delete">
                    <FaTrash />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}