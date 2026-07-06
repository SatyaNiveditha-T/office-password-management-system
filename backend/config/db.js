const sql = require("mssql");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: (() => {
        const p = parseInt(process.env.DB_PORT, 10);
        return Number.isFinite(p) && p > 0 ? p : 1433;
    })(),
    database: process.env.DB_NAME,

    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log("✅ SQL Server Connected Successfully");
    } catch (err) {
        console.error("❌ SQL Connection Error:", err);
    }
};

module.exports = {
    sql,
    connectDB
};