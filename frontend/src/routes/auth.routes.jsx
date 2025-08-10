import {Routes, Route} from "react-router-dom"

import {SignIn} from "../pages/SignIn";
import {SignUp} from "../pages/SignUp";
import { VerifyPage } from "../pages/VerifyPage";

export function AuthRoutes () {
    return(
        <Routes>
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/login" element={<SignIn/>}/>
            <Route path="/register" element={<SignUp/>}/>
        </Routes>
    )
}