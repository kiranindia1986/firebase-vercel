const express = require("express");
const cors = require("cors");

require("dotenv").config(); // ✅ Load environment variables
const db = require("./db"); // ✅ Ensure Firestore is initialized

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import API routes
const unreadCountsRoutes = require("./api/unreadCounts");
app.use("/api/unreadCounts", unreadCountsRoutes); // ✅ Ensure correct route

// ✅ Default route to check API status
app.get("/", (req, res) => {
    res.send("✅ API is running...");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
