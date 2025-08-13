import { PageTransition } from "../components/PageTransition";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import { DeputadosDetails } from "../pages/DeputadosDetails";
import { NotFound } from "../pages/404";
import { Follows } from "../pages/Follows";
import { Profile } from "../pages/Profile";
import { Ranking } from "../pages/Ranking";
import { Dashboard } from "../pages/Dashboard";

export function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Homepage /></PageTransition>} />
        <Route path="/deputados/:id" element={<PageTransition><DeputadosDetails /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        <Route path="/404" element={<PageTransition><NotFound /></PageTransition>} />
        <Route path="/follows" element={<PageTransition><Follows /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/ranking" element={<PageTransition><Ranking /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}