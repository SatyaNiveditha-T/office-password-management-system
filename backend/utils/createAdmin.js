
require("dotenv").config({ path: __dirname + "/../.env" });

const bcrypt = require("bcrypt");
const { sql, connectDB } = require("../config/db");

async function createAdmin() {

    await connectDB();

    const password = "Admin@123";

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
            'Administrator',
            'admin@office.com',
            '9876543210',
            'IT',
            1,
            ${hash},
            1,
            'Active'
        )
    `;

    console.log("✅ Admin Created Successfully");

    process.exit();

}

createAdmin();