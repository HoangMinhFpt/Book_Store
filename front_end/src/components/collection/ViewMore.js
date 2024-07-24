import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../../styles/components/collection/ViewMore.scss";
import { useTranslation } from "react-i18next";

function ViewMore(props) {
    const { t } = useTranslation()
    return (
        <div className="view-more-container">
            <Link to={props.redirect} className="view-more-content">
                <div className="text-view-more">
                    {t('title.view_more')}
                    <FontAwesomeIcon icon={faAnglesRight} />
                </div>
            </Link>
        </div>
    );
}
export default ViewMore;
