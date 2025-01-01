import {
  CheckCircle,
  IndianRupee,
  Menu as MenuIcon,
  Scroll,
  Users,
  X,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../../../css/admin/AdminHeader.module.css";
import { logout } from "../../../Store/slice/adminSlice";

const AdminHeader = ({ showMenu, setShowMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((store) => store.adminSlice);

  const dispatch = useDispatch();

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
    {
      label: "Employee",
      path: "/admin/dashboard",
      icon: <Users />,
      iconEmoji: "👤",
    },
    {
      label: "Trainee",
      path: "/admin/trainee",
      icon: <Users />,
      iconEmoji: "👤",
    },
    {
      label: "Leave Approve",
      path: "/admin/leave-approve",
      icon: <CheckCircle />,
      iconEmoji: "✔️",
    },
    {
      label: "Salary",
      path: "/admin/salary",
      icon: <IndianRupee />,
      iconEmoji: "💵",
    },
    {
      label: "Company Ledger",
      path: "/admin/ledger",
      icon: <Scroll />,
      iconEmoji: "📚",
    },
  ];

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logoutHandler = () => {
    dispatch(logout());
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
            {user.token && (
              <button className={styles.logoutButton} onClick={logoutHandler}>
                Logout
              </button>
            )}
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
                  {user.token && (
                    <button
                      className={styles.drawerLogoutButton}
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>
                  )}
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
