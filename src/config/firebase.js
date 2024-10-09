const admin = require('firebase-admin');
const serviceAccount = require('./path-to-your-serviceAccountKey.json'); // JSON key bạn tải từ Firebase console

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'your-firebase-project-id.appspot.com' // Thay bằng Firebase Storage URL của bạn
});

const bucket = admin.storage().bucket();

module.exports = bucket;
