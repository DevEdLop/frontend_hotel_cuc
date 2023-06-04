import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { AppRoutes } from "../app/routes/AppRoutes";
import { CheckingAuth } from "../components";
import { useCheckAuth } from "../helpers";

const MainRouter = () => {

    const { status } = useCheckAuth()

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
