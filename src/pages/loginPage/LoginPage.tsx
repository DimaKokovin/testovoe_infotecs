
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useLogin} from "./useLogin.tsx";
import s from "./LoginPage.module.css"


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
        <div className={s.loginPage}>
            <div className={s.loginCard}>
                <h1 className={s.loginTitle}>Авторизация</h1>

                <form onSubmit={handleSubmit} className={s.loginForm}>
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

                    <div className="login-actions">
                        <button type="submit" disabled={loginMutation.isPending}>
                            {loginMutation.isPending ? "Загрузка..." : "Войти"}
                        </button>
                    </div>
                </form>

                {loginMutation.isError && (
                    <div className="login-error">
                        {(loginMutation.error as Error).message}
                    </div>
                )}
            </div>
        </div>
    );

};



