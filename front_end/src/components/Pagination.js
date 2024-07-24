import React from 'react';
import PropTypes from 'prop-types';
import '../styles/table/Pagination.scss';

const Pagination = ({ limitPage, onLimitPageChange, currentPage, totalPages, onPageChange }) => {
    const handleClick = (page) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        return Array.from({ length: totalPages }, (_, index) => (
            <button
                key={index}
                onClick={() => handleClick(index + 1)}
                disabled={currentPage === index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
            >
                {index + 1}
            </button>
        ));
    };

    return (
        <div className="pagination-container">
            <div className="limit-item">
                <label htmlFor="limit-select">Limit: </label>
                <select id="limit-select" value={limitPage} onChange={(e) => onLimitPageChange(Number(e.target.value))}>
                    <option value="5" default>5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
            <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

Pagination.propTypes = {
    limitPage: PropTypes.number.isRequired,
    onLimitPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
