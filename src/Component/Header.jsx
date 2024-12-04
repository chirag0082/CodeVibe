import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";
import styles from "../css/HeaderMenu.module.css";
import logo from "../Images/logo.png";
import scrollTop from "../utils/scrollTop";

const HeaderMenu = ({ showMenu, setShowMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setShowMenu]);

  const handleNavigation = (path) => {
    setShowMenu(false);
    navigate(path);
  };

  const menuItems = [
    { label: "Home", path: "/", icon: "🏠" },
    { label: "About", path: "/about", icon: "ℹ️" },
    { label: "What we do", path: "/services", icon: "💼" },
    { label: "Portfolio", path: "/portfolio", icon: "📁" },
    { label: "Contact Us", path: "/contact", icon: "📞" },
    { label: "Career", path: "/career", icon: "💡" },
  ];

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={styles.headerFullWidth}>
      <div className={styles.headerContainer}>
        <div className={styles.logoSection}>
          <Link to="/">
            <img src={logo} alt="Company Logo" className={styles.logo} />
          </Link>
        </div>

        <div className={styles.navSection}>
          <button
            onClick={toggleMenu}
            className={`${styles.burgerMenuButton} md:hidden`}
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={styles.desktopNavFull}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.desktopNavLink} ${
                  location.pathname === item.path ? styles.activeNavLink : ""
                }`}
                onClick={scrollTop}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {showMenu && (
            <div className={styles.mobileDrawer}>
              <div className={styles.drawerOverlay} onClick={toggleMenu} />

              <div className={styles.drawerContent}>
                <div className={styles.drawerHeader}>
                  <Link to="/" onClick={toggleMenu}>
                    <img
                      src={logo}
                      alt="Company Logo"
                      className={styles.drawerLogo}
                    />
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
                      <span className={styles.drawerNavIcon}>{item.icon}</span>
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

export default HeaderMenu;
