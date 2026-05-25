import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Ad from "./pages/Ad";
import Kategori from "./pages/Kategori";
import Om from "./pages/Om";
import "./app.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ads/:id" element={<Ad />} />
        <Route path="/kategori/:navn" element={<Kategori />} />
        <Route path="/om" element={<Om />} />
      </Routes>
    </BrowserRouter>
  );
}
