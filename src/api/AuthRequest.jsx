import axiosClient from "../axios-client";

export const logIn = (formData) => axiosClient.post('login', formData);
export const signUp = (formData) => axiosClient.post('register', formData);

export const FCM = (formData) => axiosClient.post('saveFCT', formData);
