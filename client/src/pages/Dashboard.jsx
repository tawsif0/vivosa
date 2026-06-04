/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import MobileHeader from "../components/Dashboard/MobileHeader";
import Settings from "../components/Dashboard/Settings";
import DashboardHome from "./DashboardHome";
import AdminPanel from "./AdminPanel";
import KidsCreate from "./KidsCreate";
import KidsModify from "./KidsModify";
import WomenCreate from "./WomenCreate";
import WomenModify from "./WomenModify";
import MenCreate from "./MenCreate";
import MenModify from "./MenModify";
import ContactUsers from "./ContactUsers";
import ContractFurnitureCreate from "./ContractFurnitureCreate";
import ContractFurnitureModify from "./ContractFurnitureModify";
import LeatherFootwearCreate from "./LeatherFootwearCreate";
import LeatherFootwearModify from "./LeatherFootwearModify";
import LeatherGoodsCreate from "./LeatherGoodsCreate";
import LeatherGoodsModify from "./LeatherGoodsModify";
import LeatherLiningCreate from "./LeatherLiningCreate";
import LeatherLiningModify from "./LeatherLiningModify";
import AutomotiveCreate from "./AutomotiveCreate";
import AutomotiveModify from "./AutomotiveModify";
import { useAuth } from "../hooks/useAuth";
import { fetchAdminContacts } from "../api/contact";

const TabContent = React.memo(({ activeTab, user }) => {
  switch (activeTab) {
    case "dashboard":
      return user?.userType === "admin" ? <AdminPanel /> : <DashboardHome user={user} />;
    case "settings":
      return <Settings user={user} />;
    default:
      return user?.userType === "admin" ? <AdminPanel /> : <DashboardHome user={user} />;
  }
});

