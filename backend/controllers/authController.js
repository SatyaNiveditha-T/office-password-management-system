const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");
const { sql } = require("../config/db");

exports.login = async (req, res) => {

    console.log("Login API Called");
    console.log(req.body);

    try {

        const { email, password } = req.body;

        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const result = await sql.query`
            SELECT u.UserID, u.FullName, u.Email, u.RoleID, u.PasswordHash, u.MFAEnabled, u.Status, r.RoleName
            FROM Users u
            LEFT JOIN Roles r ON u.RoleID = r.RoleID
            WHERE u.Email=${email}
        `;

        if (result.recordset.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        const user = result.recordset[0];

        // Check if user is active
        if (user.Status !== 'Active') {
            return res.status(403).json({
                success: false,
                message: "User account is not active"
            });
        }

        const valid = await bcrypt.compare(
            password,
            user.PasswordHash
        );

        if (!valid) {

            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });

        }

        const token = generateToken(user);

        const isSuperAdmin = (user.RoleName || '').toLowerCase() === 'super admin' || (user.Email || '').toLowerCase() === (process.env.SUPER_ADMIN_EMAIL || '').toLowerCase();

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                UserID: user.UserID,
                FullName: user.FullName,
                Email: user.Email,
                RoleID: user.RoleID,
                RoleName: user.RoleName,
                MFAEnabled: user.MFAEnabled,
                isSuperAdmin
            }

        });

    }

    catch (err) {

        console.error("Login Error:", err);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message
        });

    }

};