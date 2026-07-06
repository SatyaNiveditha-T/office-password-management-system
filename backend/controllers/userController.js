const { sql } = require("../config/db");
const bcrypt = require("bcrypt");

// Get Users
exports.getUsers = async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT UserID, FullName, Email, Phone, Department,
             RoleID, MFAEnabled, Status, CreatedAt
      FROM Users
      ORDER BY UserID DESC
    `);

    res.json({
      success: true,
      data: result.recordset,
      count: result.recordset.length
    });
  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching users",
      error: err.message 
    });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const result = await sql.query`
      SELECT UserID, FullName, Email, Phone, Department,
             RoleID, MFAEnabled, Status, CreatedAt
      FROM Users
      WHERE UserID=${parseInt(userId)}
    `;

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: result.recordset[0]
    });
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching user",
      error: err.message 
    });
  }
};

// Add User
exports.addUser = async (req, res) => {
  try {
    const {
      FullName,
      Email,
      Phone,
      Department,
      RoleID
    } = req.body;

    // Validate required fields
    if (!FullName || !Email || !RoleID) {
      return res.status(400).json({
        success: false,
        message: "FullName, Email, and RoleID are required"
      });
    }

    // Check if email already exists
    const existingUser = await sql.query`
      SELECT UserID FROM Users WHERE Email=${Email}
    `;

    if (existingUser.recordset.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    const password = "Welcome@123";
    const hash = await bcrypt.hash(password, 10);

    await sql.query`
      INSERT INTO Users
      (
        FullName,
        Email,
        Phone,
        Department,
        RoleID,
        PasswordHash,
        MFAEnabled,
        Status
      )
      VALUES
      (
        ${FullName},
        ${Email},
        ${Phone},
        ${Department},
        ${RoleID},
        ${hash},
        0,
        'Active'
      )
    `;

    res.status(201).json({
      success: true,
      message: "User Added Successfully"
    });

  } catch (err) {
    console.error("Add User Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error adding user",
      error: err.message 
    });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { FullName, Phone, Department, Status } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    await sql.query`
      UPDATE Users
      SET 
        FullName = ${FullName},
        Phone = ${Phone},
        Department = ${Department},
        Status = ${Status},
        UpdatedAt = GETDATE()
      WHERE UserID = ${parseInt(userId)}
    `;

    res.json({
      success: true,
      message: "User updated successfully"
    });
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error updating user",
      error: err.message 
    });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    await sql.query`
      DELETE FROM Users WHERE UserID = ${parseInt(userId)}
    `;

    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error deleting user",
      error: err.message 
    });
  }
};

// Update status (Active/Inactive)
exports.updateStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: 'User ID required' });
    if (!status) return res.status(400).json({ success: false, message: 'Status required' });

    await sql.query`
      UPDATE Users SET Status = ${status}, UpdatedAt = GETDATE() WHERE UserID = ${parseInt(userId)}
    `;

    res.json({ success: true, message: 'Status updated' });
  } catch (err) {
    console.error('Update Status Error:', err);
    res.status(500).json({ success: false, message: 'Error updating status', error: err.message });
  }
};

// Change password (admin action)
exports.changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: 'User ID required' });
    if (!password) return res.status(400).json({ success: false, message: 'Password required' });

    const hash = await bcrypt.hash(password, 10);

    await sql.query`
      UPDATE Users SET PasswordHash = ${hash}, UpdatedAt = GETDATE() WHERE UserID = ${parseInt(userId)}
    `;

    res.json({ success: true, message: 'Password changed' });
  } catch (err) {
    console.error('Change Password Error:', err);
    res.status(500).json({ success: false, message: 'Error changing password', error: err.message });
  }
};