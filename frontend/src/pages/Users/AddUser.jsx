import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import api from "../../api/axios";
import "./Users.css";

export default function AddUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    Department: "",
    RoleID: 2,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", form);

      alert("User Added Successfully");

      navigate("/users");
    } catch (err) {
      console.error(err);
      alert("Failed to Add User");
    }
  };

  return (
    <MainLayout>
      <div className="form-container">
        <h2>Add User</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="FullName"
            placeholder="Full Name"
            value={form.FullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={form.Email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="Phone"
            placeholder="Phone"
            value={form.Phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="Department"
            placeholder="Department"
            value={form.Department}
            onChange={handleChange}
            required
          />

          <select
            name="RoleID"
            value={form.RoleID}
            onChange={handleChange}
          >
            <option value={1}>Admin</option>
            <option value={2}>User</option>
          </select>

          <button className="add-user-btn" type="submit">
            Save User
          </button>
        </form>
      </div>
    </MainLayout>
  );
}