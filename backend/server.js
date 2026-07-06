require("dotenv").config({ path: __dirname + "/.env" });

console.log("📝 Environment variables loaded");
console.log("DB_SERVER:", process.env.DB_SERVER);
console.log("DB_NAME:", process.env.DB_NAME);

const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 5000;

console.log("🔧 App imported, starting server...");

async function startServer() {
    try {
        console.log("⏳ Connecting to database...");
        await connectDB();
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err.message);
        process.exit(1);
    }
}

console.log("🚀 Calling startServer()");
startServer();