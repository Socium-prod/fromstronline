import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
const url = 'http://127.0.0.1:5000'
const liveurl = 'https://online-store-backend-plct.onrender.com'


export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);


    
    const login = async (email, password) => {
        try {
            const res = await axios.post(`${liveurl}/login`, { email, password });
            localStorage.setItem("token", res.data.access_token);
            setUser({ firstname: res.data.firstname, lastname: res.data.lastname, id: res.data.id, email: res.data.email});
            navigate('/')
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const signup = async (email, password, firstname, lastname) =>{
        try {
            const res = await axios.post(`${liveurl}/register`, {email, password, firstname, lastname})
            await login(email, password)
        } catch (error) {
            console.error("Login error: ", error)
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signup}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
