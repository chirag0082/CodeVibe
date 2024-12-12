import {
  AppstoreOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu as MenuIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../../../css/admin/AdminHeader.module.css";

const AdminHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (path) => {
    setShowMenu(false);
    navigate(path);
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <DashboardOutlined />,
      iconEmoji: "📊",
    },
    {
      label: "Leave Approve",
      path: "/admin/leave-approve",
      icon: <UserOutlined />,
      iconEmoji: "👥",
    },
    {
      label: "Salary",
      path: "/admin/salary",
      icon: <AppstoreOutlined />,
      iconEmoji: "📈",
    },
  ];

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={styles.headerFullWidth}>
      <div className={styles.headerContainer}>
        <div className={styles.logoSection}>
          <Link to="/admin/dashboard">
            <h1 className={styles.logo}>Admin</h1>
          </Link>
        </div>

        <div className={styles.navSection}>
          <button
            onClick={toggleMenu}
            className={`${styles.burgerMenuButton} md:hidden`}
          >
            {showMenu ? <X size={24} /> : <MenuIcon size={24} />}
          </button>

          <nav className={styles.desktopNavFull}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.desktopNavLink} ${
                  location.pathname === item.path ? styles.activeNavLink : ""
                }`}
              >
                {item.icon}
                <span className={styles.navLinkText}>{item.label}</span>
              </Link>
            ))}
          </nav>

          {showMenu && (
            <div className={styles.mobileDrawer}>
              <div className={styles.drawerOverlay} onClick={toggleMenu} />
              <div className={styles.drawerContent}>
                <div className={styles.drawerHeader}>
                  <Link to="/admin/dashboard" onClick={toggleMenu}>
                    <h1 className={styles.drawerLogo}>Admin</h1>
                  </Link>
                  <button onClick={toggleMenu} className={styles.closeButton}>
                    <X size={24} />
                  </button>
                </div>

                <nav className={styles.drawerNav}>
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`${styles.drawerNavLink} ${
                        location.pathname === item.path
                          ? styles.activeDrawerNavLink
                          : ""
                      }`}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <span className={styles.drawerNavIcon}>
                        {item.iconEmoji}
                      </span>
                      <span className={styles.drawerNavLabel}>
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
