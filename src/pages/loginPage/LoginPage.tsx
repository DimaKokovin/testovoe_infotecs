
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useLogin} from "./useLogin.tsx";


export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginMutation = useLogin();


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/users");
        }
    }, [navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate(
            { username, password },
            {
                onSuccess: (token) => {
                    localStorage.setItem("token", token);
                    navigate("/users");
                },
                onError: (error: any) => {
                    alert(error.message);
                },
            }
        );
    };

    return (
        <div>
            <h1>Авторизация</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? "Загрузка..." : "Войти"}
                </button>
            </form>
            {loginMutation.isError && (
                <div style={{ color: "red" }}>
                    {(loginMutation.error as Error).message}
                </div>
            )}
        </div>
    );
};



