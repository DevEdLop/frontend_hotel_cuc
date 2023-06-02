import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { AppRoutes } from "../app/routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { CheckingAuth } from "../components";
import { logout } from "../store/auth";
import { useEffect } from "react";

const MainRouter = () => {

    const { status, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!user) {
            setTimeout(() => {
                dispatch(logout())
            }, 2000)
        }

    }, [])

    if (status === 'checking') {
        return <CheckingAuth />
    }




    return (
        <Routes>

            {
                (status === "authenticated")
                    ? <Route path="/*" element={<AppRoutes />} />
                    : < Route path="/auth/*" element={<AuthRoutes />} />
            }
            {/* validacion */}
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}

export default MainRouter;
