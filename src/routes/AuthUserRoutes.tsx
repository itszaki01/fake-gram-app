import { useAppSelector } from "../redux/app/hooks";
import { authSliceSelector } from "../redux/feature/auth/authSlice";
import { Outlet } from "react-router-dom";

export default function AuthUserRoutes() {
    const { isAuth } = useAppSelector(authSliceSelector);
    if (!isAuth) {
        return <h1>Please Login to See This Page</h1>;
    }

    return <Outlet />;
}
