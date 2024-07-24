import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/components/module/ModuleTitle.scss";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function ModuleTitle({ title }) {
    const { t } = useTranslation()
    return (
        <div className="module-title-container">
            <span className="module-title-content">
                <FontAwesomeIcon icon={faStar} className="icon-star" />
                {t([`module.${title}`, 'module.our_product'])}
                <FontAwesomeIcon icon={faStar} className="icon-star" />
            </span>
        </div>
    );
}

export default ModuleTitle;
