import {Routes, Route} from "react-router-dom"

import {SignIn} from "../pages/SignIn";
import {SignUp} from "../pages/SignUp";
import { VerifyPage } from "../pages/VerifyPage";
import { NotFound } from "../pages/404";

export function AuthRoutes () {
    return(
        <Routes>
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/login" element={<SignIn/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}