import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Forms/SearchInput";

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home Appliances",
  "Books",
  "Beauty",
  "Sports",
  "Toys",
];

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3">
        {/* Brand */}
        <Link to="/" className="navbar-brand fw-bold fs-4">
          <span className="me-2">🛒</span>Sakhi
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="w-100 d-flex justify-content-between align-items-center">
            {/* LEFT SIDE */}
            <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/categories" className="nav-link">
                  Categories
                </NavLink>
              </li>
            </ul>

            {/* CENTER (Search Bar) */}
            <div className="mx-auto" style={{ width: "500px" }}>
              <SearchInput />
            </div>

            {/* RIGHT SIDE */}
            <ul className="navbar-nav d-flex align-items-center">
              {/* Auth */}
              {!auth.user ? (
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Register / Login
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link text-decoration-none"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth.user?.name}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end shadow"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item text-danger"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}

              {/* Cart */}
              <li className="nav-item me-3">
                <NavLink to="/cart" className="nav-link">
                  <i className="bi bi-cart4 me-1"></i> Cart (0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Categories */}
      <div className="bg-light py-3 shadow-sm">
        <div className="container d-flex flex-wrap justify-content-center gap-3">
          {categories.map((cat, index) => (
            <button
              key={index}
              className="btn btn-outline-primary btn-sm rounded-pill px-4 py-2 fw-semibold text-capitalize"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
