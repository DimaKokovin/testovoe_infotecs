import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import s from "./Users.module.css";
import { useState } from "react";
import { UserModal } from "../../features/userModal/UserModal.tsx";
import type {  IUser } from "../../features/userModal/UserModal.tsx";

export const Users = () => {
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    const { data: users, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await axios.get(
                "https://696e4c6ed7bacd2dd71660e1.mockapi.io/users"
            );
            return response.data;
        },
    });

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleCreateUser = () => {
        setSelectedUser(null);
        setModalOpen(true);
    };

    const handleEditUser = (user: IUser) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    if (isLoading) return <div className={s.usersPage}>Загрузка...</div>;
    if (error) return <div className={s.usersPage}>Ошибка загрузки пользователей</div>;

    return (
        <div className={s.usersPage}>
            <h1>Пользователи</h1>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
                <button onClick={handleLogout}>Выход</button>
            </div>

            <ul className={s.usersList}>
                {users?.map((user: IUser) => (
                    <li key={user.id}>
                        <img
                            src={user.avatar}
                            alt={user.name}
                            onClick={() => handleEditUser(user)}
                        />
                        <div
                            className={s.userInfo}
                            onClick={() => handleEditUser(user)}
                        >
                            <span>{user.name}</span>
                            <span>
                                Зарегистрирован:{" "}
                                {dayjs(user.createdAt).format("DD.MM.YYYY")}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: 20 }}>
                <button onClick={handleCreateUser}>Создать пользователя</button>
            </div>

            <UserModal
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                user={selectedUser}
            />
        </div>
    );
};
