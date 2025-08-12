import { AnimatePresence } from "framer-motion";
import { PageTransition } from "../components/PageTransition";
import { Navigate, useLocation } from "react-router-dom";
import {Routes, Route} from "react-router-dom"

import {SignIn} from "../pages/SignIn";
import {SignUp} from "../pages/SignUp";
import { VerifyPage } from "../pages/VerifyPage";
import { NotFound } from "../pages/404";

export function AuthRoutes () {
    const location = useLocation();
    return(
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/verify" element={<PageTransition><VerifyPage /></PageTransition>} />
                <Route path="/login" element={<PageTransition><SignIn /></PageTransition>} />
                <Route path="/register" element={<PageTransition><SignUp /></PageTransition>} />
                <Route path="/404" element={<PageTransition><NotFound /></PageTransition>} />
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    )
}