import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../stores/reducers/themeSlice';
import '../../styles/components/toggle/ThemeToggle.scss';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme)
    return (
        <div className="theme-toggle">
            <button className='btn-theme' onClick={() => dispatch(toggleTheme())} >
                <FontAwesomeIcon icon={theme === 'light-theme' ? faSun : faMoon} />
            </button>
        </div>
    );
};

export default ThemeToggle;
