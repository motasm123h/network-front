// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyA6UpjerjBrK-4-AjpauOfKd8yF448cVFM",
    authDomain: "fir-notification-51afa.firebaseapp.com",
    projectId: "fir-notification-51afa",
    storageBucket: "fir-notification-51afa.firebasestorage.app",
    messagingSenderId: "824372752286",
    appId: "1:824372752286:web:c809c5d2e4efb7d6bfb08f",
    measurementId: "G-ZGJ1NFLH7K"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// export const requestFCMToken = async () => {
//     try {
//         const token = await getToken(messaging, { vapidKey: "BB4qGxYyv59CWnlIhcBnfiUwysc94Que2fDLs_Mf8U-CXgMHsbnKhEvjafeu-FSyPje59EAnHc_I0eeVFjenCjU" });
//         if (token) {
//             console.log("FCM Token:", token);
//             return token;
//         } else {
//             console.log("No FCM token available. Request permission to generate one.");
//         }
//     } catch (error) {
//         console.error("An error occurred while retrieving FCM token:", error);
//     }
// };

export const requestFCMToken = async () => {
    try {
        const token = await getToken(messaging, { vapidKey: "BB4qGxYyv59CWnlIhcBnfiUwysc94Que2fDLs_Mf8U-CXgMHsbnKhEvjafeu-FSyPje59EAnHc_I0eeVFjenCjU" });
        if (token) {
            console.log("FCM Token:", token);
            return token;
        } else {
            console.warn("No FCM token available.");
        }
    } catch (error) {
        console.error("Error retrieving FCM token:", error);
        if (error.code === "messaging/permission-blocked") {
            console.error("Notification permission is blocked. Please unblock it.");
        } else if (error.code === "messaging/permission-default") {
            console.error("Notification permission is default. Request permission.");
        }
    }
};
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });


