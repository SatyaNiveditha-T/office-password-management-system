require("dotenv").config({ path: __dirname + "/../.env" });

const bcrypt = require("bcrypt");
const { sql, connectDB } = require("../config/db");

async function createSuperAdmin() {
    await connectDB();

    const email = process.env.SUPER_ADMIN_EMAIL || 'super@office.com';
    const password = process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin@123';
    const fullName = process.env.SUPER_ADMIN_NAME || 'Super Administrator';

    // Ensure Roles table has 'Super Admin' role
    const roleRes = await sql.query`
        SELECT RoleID FROM Roles WHERE RoleName = 'Super Admin'
    `;

    let roleId;

    if (roleRes.recordset.length === 0) {
        const insertRole = await sql.query`
            INSERT INTO Roles (RoleName, Description) OUTPUT INSERTED.RoleID VALUES ('Super Admin', 'Super administrator with full access')
        `;
        roleId = insertRole.recordset[0].RoleID;
        console.log('✅ Created Super Admin role with RoleID', roleId);
    } else {
        roleId = roleRes.recordset[0].RoleID;
    }

    // Check if user exists
    const userRes = await sql.query`
        SELECT UserID FROM Users WHERE Email = ${email}
    `;

    if (userRes.recordset.length > 0) {
        console.log('ℹ️ Super Admin user already exists:', email);
        process.exit(0);
    }

    const hash = await bcrypt.hash(password, 10);

    await sql.query`
        INSERT INTO Users (FullName, Email, Phone, Department, RoleID, PasswordHash, MFAEnabled, Status)
        VALUES (${fullName}, ${email}, '', 'IT', ${roleId}, ${hash}, 0, 'Active')
    `;

    console.log('✅ Super Admin user created:', email);
    process.exit(0);

}

createSuperAdmin().catch(err => {
    console.error('Error creating Super Admin:', err);
    process.exit(1);
});
