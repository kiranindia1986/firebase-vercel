const express = require("express");
const admin = require("firebase-admin");
require("dotenv").config();

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

app.get("/", (req, res) => {
    res.send("Server is running...");
});

// API Route to get data from Firestore
app.get("/api/data", async (req, res) => {
    try {
        const snapshot = await db.collection("testCollection").get();
        let data = [];
        snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
