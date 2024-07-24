import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Sidebar.scss";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../stores/reducers/authSlice";
import { logoutAuth } from "../services/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faFeather, faChartBar, faUser } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    const menuItem = [
        {
            path: "/admin/dashboard",
            name: "Dashboard",
            icon: <FontAwesomeIcon icon={faChartBar} />,
        },
        {
            path: "/admin/books",
            name: "Books",
            icon: <FontAwesomeIcon icon={faBookOpen} />
        },
        {
            path: "/admin/users",
            name: "Users",
            icon: <FontAwesomeIcon icon={faUser} />
        },
        {
            path: "/admin/authors",
            name: "Authors",
            icon: <FontAwesomeIcon icon={faFeather} />,
        },
        {
            path: "/admin/genres",
            name: "Genres",
            icon: <FontAwesomeIcon icon={faBookOpen} />,
        },
        {
            path: "/admin/orders",
            name: "Orders",
            icon: <FontAwesomeIcon icon={faBookOpen} />,
        },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutAuth();
            dispatch(logout());
            navigate('/auth')
        } catch (error) {
            console.error('Login failed', error);
        }
    }
    return (
        <div className="sidebar">
            <div className="top-section">
                <div className="title-logo">Book Store</div>
            </div>
            {menuItem.map((item, index) => (
                <Fragment key={index}>
                    <NavLink
                        to={item.path}
                        className="link align-self-sm-baseline"
                        activeclassname="active"
                    >
                        <div className="icon">{item.icon} </div>
                        <div className="link_text">{item.name}</div>
                    </NavLink>
                </Fragment>
            ))}
            <div className="logout-btn col-footer">
                <button onClick={handleLogout} >Logout</button>
            </div>
        </div>
    );
};
export default Sidebar;
