const express = require("express");
const admin = require("firebase-admin");

const app = express();

// Initialize Firestore
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
    });
}
const db = admin.firestore();

app.get("/api/data", async (req, res) => {
    try {
        const snapshot = await db.collection("your-collection-name").get();

        if (snapshot.empty) {
            return res.json({ message: "No data found in Firestore" });
        }

        let data = [];
        snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });

        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;
