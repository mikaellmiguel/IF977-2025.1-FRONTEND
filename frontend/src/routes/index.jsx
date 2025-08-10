import {BrowserRouter} from "react-router-dom";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { AuthProvider } from  "../providers/AuthProvider";
import { useAuth } from "../hooks/useAuth";

function AuthConsumer() {
    const { user } = useAuth();
    return user ? <AppRoutes /> : <AuthRoutes />;
}

export function Routes() {
    return(
    <BrowserRouter>
        <AuthProvider>
            <AuthConsumer />
        </AuthProvider>
    </BrowserRouter>)
}