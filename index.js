require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Firebase
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// Test API Route
app.get("/", (req, res) => {
    res.send("🔥 Firebase Node.js API is running!");
});

// Sample API to fetch users from Firestore
app.get("/users", async (req, res) => {
    try {
        const snapshot = await db.collection("users").get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server Locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
