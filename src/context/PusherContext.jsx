import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "../axios-client";

import { requestFCMToken, onMessageListener } from './../Firebase';
// import { FCM } from '../api/AuthRequest'
import { FCM } from './../api/AuthRequest';

export const PusherContext = createContext();


export const PusherProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [FCT, setToken] = useState(null);
    const [notification, setNotification] = useState(null);



    const { data } = useSelector((state) => state?.authReducer?.authData || {});
    const token = data?.token;
    useEffect(() => {
        setAuthToken(token);
    }, [token]);
    const fetchFCMToken = async () => {
        try {
            const FCMtoken = await requestFCMToken();
            if (token) {
                // console.log(FCMtoken);
                const payload = { FCT: FCMtoken }
                dispatch(FCM(payload));
            } else {
                console.log("No token received");
            }
        } catch (error) {
            console.error("Error fetching FCM token:", error);
        }
    };
    useEffect(() => {
        fetchFCMToken();
    }, [])
    useEffect(() => {
        console.log("listen");
        onMessageListener()
            .then((payload) => {
                console.log("Foreground message received:", payload);
                setNotification(payload.notification);
            })
            .catch((err) => console.log("Failed to receive foreground message:", err));
    }, [notification]);
    return (
        <PusherContext.Provider value={""}>
            {children}
        </PusherContext.Provider>
    );
};