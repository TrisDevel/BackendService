const admin = require('firebase-admin');
const serviceAccount = require('../firebase/koi-farm-shop-fc559-firebase-adminsdk-zo9yk-bd9f7cd6df.json'); // JSON key bạn tải từ Firebase console

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'koi-farm-shop-fc559.appspot.com' 
});

const bucket = admin.storage().bucket();

module.exports = bucket;
