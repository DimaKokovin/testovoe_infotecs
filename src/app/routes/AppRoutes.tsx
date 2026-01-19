
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../../pages/loginPage/LoginPage";
import {Users} from "../../pages/users/Users.tsx";
import { Page404 } from "../../pages/page404/Page404.tsx";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<Users/>} />
            <Route path="/*" element={<Page404/>} />

        </Routes>
    );
};


