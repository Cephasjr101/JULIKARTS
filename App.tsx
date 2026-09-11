import { Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Hotel from "./pages/Hotel";
import Mart from "./pages/Mart";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/mart" element={<Mart />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
