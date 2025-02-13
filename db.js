const admin = require("firebase-admin");
require("dotenv").config(); // Load environment variables

// 🔹 Ensure FIREBASE_SERVICE_ACCOUNT is set
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    console.error("❌ FIREBASE_SERVICE_ACCOUNT is missing in .env!");
    process.exit(1);
}

// ✅ Decode the Base64 string before parsing
const decodedServiceAccount = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf-8');

// ✅ Parse the JSON
let serviceAccount;
try {
    serviceAccount = JSON.parse(decodedServiceAccount);
} catch (error) {
    console.error("❌ Error parsing Firebase Service Account JSON:", error);
    process.exit(1);
}

// ✅ Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();
console.log("✅ Firestore initialized successfully!");
module.exports = db;
