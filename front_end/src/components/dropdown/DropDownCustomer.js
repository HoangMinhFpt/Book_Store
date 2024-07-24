import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightFromBracket,
    faIdBadge,
    faListCheck,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/dropdown/DropDownCustomer.scss";
import { Link, useNavigate } from "react-router-dom";
import { logoutAuth } from "../../services/Auth";
import { logout } from "../../stores/reducers/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function DropDownCustomer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isActive, setIsActive] = useState(false);

    const handleLogout = async () => {
        try {
            await logoutAuth();
            dispatch(logout());
            navigate('/auth')
        } catch (error) {
            console.error('Login failed', error);
        }
    }

    const toggleDropdown = (event) => {
        setIsActive(!isActive);
        event.stopPropagation(); // Prevent the click event from bubbling up
    };

    const closeDropdown = () => {
        setIsActive(false);
    };

    document.addEventListener('click', closeDropdown);
    return (
        <div className="dropdown-customer-container">
            <button
                className="menu-button"
                type="button"
                onClick={toggleDropdown}
            >
                <FontAwesomeIcon icon={faUser} style={{ color: "##22232b" }} />
            </button>
            <ul className={`title dropdown-content ${isActive ? 'active' : ''}`}>
                <li>
                    <Link className="dropdown-item" to="/profile">
                        <FontAwesomeIcon icon={faIdBadge} className="text-info" />
                        &nbsp; {t('user.profile')}
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="/wishlist">
                        <FontAwesomeIcon icon={faListCheck} className="text-success" />
                        &nbsp; {t('user.wishlist')}
                    </Link>
                </li>
                <hr className="dropdown-divider" />
                <li>
                    <Link className="dropdown-item" onClick={handleLogout}>
                        <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            className="text-danger"
                        />
                        &nbsp; {t('user.logout')}
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default DropDownCustomer;
