import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link,useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Appointment from './Appointment';
import Patients from './Patients';
import './main.scss';
import img from './logo.jpeg'
import {
    FaTh,
} from 'react-icons/fa';
function Main() {
    const navigate= useNavigate()
    const [isOpen, setIsopen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth >= 767); // Initialize state
    const toggle = () => setIsopen(!isOpen); // Function to update the state based on the clicking on the toggler icon
    const updateIsMobile = () => setIsMobile(window.innerWidth >= 767);  // Function to update the state based on the window width

    useEffect(() => { // Add an event listener to update the state when the window is resized
        window.addEventListener('resize', updateIsMobile);
        return () => {
            window.removeEventListener('resize', updateIsMobile); // Clean up the event listener when the component unmounts
        };
    }, []);
    const list = [
        {
            path: "/dashboard",
            name: "DashBoard",
            icon: <FaTh />
        },
        {
            path: "/appointment_1",
            name: "Appointment",
            icon: <i class="fa-regular fa-calendar-check"></i>
        },
        {
            path: "/patients",
            name: "Patients",
            icon: <i class="fa-solid fa-hospital-user"></i>
        }
    ]
    function logout()
    {
        localStorage.clear()
        navigate("/")
        window.location.reload()
    }
    return (
        <>
            {/* <BrowserRouter> */}
                <div className="cont">
                    <div style={{ width: isOpen * isMobile ? "15.625rem" : "3.125rem" }} className="sidebar">
                        <div className="top_section">
                            <img src={img} alt='sorry' className="logo" style={{ display: isOpen * isMobile ? "block" : "none", color: 'white' }}></img>
                            <div style={{ marginLeft: isOpen * isMobile ? "3.125rem" : "0rem" }} className="bars"> <i class={isOpen * isMobile ? "fa-solid fa-angles-left" : "fa-solid fa-angles-right"} onClick={toggle}></i>  </div> {/*  fa-solid fa-list */}
                        </div>
                        {
                            list.map((item, index) => {
                                return (
                                    <Link to={item.path} key={index} className='link' activeclassName='active' >
                                        <div className="icon">{item.icon}</div>
                                        <div className="link_text" style={{ display: isOpen * isMobile ? "block" : "none" }}>{item.name}</div>
                                    </Link>)
                            })
                        }
                        <Link to="/" key="3" className='link logout' activeclassName='active' onClick={logout}>
                            <div className="icon"><i class="fa-solid fa-arrow-right-from-bracket"></i></div>
                            <div className="link_text" style={{ display: isOpen * isMobile ? "block" : "none" }}>Logout</div>
                        </Link>
                    </div>
                    <div className='main1'>
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />}></Route>
                            <Route path="/appointment_1" element={<Appointment />}></Route>
                            <Route path="/patients" element={<Patients />}></Route>
                        </Routes>
                    </div>
                </div>
            {/* </BrowserRouter> */}
        </>
    )
}

export default Main