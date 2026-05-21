import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

const About = lazy(() => import("./pages/About"));
const Landing = lazy(() => import("./pages/Landing"));
const Mensware = lazy(() => import("./pages/Mensware"));
const Womenswear = lazy(() => import("./pages/Womenswear"));
const Contact = lazy(() => import("./pages/Contact"));
const MarineLeather = lazy(() => import("./pages/MarineLeather"));
const Automotive = lazy(() => import("./pages/Automotive"));
const LeatherLining = lazy(() => import("./pages/LeatherLining"));
const LeatherLiningDetail = lazy(() => import("./pages/LeatherLiningDetail"));
const LeatherGoods = lazy(() => import("./pages/LeatherGoods"));
const LeatherGoodsDetail = lazy(() => import("./pages/LeatherGoodsDetail"));
const ContractFurniture = lazy(() => import("./pages/ContractFurniture"));
const LeatherFootwear = lazy(() => import("./pages/LeatherFootwear"));
const LeatherFootwearDetail = lazy(() => import("./pages/LeatherFootwearDetail"));
const Apparel = lazy(() => import("./pages/Apparel"));
const Kids = lazy(() => import("./pages/Kids"));
const KidsDetails = lazy(() => import("./pages/KidsDetails"));
const ApparelCategory = lazy(() => import("./pages/ApparelCategory"));
const SwimLingerie = lazy(() => import("./pages/SwimLingerie"));
const SwimLingerieDetails = lazy(() => import("./pages/SwimLingerieDetails"));
const MensSweaters = lazy(() => import("./pages/MensSweaters"));
const MensSweaterDetails = lazy(() => import("./pages/MensSweaterDetails"));
const WomensSweaters = lazy(() => import("./pages/WomensSweaters"));
const WomensSweaterDetails = lazy(() => import("./pages/WomensSweaterDetails"));
const MensPants = lazy(() => import("./pages/MensPants"));
const MensPantsDetails = lazy(() => import("./pages/MensPantsDetails"));
const WomensPants = lazy(() => import("./pages/WomensPants"));
const WomensPantsDetails = lazy(() => import("./pages/WomensPantsDetails"));
const MensJackets = lazy(() => import("./pages/MensJackets"));
const MensJacketDetails = lazy(() => import("./pages/MensJacketDetails"));
const WomensJackets = lazy(() => import("./pages/WomensJackets"));
const WomensJacketDetails = lazy(() => import("./pages/WomensJacketDetails"));

const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-surface text-primary">
    <div className="w-12 h-12 border-4 border-matte-gold border-t-transparent rounded-full animate-spin mb-4" />
    <span className="font-label-caps text-label-caps tracking-widest text-matte-gold uppercase text-xs">
      Loading...
    </span>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToTopButton />
      <div className="bg-surface text-on-surface selection:bg-gold-accent selection:text-pure-black min-h-screen">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/mensware" element={<Mensware />} />
            <Route path="/womenswear" element={<Womenswear />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/kids/:id" element={<KidsDetails />} />
            <Route
              path="/mens/hoodies-and-sweatshirts"
              element={<Navigate to="/mens/sweaters" replace />}
            />
            <Route
              path="/womens/hoodies-and-sweatshirts"
              element={<Navigate to="/womens/sweaters" replace />}
            />
            <Route path="/mens/:category" element={<ApparelCategory kind="mens" />} />
            <Route path="/womens/:category" element={<ApparelCategory kind="womens" />} />
            <Route path="/mens/sweaters" element={<MensSweaters />} />
            <Route path="/mens/sweaters/:id" element={<MensSweaterDetails />} />
            <Route path="/womens/sweaters" element={<WomensSweaters />} />
            <Route path="/womens/sweaters/:id" element={<WomensSweaterDetails />} />
            <Route path="/mens/jackets-and-coats" element={<MensJackets />} />
            <Route path="/mens/jackets-and-coats/:id" element={<MensJacketDetails />} />
            <Route path="/womens/jackets-and-coats" element={<WomensJackets />} />
            <Route path="/womens/jackets-and-coats/:id" element={<WomensJacketDetails />} />
            <Route path="/womens/swim-lingerie" element={<SwimLingerie />} />
            <Route path="/womens/swim-lingerie/:id" element={<SwimLingerieDetails />} />
            <Route path="/mens/pants" element={<MensPants />} />
            <Route path="/mens/pants/:id" element={<MensPantsDetails />} />
            <Route path="/womens/pants" element={<WomensPants />} />
            <Route path="/womens/pants/:id" element={<WomensPantsDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/marine-leather" element={<MarineLeather />} />
            <Route path="/automotive" element={<Automotive />} />
            <Route path="/leather-lining" element={<LeatherLining />} />
            <Route path="/leather-lining/:productId" element={<LeatherLiningDetail />} />
            <Route path="/leather-goods" element={<LeatherGoods />} />
            <Route path="/leather-goods/:productId" element={<LeatherGoodsDetail />} />
            <Route path="/contract-furniture" element={<ContractFurniture />} />
            <Route path="/leather-footwear" element={<LeatherFootwear />} />
            <Route path="/leather-footwear/:productId" element={<LeatherFootwearDetail />} />
            <Route path="/apparel" element={<Apparel />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
