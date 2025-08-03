import { Routes, Route } from "react-router-dom";

import { Homepage } from "../pages/Homepage";
import { DeputadosDetails } from "../pages/DeputadosDetails";

export function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/deputados/:id" element={<DeputadosDetails />} />
    </Routes>
  );
}