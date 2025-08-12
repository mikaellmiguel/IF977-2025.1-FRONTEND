import {BrowserRouter} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { AuthProvider } from  "../providers/AuthProvider";
import { useAuth } from "../hooks/useAuth";

function AuthConsumer() {
    const { user } = useAuth();
        return (
            <AnimatePresence mode="wait">
                {user ? <AppRoutes /> : <AuthRoutes />}
            </AnimatePresence>
        );
}

export function Routes() {
    return(
    <BrowserRouter>
        <AuthProvider>
            <AuthConsumer />
        </AuthProvider>
    </BrowserRouter>)
}