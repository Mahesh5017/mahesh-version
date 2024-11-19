import React from "react";
import {Devices,Dashboard} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useUser} from "../Context/UserContext";

function NavBar() {

    const navigate = useNavigate();
    const {user} = useUser();

    const handleDashboard = () => navigate("/dashboard");
    const handleDevices = () => navigate("/devices");
    const handleSettings = () => navigate("/settings");
    const handlelogout = () => navigate("/");
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary text-white px-4 py-2 shadow-sm mb-0 ">
            <h3 style={{ color: "black" }}>KMIT</h3>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto" style={{ cursor: "pointer" }}>
                    <li className="nav-item me-3">
                        <span className="nav-link fs-6" onClick={handleDashboard}>
                            <Dashboard fontSize="small" /> Dashboard
                        </span>
                    </li>
                    <li className="nav-item me-3" onClick={handleDevices}>
                        <span className="nav-link fs-6">
                            <Devices fontSize="small" /> Devices
                        </span>
                    </li>
                    <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle fs-6" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {user.username}
                        </span>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><span className="dropdown-item fs-6" onClick={handleSettings}>Settings</span></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><span className="dropdown-item fs-6" onClick={handlelogout}>Logout</span></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
