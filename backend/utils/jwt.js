const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.UserID,
            email: user.Email,
            role: user.RoleID,
            roleName: user.RoleName || null,
            isSuperAdmin: !!((user.RoleName || '').toLowerCase() === 'super admin' || (process.env.SUPER_ADMIN_EMAIL && (user.Email || '').toLowerCase() === process.env.SUPER_ADMIN_EMAIL.toLowerCase()))
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
};

module.exports = generateToken;