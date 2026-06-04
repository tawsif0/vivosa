import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEdit,
  FiFolder,
  FiHome,
  FiLogOut,
  FiPlus,
  FiMessageSquare,
  FiSettings,
  FiShield,
} from "react-icons/fi";
import BackToHomeButton from "../Auth/BackToHomeButton";

const Sidebar = ({
  activeTab,
  user,
  onTabChange,
  onLogout,
  sidebarOpen,
  setSidebarOpen,
  toggleSidebar,
  isMobile,
  isMobileOpen,
  setIsMobileOpen,
  isHovered,
  setIsHovered,
  contactUnreadCount = 0,
}) => {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const navItems = useMemo(() => {
    const items = [
      {
        tab: "dashboard",
        label: user?.userType === "admin" ? "Admin Dashboard" : "Dashboard",
        icon: user?.userType === "admin" ? FiShield : FiHome,
      },
    ];

    if (user?.userType === "admin") {
      items.push({
        tab: "sustainable-leather",
        label: "Sustainable Leather",
        icon: FiFolder,
        children: [
          {
            tab: "sustainable-leather-contract-furniture",
            label: "Contract & Furniture",
            icon: FiFolder,
            children: [
              { tab: "sustainable-leather-contract-furniture-create", label: "Create", icon: FiPlus },
              { tab: "sustainable-leather-contract-furniture-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "sustainable-leather-footwear",
            label: "Leather for Footwear",
            icon: FiFolder,
            children: [
              { tab: "sustainable-leather-footwear-create", label: "Create", icon: FiPlus },
              { tab: "sustainable-leather-footwear-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "sustainable-leather-goods",
            label: "Leather Goods",
            icon: FiFolder,
            children: [
              { tab: "sustainable-leather-goods-create", label: "Create", icon: FiPlus },
              { tab: "sustainable-leather-goods-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "sustainable-leather-lining",
            label: "Leather Lining",
            icon: FiFolder,
            children: [
              { tab: "sustainable-leather-lining-create", label: "Create", icon: FiPlus },
              { tab: "sustainable-leather-lining-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "sustainable-leather-automotive",
            label: "Automotive",
            icon: FiFolder,
            children: [
              { tab: "sustainable-leather-automotive-create", label: "Create", icon: FiPlus },
              { tab: "sustainable-leather-automotive-modify", label: "Modify", icon: FiEdit },
            ],
          },
        ],
      });

      items.push({
        tab: "men",
        label: "Men",
        icon: FiFolder,
        children: [
          {
            tab: "men-sweater",
            label: "Sweater",
            icon: FiFolder,
            children: [
              { tab: "men-sweater-create", label: "Create", icon: FiPlus },
              { tab: "men-sweater-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "men-jackets-coats",
            label: "Jackets & Coats",
            icon: FiFolder,
            children: [
              { tab: "men-jackets-coats-create", label: "Create", icon: FiPlus },
              { tab: "men-jackets-coats-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "men-pants",
            label: "Pants",
            icon: FiFolder,
            children: [
              { tab: "men-pants-create", label: "Create", icon: FiPlus },
              { tab: "men-pants-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "men-joggers",
            label: "Joggers",
            icon: FiFolder,
            children: [
              { tab: "men-joggers-create", label: "Create", icon: FiPlus },
              { tab: "men-joggers-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "men-polo-shirt",
            label: "Polo Shirt",
            icon: FiFolder,
            children: [
              { tab: "men-polo-shirt-create", label: "Create", icon: FiPlus },
              { tab: "men-polo-shirt-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "men-shirts",
            label: "Shirts",
            icon: FiFolder,
            children: [
              { tab: "men-shirts-create", label: "Create", icon: FiPlus },
              { tab: "men-shirts-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "men-t-shirts",
            label: "T-shirts",
            icon: FiFolder,
            children: [
              { tab: "men-t-shirts-create", label: "Create", icon: FiPlus },
              { tab: "men-t-shirts-modify", label: "Modify", icon: FiEdit },
            ],
          },
        ],
      });

      items.push({
        tab: "women",
        label: "Women",
        icon: FiFolder,
        children: [
          {
            tab: "women-sweater",
            label: "Sweater",
            icon: FiFolder,
            children: [
              { tab: "women-sweater-create", label: "Create", icon: FiPlus },
              { tab: "women-sweater-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "women-jackets-coats",
            label: "Jackets & Coats",
            icon: FiFolder,
            children: [
              { tab: "women-jackets-coats-create", label: "Create", icon: FiPlus },
              { tab: "women-jackets-coats-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "women-pants",
            label: "Pants",
            icon: FiFolder,
            children: [
              { tab: "women-pants-create", label: "Create", icon: FiPlus },
              { tab: "women-pants-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "women-polo-shirts",
            label: "Polo Shirts",
            icon: FiFolder,
            children: [
              { tab: "women-polo-shirts-create", label: "Create", icon: FiPlus },
              { tab: "women-polo-shirts-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "women-shirts",
            label: "Shirts",
            icon: FiFolder,
            children: [
              { tab: "women-shirts-create", label: "Create", icon: FiPlus },
              { tab: "women-shirts-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "women-t-shirts",
            label: "T-shirts",
            icon: FiFolder,
            children: [
              { tab: "women-t-shirts-create", label: "Create", icon: FiPlus },
              { tab: "women-t-shirts-modify", label: "Modify", icon: FiEdit },
            ],
          },
          {
            tab: "women-swim-lingerie",
            label: "Swim & Lingerie",
            icon: FiFolder,
            children: [
              { tab: "women-swim-lingerie-create", label: "Create", icon: FiPlus },
              { tab: "women-swim-lingerie-modify", label: "Modify", icon: FiEdit },
            ],
          },
        ],
      });

      items.push({
        tab: "kids",
        label: "Kids",
        icon: FiFolder,
        children: [
          {
            tab: "kids-create",
            label: "Create",
            icon: FiPlus,
          },
          {
            tab: "kids-modify",
            label: "Modify",
            icon: FiEdit,
          },
        ],
      });

      items.push({
        tab: "contact-users",
        label: "Contact Users",
        icon: FiMessageSquare,
      });
    }

    items.push({
      tab: "settings",
      label: "Settings",
      icon: FiSettings,
    });

    return items;
  }, [user?.userType]);

  useEffect(() => {
    const activeParents = {};
    navItems.forEach((item) => {
      if (Array.isArray(item.children)) {
        item.children.forEach((child) => {
          if (child.tab === activeTab) {
            activeParents[item.tab] = true;
          }
          if (Array.isArray(child.children) && child.children.some((gc) => gc.tab === activeTab)) {
            activeParents[item.tab] = true;
            activeParents[child.tab] = true;
          }
        });
      }
    });
    if (Object.keys(activeParents).length > 0) {
      setOpenSubmenus((previous) => ({ ...previous, ...activeParents }));
    }
  }, [activeTab, navItems]);

  const getUserInitials = () => {
    if (!user?.name) return "U";
    return String(user.name)
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const showLabels = (isMobileView) => sidebarOpen || isMobileView;
  const unreadBadge = contactUnreadCount > 0 ? contactUnreadCount : 0;

  const handleNavItemClick = (item, isMobileView = false) => {
    if (item.tab === "home") {
      window.location.href = "/";
    } else if (Array.isArray(item.children) && item.children.length > 0) {
      if (!showLabels(isMobileView)) {
        setSidebarOpen(true);
      } else {
        setOpenSubmenus((previous) => ({ ...previous, [item.tab]: !previous[item.tab] }));
      }
      return;
    } else {
      onTabChange(item.tab);
    }

    if (isMobileView) {
      setIsMobileOpen(false);
    }
  };

  const renderNavItem = (item, isMobileView = false) => {
    const Icon = item.icon;
    const isActive = activeTab === item.tab;
    const isParentActive =
      Array.isArray(item.children) && item.children.some((child) => child.tab === activeTab);
    const isSubmenuOpen = Boolean(openSubmenus[item.tab]);
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;

    const baseClass = `group relative flex w-full items-center rounded-2xl transition-all ${
      showLabels(isMobileView) ? "justify-start gap-3 px-4 py-3" : "mx-auto h-11 w-11 justify-center"
    } ${
      isActive || isParentActive
        ? "bg-black text-white shadow-[0_12px_22px_rgba(15,23,42,0.16)]"
        : "text-slate-700 hover:bg-white/70 hover:text-slate-900"
    }`;

    return (
      <li key={item.tab} className="space-y-1">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02, x: isMobileView ? 4 : 0 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavItemClick(item, isMobileView)}
          className={baseClass}
          title={item.label}
        >
          {isActive || isParentActive ? (
            <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-emerald-400" />
          ) : null}
          <span className="flex h-5 w-5 items-center justify-center shrink-0">
            <Icon className="h-4 w-4" />
          </span>
          {showLabels(isMobileView) ? (
            <>
              <span className="flex-1 truncate text-sm font-medium text-left">{item.label}</span>
              {item.tab === "contact-users" && unreadBadge > 0 ? (
                <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-amber-400 px-2 py-0.5 text-[11px] font-bold text-slate-900">
                  {unreadBadge > 99 ? "99+" : unreadBadge}
                </span>
              ) : null}
              {hasChildren ? <FiChevronDown className={`h-4 w-4 transition-transform ${isSubmenuOpen ? "rotate-180" : ""}`} /> : null}
            </>
          ) : item.tab === "contact-users" && unreadBadge > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-slate-900 shadow-sm">
              {unreadBadge > 99 ? "99+" : unreadBadge}
            </span>
          ) : null}
        </motion.button>

        {hasChildren && isSubmenuOpen && showLabels(isMobileView) ? (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.16 }}
            className="ml-7 space-y-1 border-l border-black/8 pl-3"
          >
            {item.children.map((child) => {
              const childActive = activeTab === child.tab;
              const ChildIcon = child.icon;
              const hasGrandchildren = Array.isArray(child.children) && child.children.length > 0;
              const isGrandmenuOpen = Boolean(openSubmenus[child.tab]);

              return (
                <li key={child.tab} className="space-y-1">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavItemClick(child, isMobileView)}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                      childActive || (hasGrandchildren && child.children.some(gc => activeTab === gc.tab))
                        ? "bg-gray-200 text-gray-900 font-semibold"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }`}
                    title={child.label}
                  >
                    <span className="flex h-4 w-4 items-center justify-center shrink-0">
                      <ChildIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="flex-1 truncate">{child.label}</span>
                    {hasGrandchildren ? <FiChevronDown className={`h-3 w-3 transition-transform ${isGrandmenuOpen ? "rotate-180" : ""}`} /> : null}
                  </motion.button>

                  {hasGrandchildren && isGrandmenuOpen ? (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.12 }}
                      className="ml-4 space-y-1 border-l border-black/8 pl-2"
                    >
                      {child.children.map((grandchild) => {
                        const grandchildActive = activeTab === grandchild.tab;
                        const GrandchildIcon = grandchild.icon;

                        return (
                          <li key={grandchild.tab}>
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleNavItemClick(grandchild, isMobileView)}
                              className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors ${
                                grandchildActive ? "bg-gray-300 text-gray-900 font-semibold" : "text-gray-500 hover:bg-gray-100 hover:text-black"
                              }`}
                              title={grandchild.label}
                            >
                              <span className="flex h-3 w-3 items-center justify-center shrink-0">
                                <GrandchildIcon className="h-3.5 w-3.5" />
                              </span>
                              <span className="truncate">{grandchild.label}</span>
                            </motion.button>
                          </li>
                        );
                      })}
                    </motion.ul>
                  ) : null}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </li>
    );
  };

  if (isMobile) {
    return (
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: isMobileOpen ? 0 : -320 }}
        exit={{ x: -320 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col overflow-hidden border-r border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.98)_100%)] text-black shadow-[0_20px_48px_rgba(15,23,42,0.14)] backdrop-blur-xl"
        style={{ height: "100dvh", maxHeight: "100dvh" }}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-black/8 px-4">
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold">Dashboard</h1>
            <p className="truncate text-xs text-gray-500">
              {user?.userType === "admin" ? "Admin Console" : "Customer Console"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-black"
            aria-label="Close sidebar"
          >
            <span className="text-lg">×</span>
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
          <ul className="space-y-2">{navItems.map((item) => renderNavItem(item, true))}</ul>
        </nav>

        <div className="shrink-0 border-t border-black/8 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
          <BackToHomeButton className="mb-4 w-full justify-center text-[10px] tracking-[0.22em]" />
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl font-bold ${user?.userType === "admin" ? "bg-slate-900 text-white" : "bg-emerald-600 text-white"}`}>
              {getUserInitials()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-black">
                    {user?.name || "User"}
                  </p>
                  <p className="truncate text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
                  title="Logout"
                >
                  <FiLogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    );
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 260 : 80 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="relative flex h-full flex-col overflow-hidden border-r border-black/8 bg-[linear-gradient(160deg,#f8fafc,#eef2f7)] shadow-sm"
    >
      <div
        className="flex h-16 cursor-pointer items-center justify-between border-b border-black/8 p-4 shrink-0"
        onClick={() => setSidebarOpen((previous) => !previous)}
      >
        {sidebarOpen ? (
          <div className="flex min-w-0 flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
              Command
            </span>
            <h1 className="truncate text-lg font-semibold text-slate-900">Dashboard</h1>
          </div>
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 font-semibold text-white">
            D
          </div>
        )}
        <button
          type="button"
          className="rounded-xl text-slate-600 transition-colors hover:bg-white/70 hover:text-slate-900"
          onClick={(event) => {
            event.stopPropagation();
            toggleSidebar?.();
          }}
        >
          {sidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <ul className="space-y-2">{navItems.map((item) => renderNavItem(item))}</ul>
      </nav>

      <div className="border-t border-black/8 p-4 shrink-0">
        {sidebarOpen ? (
          <BackToHomeButton className="mb-4 w-full justify-center text-[10px] tracking-[0.22em]" />
        ) : null}
        <div className="flex items-center">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-bold ${user?.userType === "admin" ? "bg-slate-900 text-white" : "bg-emerald-600 text-white"}`}
          >
            {sidebarOpen ? getUserInitials() : getUserInitials().charAt(0)}
          </div>
          {sidebarOpen ? (
            <div className="ml-3 min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-black">
                    {user?.name || "User"}
                  </p>
                  <p className="truncate text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-white/70 hover:text-black"
                  title="Logout"
                >
                  <FiLogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
