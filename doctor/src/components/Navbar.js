import React, { useState } from "react";
import "./nav.css";
import "../navbar1.css";
import mainlogo from "../logo3.png";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./Home";
import Blog1 from "./Blog1";
// import Form from "./Form";
import Login from "./Login";
import Signin from "./Signin";
import Signup from "./Signup";
import Appointment from "./Appointment";
import Your_Appoint from "./Your_Appoint";
import Main from "../Doctor/Main";
// import axios from "axios";
function Navbar() {
  const location=useLocation()
  const [isopen, setisopen] = useState(false);
  const navigate=useNavigate()
  const toggle = () => {
    setisopen(!isopen);
  };
  const logOut = async () => {

    try {
      let result = await fetch("http://localhost:8000/api/users/logout/", {
        method: "post",
        body: JSON.stringify({email:localStorage.getItem("email")}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.error) {
        console.error(result.error);
      }
      else if(result.message){
        console.log(result.message);
        localStorage.clear();
        navigate("/");
        // window.location.reload();
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  
  return (
    <div>
      {/* <Router> */}
        {localStorage.getItem("is_doctor") ? (
          (
            <Main />
          )
        ) : (
          <nav>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
              <i className="fa-solid fa-bars"></i>
            </label>
            <label className="logo">
              <Link to="/">
              <img src={mainlogo} alt="logo" style={{ height: "40px" }} />
              </Link>
            </label>
            <ul>
              <li>
                <Link to="/" className="remove text-white">
                  Home
                </Link>
              </li>
              {location.pathname==='/'?(
                <>
              <li>
                <a href="#about" className="remove text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="remove text-white">
                  Contact us
                </a>
              </li></>):('')}
              <li>
                {!localStorage.getItem("swapIcons") ? (
                  <Link to="/appointment" className="remove text-white">
                    Appointment
                  </Link>
                ) : (
                  <div class="dropdown">
                    <a
                      class="dropdown-toggle text-white"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Appointment
                    </a>

                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <Link
                          to="/appointment"
                          className="dropdown-item bg-theme"
                        >
                          Book Appointment
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/yourAppoint"
                          className="dropdown-item bg-theme"
                        >
                          Your Appointments
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Link to="/blog" className="remove text-white">
                  Blog
                </Link>
              </li>
              <li>
                {localStorage.getItem("swapIcons") ? (
                  <div onClick={toggle}>
                    <i className="fa-regular fa-user userIcon"></i>
                  </div>
                ) : (
                  <Link to="/login" className="button">
                    Signin
                  </Link>
                )}
              </li>
            </ul>
            {localStorage.getItem("swapIcons") && (
              <ul className={`menu-nav ${isopen ? " show-menu" : ""}`}>
                <div className="items">
                  <div className="profilephoto">
                    <img src={mainlogo} alt="" />
                  </div>
                  <hr />
                  <p>Email: {localStorage.getItem("email")}</p>
                  <hr style={{ color: "black" }} />

                  <Link to="/" onClick={logOut}>
                    <p>
                      Logout <i className="fa-solid fa-right-from-bracket"></i>
                    </p>
                  </Link>
                </div>
              </ul>
            )}
          </nav>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blog" element={<Blog1 />} />
          <Route
            path="appointment"
            element={
              localStorage.getItem("swapIcons") ? <Appointment /> : <Login />
            }
          />
          <Route path="yourAppoint" element={<Your_Appoint />} />
          <Route path="login" element={<Outlet />}>
            <Route index element={<Login />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
        {/* </Router> */}
    </div>

  );
}

export default Navbar;
