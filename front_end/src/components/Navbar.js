import { Link, useMatch, useResolvedPath } from "react-router-dom";
import '../styles/components/Navbar.scss'
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function Navbar() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleMouseEnter = () => {
        setDropdownVisible(true)
    }
    const handleMouseLeave = () => {
        setDropdownVisible(false)
    }

    const { t } = useTranslation()

    return (
        <button className="navbar-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            Menu
            <FontAwesomeIcon icon={faBars} className="icon-menu" />
            {isDropdownVisible && (
                <ul className="dropdown-menu title">
                    <CustomLink to="/book">{t('title.book')} </CustomLink>
                    <CustomLink to="/author">{t('title.author')}</CustomLink>
                    <CustomLink to="/genre">{t('title.genre')}</CustomLink>
                </ul>
            )}
        </button>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to}{...props} >{children}</Link>
        </li>
    )
}

export default Navbar;
