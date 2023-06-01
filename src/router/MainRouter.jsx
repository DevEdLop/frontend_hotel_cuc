import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { AppRoutes } from "../app/routes/AppRoutes";

const MainRouter = () => {


    return (
        <Routes>
            {/*Login y Registro*/}
            <Route path="/auth/*" element={<AuthRoutes />} />
            {/* App Habitaciones y reservas */}
            <Route path="/app/*" element={<AppRoutes />} />
            {/* validacion */}
            <Route path="/*" element={<AuthRoutes />} />
        </Routes>
    )
}

export default MainRouter;
