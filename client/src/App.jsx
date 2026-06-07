import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { useAuth } from "./hooks/useAuth";

const About = lazy(() => import("./pages/About"));
const Landing = lazy(() => import("./pages/Landing"));
const Mensware = lazy(() => import("./pages/Mensware"));
const Womenswear = lazy(() => import("./pages/Womenswear"));
const Contact = lazy(() => import("./pages/Contact"));
const AviationLeather = lazy(() => import("./pages/AviationLeather"));
const AviationLeatherDetail = lazy(() => import("./pages/AviationLeatherDetail"));
const Automotive = lazy(() => import("./pages/Automotive"));
const LeatherLining = lazy(() => import("./pages/LeatherLining"));
const LeatherLiningDetail = lazy(() => import("./pages/LeatherLiningDetail"));
const LeatherGoods = lazy(() => import("./pages/LeatherGoods"));
const LeatherGoodsDetail = lazy(() => import("./pages/LeatherGoodsDetail"));
const ContractFurniture = lazy(() => import("./pages/ContractFurniture"));
const ContractFurnitureDetail = lazy(() => import("./pages/ContractFurnitureDetail"));
const LeatherFootwear = lazy(() => import("./pages/LeatherFootwear"));
const LeatherFootwearDetail = lazy(() => import("./pages/LeatherFootwearDetail"));
const AutomotiveDetail = lazy(() => import("./pages/AutomotiveDetail"));
const Apparel = lazy(() => import("./pages/Apparel"));
const Kids = lazy(() => import("./pages/Kids"));
const KidsDetails = lazy(() => import("./pages/KidsDetails"));
const ApparelCategory = lazy(() => import("./pages/ApparelCategory"));
const SwimLingerie = lazy(() => import("./pages/SwimLingerie"));
const SwimLingerieDetails = lazy(() => import("./pages/SwimLingerieDetails"));
const WomensCategoryPage = lazy(() => import("./pages/WomensCategoryPage"));
const WomensCategoryDetailsPage = lazy(() => import("./pages/WomensCategoryDetailsPage"));
const MensCategoryPage = lazy(() => import("./pages/MensCategoryPage"));
const MensCategoryDetailsPage = lazy(() => import("./pages/MensCategoryDetailsPage"));
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
const Login = lazy(() => import("./pages/Login"));
const Registration = lazy(() => import("./pages/Registration"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-surface text-primary">
    <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-matte-gold border-t-transparent" />
    <span className="font-label-caps text-label-caps text-xs uppercase tracking-widest text-matte-gold">
      Loading...
    </span>
  </div>
);

const isAuthRoute = (pathname) =>
  pathname === "/admin" ||
  pathname === "/login" ||
  pathname === "/register" ||
  pathname.startsWith("/forgot-password") ||
  pathname.startsWith("/reset-password") ||
  pathname.startsWith("/dashboard");

const DashboardRedirect = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Login />;
};

const RegisterRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Registration />;
};

const DashboardRoute = () => {
  const { user } = useAuth();
  return user ? <Dashboard /> : <Navigate to="/login" replace />;
};

const AppLayout = () => {
  const location = useLocation();
  const { isLoading } = useAuth();
  const hideChrome = isAuthRoute(location.pathname);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <ScrollToTop />
      {!hideChrome ? <ScrollToTopButton /> : null}
      {!hideChrome ? <Navbar /> : null}
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      <div className={`min-h-screen ${hideChrome ? "" : "bg-surface text-on-surface selection:bg-gold-accent selection:text-pure-black"}`}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/mensware" element={<Mensware />} />
            <Route path="/womenswear" element={<Womenswear />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/kids/:id" element={<KidsDetails />} />
            <Route path="/mens/hoodies-and-sweatshirts" element={<Navigate to="/mens/sweaters" replace />} />
            <Route path="/womens/hoodies-and-sweatshirts" element={<Navigate to="/womens/sweaters" replace />} />
            <Route path="/mens/joggers" element={<MensCategoryPage category="joggers" />} />
            <Route path="/mens/joggers/:id" element={<MensCategoryDetailsPage category="joggers" />} />
            <Route path="/mens/polo-shirt" element={<MensCategoryPage category="polo-shirt" />} />
            <Route path="/mens/polo-shirt/:id" element={<MensCategoryDetailsPage category="polo-shirt" />} />
            <Route path="/mens/shirts" element={<MensCategoryPage category="shirts" />} />
            <Route path="/mens/shirts/:id" element={<MensCategoryDetailsPage category="shirts" />} />
            <Route path="/mens/t-shirts" element={<MensCategoryPage category="t-shirts" />} />
            <Route path="/mens/t-shirts/:id" element={<MensCategoryDetailsPage category="t-shirts" />} />
            <Route path="/mens/:category" element={<ApparelCategory kind="mens" />} />
            <Route path="/womens/polo-shirts" element={<WomensCategoryPage category="polo-shirts" />} />
            <Route path="/womens/polo-shirts/:id" element={<WomensCategoryDetailsPage category="polo-shirts" />} />
            <Route path="/womens/shirts" element={<WomensCategoryPage category="shirts" />} />
            <Route path="/womens/shirts/:id" element={<WomensCategoryDetailsPage category="shirts" />} />
            <Route path="/womens/t-shirts" element={<WomensCategoryPage category="t-shirts" />} />
            <Route path="/womens/t-shirts/:id" element={<WomensCategoryDetailsPage category="t-shirts" />} />
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
            <Route path="/aviation-leather" element={<AviationLeather />} />
            <Route path="/aviation-leather/:productId" element={<AviationLeatherDetail />} />
            <Route path="/automotive" element={<Automotive />} />
            <Route path="/automotive/:productId" element={<AutomotiveDetail />} />
            <Route path="/leather-lining" element={<LeatherLining />} />
            <Route path="/leather-lining/:productId" element={<LeatherLiningDetail />} />
            <Route path="/leather-goods" element={<LeatherGoods />} />
            <Route path="/leather-goods/:productId" element={<LeatherGoodsDetail />} />
            <Route path="/contract-furniture" element={<ContractFurniture />} />
            <Route path="/contract-furniture/:productId" element={<ContractFurnitureDetail />} />
            <Route path="/leather-footwear" element={<LeatherFootwear />} />
            <Route path="/leather-footwear/:productId" element={<LeatherFootwearDetail />} />
            <Route path="/apparel" element={<Apparel />} />

            <Route path="/admin" element={<DashboardRedirect />} />
            <Route path="/login" element={<DashboardRedirect />} />
            <Route path="/register" element={<RegisterRoute />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/dashboard" element={<DashboardRoute />} />
            <Route path="/dashboard/*" element={<DashboardRoute />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
      {!hideChrome ? <Footer /> : null}
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