TabContent.displayName = "TabContent";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem("dashboardActiveTab") || "dashboard";
    const allowed = [
      "dashboard",
      "settings",
      "kids-create",
      "kids-modify",
      "contact-users",
      "women-sweater-create",
      "women-sweater-modify",
      "women-jackets-coats-create",
      "women-jackets-coats-modify",
      "women-pants-create",
      "women-pants-modify",
      "women-polo-shirts-create",
      "women-polo-shirts-modify",
      "women-shirts-create",
      "women-shirts-modify",
      "women-t-shirts-create",
      "women-t-shirts-modify",
      "women-swim-lingerie-create",
      "women-swim-lingerie-modify",
      "men-sweater-create",
      "men-sweater-modify",
      "men-jackets-coats-create",
      "men-jackets-coats-modify",
      "men-pants-create",
      "men-pants-modify",
      "men-joggers-create",
      "men-joggers-modify",
      "men-polo-shirt-create",
      "men-polo-shirt-modify",
      "men-shirts-create",
      "men-shirts-modify",
      "men-t-shirts-create",
      "men-t-shirts-modify",
      "sustainable-leather-contract-furniture-create",
      "sustainable-leather-contract-furniture-modify",
      "sustainable-leather-footwear-create",
      "sustainable-leather-footwear-modify",
      "sustainable-leather-goods-create",
      "sustainable-leather-goods-modify",
      "sustainable-leather-lining-create",
      "sustainable-leather-lining-modify",
      "sustainable-leather-automotive-create",
      "sustainable-leather-automotive-modify",
    ];
    return allowed.includes(saved) ? saved : "dashboard";
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [contactUnreadCount, setContactUnreadCount] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (activeTab) {
      localStorage.setItem("dashboardActiveTab", activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (user?.userType !== "admin") {
      setContactUnreadCount(0);
      return undefined;
    }

    let isMounted = true;

    const loadUnreadCount = async () => {
      try {
        const contacts = await fetchAdminContacts();
        if (!isMounted) return;
        setContactUnreadCount(contacts.filter((contact) => contact.status !== "read").length);
      } catch (error) {
        if (isMounted) {
          setContactUnreadCount(0);
        }
      }
    };

    loadUnreadCount();
    const intervalId = window.setInterval(loadUnreadCount, 30000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [user?.userType]);

  const handleTabChange = (tab) => {
    setActiveTab(tab || "dashboard");
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("dashboardActiveTab");
    logout();
    setShowLogoutConfirm(false);
    navigate("/login", { replace: true });
  };

  const content = useMemo(() => {
    if (activeTab === "settings") {
      return <Settings user={user} />;
    }

    if (activeTab === "kids-create") {
      return <KidsCreate />;
    }

    if (activeTab === "kids-modify") {
      return <KidsModify />;
    }

    if (activeTab === "contact-users") {
      return <ContactUsers onUnreadCountChange={setContactUnreadCount} />;
    }

    if (activeTab.startsWith("women-")) {
      const parts = activeTab.split("-");
      const action = parts[parts.length - 1];

      let category = "";
      if (activeTab.includes("sweater")) category = "sweater";
      else if (activeTab.includes("jackets-coats")) category = "jackets-coats";
      else if (activeTab.includes("pants")) category = "pants";
      else if (activeTab.includes("polo-shirts")) category = "polo-shirts";
      else if (activeTab.includes("t-shirts")) category = "t-shirts";
      else if (activeTab.includes("shirts")) category = "shirts";
      else if (activeTab.includes("swim-lingerie")) category = "swim-lingerie";

      if (action === "create") {
        return <WomenCreate key={category} category={category} />;
      }
      if (action === "modify") {
        return <WomenModify key={category} category={category} />;
      }
    }

    if (activeTab.startsWith("men-")) {
      const parts = activeTab.split("-");
      const action = parts[parts.length - 1];

      let category = "";
      if (activeTab.includes("sweater")) category = "sweater";
      else if (activeTab.includes("jackets-coats")) category = "jackets-coats";
      else if (activeTab.includes("pants")) category = "pants";
      else if (activeTab.includes("joggers")) category = "joggers";
      else if (activeTab.includes("polo-shirt")) category = "polo-shirt";
      else if (activeTab.includes("t-shirts")) category = "t-shirts";
      else if (activeTab.includes("shirts")) category = "shirts";

      if (action === "create") {
        return <MenCreate key={category} category={category} />;
      }
      if (action === "modify") {
        return <MenModify key={category} category={category} />;
      }
    }

    if (activeTab.startsWith("sustainable-leather-")) {
      if (activeTab.endsWith("-create")) {
        if (activeTab.includes("contract-furniture")) return <ContractFurnitureCreate />;
        if (activeTab.includes("footwear")) return <LeatherFootwearCreate />;
        if (activeTab.includes("goods")) return <LeatherGoodsCreate />;
        if (activeTab.includes("lining")) return <LeatherLiningCreate />;
        if (activeTab.includes("automotive")) return <AutomotiveCreate />;
      }
      if (activeTab.endsWith("-modify")) {
        if (activeTab.includes("contract-furniture")) return <ContractFurnitureModify />;
        if (activeTab.includes("footwear")) return <LeatherFootwearModify />;
        if (activeTab.includes("goods")) return <LeatherGoodsModify />;
        if (activeTab.includes("lining")) return <LeatherLiningModify />;
        if (activeTab.includes("automotive")) return <AutomotiveModify />;
      }
    }

    return user?.userType === "admin" ? <AdminPanel /> : <DashboardHome user={user} />;
  }, [activeTab, user]);

  return (
    <div className="bg-[linear-gradient(135deg,#f6f7fb_0%,#edf2f7_100%)] min-h-screen flex items-center justify-center p-2 md:p-4 relative font-space">
      {isMobile ? <MobileHeader toggleSidebar={toggleSidebar} /> : null}

      <AnimatePresence>
        {isMobile && isMobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <div
        className={`flex w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 relative ${
          isMobile ? "mt-16 mb-2 h-[calc(100vh-5rem)]" : "h-[95vh]"
        }`}
      >
        <Sidebar
          isMobile={isMobile}
          isMobileOpen={isMobileOpen}
          sidebarOpen={sidebarOpen}
          activeTab={activeTab}
          user={user}
          onTabChange={handleTabChange}
          toggleSidebar={toggleSidebar}
          setIsMobileOpen={setIsMobileOpen}
          onLogout={handleLogout}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          contactUnreadCount={contactUnreadCount}
        />

        <div className="flex-1 h-full overflow-auto relative bg-[linear-gradient(180deg,#f8fafc,#ffffff)]">
          <div className="p-4 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showLogoutConfirm ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md border border-gray-300"
            >
              <div className="p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-black mb-4">
                  <FiLogOut className="h-5 w-5 text-white" />
                </div>

                <h3 className="text-lg font-medium text-black mb-2">Ready to leave?</h3>
                <p className="text-gray-700 mb-6">
                  Are you sure you want to sign out of your account?
                </p>

                <div className="flex justify-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmLogout}
                    className="px-5 py-2.5 text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-800 transition-all"
                  >
                    Logout
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
