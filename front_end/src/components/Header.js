import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import DropDownCustomer from "./dropdown/DropDownCustomer";
import ThemeToggle from "./toggle/ThemeToggle";
import '../styles/components/Header.scss'
import LanguageTheme from "./toggle/LanguageTheme";
import { useTranslation } from "react-i18next";
import SearchInput from "./search/SearchInput";

function Header() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/cart')
    }
    const { t } = useTranslation()

    return (
        <div className="header-container">
            <div className="header-left-content">
                <Link to="/" className="header-title">
                    Logo
                </Link>
            </div>
            <div className="header-center-content">
                <Navbar />
                <SearchInput />
            </div>
            <div className="header-right-content">
                <div className="header-one-content">
                    <button className="btn-cart" onClick={handleClick}>
                        <span className="title">

                            <FontAwesomeIcon icon={faCartPlus} />
                            {t('title.cart')}
                        </span>
                    </button>
                    <DropDownCustomer />
                </div>
                <div className="header-two-content">
                    <ThemeToggle />
                    <LanguageTheme />
                </div>

            </div>
        </div>
    );
}

export default Header;
