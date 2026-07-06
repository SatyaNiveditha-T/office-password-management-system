import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaShareAlt,
  FaPlus,
  FaLink,
  FaToggleOn,
  FaToggleOff,
  FaKey,
  FaCopy,
} from "react-icons/fa";

import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
const navigate = useNavigate();
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log("Fetching users...");

      const response = await api.get("/users");

      console.log(response.data);

      // Handle new response format { success, data, count }
      const usersData = response.data.data || response.data;
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    }
  };

  const [hasPasswordMap, setHasPasswordMap] = useState({});

  const checkPasswordStored = async (user) => {
    try {
      const res = await api.get(`/passwords/user/${user.UserID}/count`);
      const count = res.data.count ?? res.data || 0;
      setHasPasswordMap((m) => ({ ...m, [user.UserID]: count > 0 }));
      return count > 0;
    } catch (err) {
      console.error('Error checking passwords for user', user.UserID, err);
      setHasPasswordMap((m) => ({ ...m, [user.UserID]: false }));
      return false;
    }
  };

  const viewUser = (user) => {
    navigate(`/users/${user.UserID}`);
  };

  const editUser = (user) => {
    navigate(`/users/edit/${user.UserID}`);
  };

  const shareUser = async (user) => {
    const shareUrl = `${window.location.origin}/users/${user.UserID}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Share URL copied to clipboard');
    } catch (err) {
      alert('Could not copy URL. URL: ' + shareUrl);
    }
  };

  const openUserURL = async (user) => {
    try {
      const res = await api.get(`/passwords/user/${user.UserID}`);
      const list = res.data.data || res.data || [];
      if (list.length === 0) {
        alert('No stored passwords with URL for this user');
        return;
      }
      const firstWithUrl = list.find(p => p.URL);
      if (!firstWithUrl) {
        alert('No password entry with URL available');
        return;
      }
      window.open(firstWithUrl.URL, '_blank');
    } catch (err) {
      console.error('Error fetching passwords', err);
      alert('Failed to open URL');
    }
  };

  const toggleStatus = async (user) => {
    try {
      const newStatus = user.Status === 'Active' ? 'Inactive' : 'Active';
      await api.put(`/users/${user.UserID}/status`, { status: newStatus });
      alert('User status updated');
      fetchUsers();
    } catch (err) {
      console.error('Error toggling status', err);
      alert('Failed to update status');
    }
  };

  const changePassword = async (user) => {
    const newPass = prompt('Enter new password for ' + user.FullName + ':');
    if (!newPass) return;
    try {
      await api.post(`/users/${user.UserID}/change-password`, { password: newPass });
      alert('Password changed successfully');
    } catch (err) {
      console.error('Error changing password', err);
      alert('Failed to change password');
    }
  };

  const filteredUsers = users.filter((user) =>
    user.FullName.toLowerCase().includes(search.toLowerCase()) ||
    user.Email.toLowerCase().includes(search.toLowerCase()) ||
    user.Phone.includes(search)
  );

  return (
    <MainLayout>
      <div className="users-header">
        <h2>Users List</h2>

        <button
  className="add-user-btn"
  onClick={() => navigate("/users/add")}
>
  <FaPlus /> Add User
</button>
      </div>

      <div className="search-bar">
        <FaSearch />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.UserID}>
                  <td>{user.UserID}</td>

                  <td>{user.FullName}</td>

                  <td>{user.Email}</td>

                  <td>{user.Phone}</td>

                  <td>{user.Department}</td>

                  <td>{user.RoleID === 1 ? "Admin" : "User"}</td>

                  <td>
                    <span className={user.Status.toLowerCase()}>
                      {user.Status}
                    </span>
                  </td>

                  <td>
                    <button className="view" onClick={() => viewUser(user)} title="View">
                      <FaEye />
                    </button>

                    <button className="edit" onClick={() => editUser(user)} title="Edit">
                      <FaEdit />
                    </button>

                    <button className="share" onClick={() => shareUser(user)} title="Copy share URL">
                      <FaShareAlt />
                    </button>

                    <button className="link" onClick={() => openUserURL(user)} title="Open URL">
                      <FaLink />
                    </button>

                    <button className="status-toggle" onClick={() => toggleStatus(user)} title="Toggle Active/Inactive">
                      {user.Status === 'Active' ? <FaToggleOn /> : <FaToggleOff />}
                    </button>

                    <button className="password-indicator" onClick={() => changePassword(user)} title="Change Password">
                      <FaKey /> {hasPasswordMap[user.UserID] ? '' : <FaCopy />}
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}