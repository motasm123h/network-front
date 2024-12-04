import React, { useState } from 'react';
import { login, user } from '../Pages/api';
import { GoogleLogin } from '@react-oauth/google';
import { requestFCMToken } from "../Firebase";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            alert('Login successful');
        } catch (error) {
            // alert('Login failed');
        }
    };




    //----

    const handleLoginGoogle = (response) => {
        fetch('http://localhost:8000/api/auth/callback/google', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${response.access_token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('Logged in:', data);
                // Handle login success
            })
            .catch(error => {
                console.error('Login failed:', error);
                // Handle login failure
            });
    };
    const fetchFCMToken = async () => {
        try {
            const token = await requestFCMToken();
            if (token) {
                console.log(token);
            } else {
                console.log("No token received");
            }
        } catch (error) {
            console.error("Error fetching FCM token:", error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            {/* <h1 onClick={() => { user()}}>Login</h1> */}


            <div>
                <h1 onClick={() => { fetchFCMToken() }}>Login</h1>

                <h1>Login with Google</h1>
                <GoogleLogin
                    onSuccess={handleLoginGoogle}
                    onFailure={(error) => console.error('Google Login Error:', error)}
                />
            </div>
        </form>
    );
};

export default Login;
