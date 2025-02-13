const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db"); // Import Firestore instance
const unreadCountsRoutes = require("./api/unreadCounts"); // Import route

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root Route Test
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// ✅ Mount API Routes
app.use("/api/unreadCounts", unreadCountsRoutes); // Ensure this line is correct

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
