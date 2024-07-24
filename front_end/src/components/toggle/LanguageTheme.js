import { useDispatch, useSelector } from "react-redux"
import "../../styles/components/toggle/LanguageTheme.scss"
import { setLanguage } from "../../stores/reducers/languageSlice";
import i18n from "../../utils/i18n";

const LanguageTheme = () => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.language.language)

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        dispatch(setLanguage(selectedLanguage));
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <div className="select-language-container">

            <select className="select-language" value={language} onChange={handleLanguageChange}>
                <option value="en">EN</option>
                <option value="vi">VI</option>
            </select>
        </div>
    )
}

export default LanguageTheme