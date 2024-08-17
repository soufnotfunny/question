import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { IoSearchSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import LogoColor from "../../../assets/images/logo-color.png";
import { useNavigate } from "react-router-dom";
function Menu() {
  const [isSearch, setIsSearch] = useState(false);
  const openSearch = () => {
    setIsSearch((prevState) => !prevState);
  };

  const Email = sessionStorage.getItem("Email");

  const navigate = useNavigate();
  const Logout = () => {
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <>
      <div className="menu">
        <div className="logo">
          <Link to={"/"}>
            <img src={LogoColor} className="logo" alt="Logo" />
          </Link>
        </div>
        <div className="navbar">
          <li>
            <Link to={"/"} className="menu-item">
              Home
            </Link>
          </li>
          {/*<li>
                        <Link to={"/login"} className="menu-item">Login</Link>
                    </li>
                    <li>
                        <Link to={"/register"} className="menu-item">Register</Link>
                    </li>*/}
        </div>
        <div className="menu-icon">
          <div>
            <div className={`search ${isSearch ? "active" : ""}`}>
              <input type="search" placeholder="Tìm kiếm....." />
            </div>
            <Link to={"#"} className="menu-item" onClick={openSearch}>
              <IoSearchSharp />
            </Link>
          </div>
          <div className="info-main">
            {Email ? (
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  profile
                </button>
                <ul class="dropdown-menu">
                  <li>{Email}</li>
                  <li>
                    <Link class="btn" to={"/userProfile"}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button class="btn" onClick={Logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to={"/login"} className="menu-item">
                <FaUser />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
