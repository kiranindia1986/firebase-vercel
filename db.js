const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    console.error("❌ FIREBASE_SERVICE_ACCOUNT is missing in .env file");
    process.exit(1);
}

const decodedServiceAccount = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf-8");

const serviceAccount = JSON.parse(decodedServiceAccount);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
