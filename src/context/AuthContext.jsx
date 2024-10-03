// AuthContext.js
import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState({username: 'test', id:'66a094ab716349bea7248022', email: 'test@gmail.com', phoneNumber: '0987654321', birthDate: '2024/07/24'});
    const navigate = useNavigate();

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        navigate('/login');
    };

    const updateUser = async (updateUserData) => {
        try {
            const response = await axios.put(`http://localhost:3001/api/users/update/${user.id}`, updateUserData);
            if(response.status == 200){
                alert('已成功修改用戶資料!');
                setUser(prevUser => ({...prevUser, ...updateUserData}));
                navigate('/profile');
            }
        } catch (error) {
            console.log(`資料更新失敗:${error}`);
            alert(`資料更新失敗:${error}`);
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
