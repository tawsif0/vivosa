import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import About from "./pages/About";
import Landing from "./pages/Landing";
import Mensware from "./pages/Mensware";
import Womenswear from "./pages/Womenswear";
import Contact from "./pages/Contact";
import MarineLeather from "./pages/MarineLeather";
import Automotive from "./pages/Automotive";
import LeatherLining from "./pages/LeatherLining";
import LeatherGoods from "./pages/LeatherGoods";
import ContractFurniture from "./pages/ContractFurniture";
import LeatherFootwear from "./pages/LeatherFootwear";
import Apparel from "./pages/Apparel";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToTopButton />
      <div className="bg-surface text-on-surface selection:bg-gold-accent selection:text-pure-black min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/mensware" element={<Mensware />} />
          <Route path="/womenswear" element={<Womenswear />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/marine-leather" element={<MarineLeather />} />
          <Route path="/automotive" element={<Automotive />} />
          <Route path="/leather-lining" element={<LeatherLining />} />
          <Route path="/leather-goods" element={<LeatherGoods />} />
          <Route path="/contract-furniture" element={<ContractFurniture />} />
          <Route path="/leather-footwear" element={<LeatherFootwear />} />
          <Route path="/apparel" element={<Apparel />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
