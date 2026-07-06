require("dotenv").config();

const sql = require("mssql");

console.log("🔍 Testing Database Connection...");
console.log("Server:", process.env.DB_SERVER);
console.log("Database:", process.env.DB_NAME);
console.log("User:", process.env.DB_USER);

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT || "1433", 10),
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

sql.connect(config)
    .then(() => {
        console.log("✅ SQL Server Connected Successfully");
        console.log("Connection established to:", config.server, "database:", config.database);
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ SQL Connection Error:", err.message);
        console.error("Make sure:");
        console.error("1. SQL Server is running");
        console.error("2. Database exists:", config.database);
        console.error("3. Credentials are correct");
        console.error("4. Server name is correct:", config.server);
        process.exit(1);
    });
