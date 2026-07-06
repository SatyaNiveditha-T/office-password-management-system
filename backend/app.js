const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/passwords", passwordRoutes);

// Debug: list registered routes
app.get('/__routes', (req, res) => {
	try {
		const routes = [];
		app._router.stack.forEach(mw => {
			if (mw.route) {
				const methods = Object.keys(mw.route.methods).join(',');
				routes.push({ path: mw.route.path, methods });
			} else if (mw.name === 'router' && mw.handle && mw.handle.stack) {
				mw.handle.stack.forEach(r => {
					if (r.route) routes.push({ path: r.route.path, methods: Object.keys(r.route.methods).join(',') });
				});
			}
		});
		res.json({ success: true, routes });
	} catch (e) {
		res.status(500).json({ success: false, error: e.message });
	}
});

module.exports = app;