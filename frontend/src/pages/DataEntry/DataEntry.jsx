import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import "./DataEntry.css";

export default function DataEntry() {

  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
    role: "User",
    status: "Active"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    alert("User Added Successfully");
  };

  return (
    <MainLayout>

      <div className="data-entry">

        <h2>Add New User</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div>
              <label>Employee ID</label>

              <input
                type="text"
                name="employeeId"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Mobile</label>

              <input
                type="text"
                name="mobile"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Department</label>

              <input
                type="text"
                name="department"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Designation</label>

              <input
                type="text"
                name="designation"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Role</label>

              <select
                name="role"
                onChange={handleChange}
              >
                <option>User</option>
                <option>Admin</option>
                <option>Super Admin</option>
              </select>
            </div>

            <div>
              <label>Status</label>

              <select
                name="status"
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

          </div>

          <button className="save-btn">
            Save User
          </button>

        </form>

      </div>

    </MainLayout>
  );
}