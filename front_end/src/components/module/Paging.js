import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/table/Pagination.scss';

const Paging = ({ currentPage, totalPages, onPageChange }) => {
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

Paging.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Paging;
