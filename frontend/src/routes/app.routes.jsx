import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import { DeputadosDetails } from "../pages/DeputadosDetails";
import { NotFound } from "../pages/404";
import { Follows } from "../pages/Follows";
import { Profile } from "../pages/Profile";

export function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/deputados/:id" element={<DeputadosDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}