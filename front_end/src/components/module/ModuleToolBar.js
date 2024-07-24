import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList } from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/module/ModuleToolbar.scss";
import PropTypes from 'prop-types';

const ModuleToolBar = ({ gripBook, listBook, onChangeListBook, onItemsPerPageChange, itemsPerPage, currentPage, fromItem, toItem, totalItem, sortBook, onSortBook }) => {
    const handleGrip = () => {
        onChangeListBook(true, false)
    }
    const handleList = () => {
        onChangeListBook(false, true)
    }

    const handleItemsPerPageChange = (e) => {
        onItemsPerPageChange(Number(e.target.value));
    };

    const handleSortBook = (e) => {
        onSortBook(Number(e.target.value))
    }

    return (
        <div className="module-toolbar-container">
            <div className="module-toolbar-content-left">
                <div className="title-sort">sort by</div>
                <select className="form-select" value={sortBook} onChange={handleSortBook}>
                    <option value="1" default>best selling</option>
                    <option value="2">price, low to high</option>
                    <option value="3">price, high to low</option>
                </select>
            </div>
            <div className="module-toolbar-content-center">
                <div className="text-paging">Showing {fromItem} to {toItem} of {totalItem} items</div>
                <div className="title-show">show</div>
                <select className="form-select" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value="6" default>6</option>
                    <option value="9">9</option>
                    <option value="21">21</option>
                </select>
            </div>
            <div className="module-toolbar-content-right">
                <div className="btn-group">
                    <button
                        type="button"
                        onClick={handleGrip}
                        className={gripBook ? "btn-grip active" : "btn-grip"}
                        disabled={gripBook}
                    >
                        <FontAwesomeIcon icon={faGrip} />
                    </button>
                    <button
                        onClick={handleList}
                        type="button"
                        className={listBook ? "btn-list active" : "btn-list"}
                        disabled={listBook}
                    >
                        <FontAwesomeIcon icon={faList} />
                    </button>
                </div>

            </div>
        </div>
    );
}

ModuleToolBar.prototype = {
    gripBook: PropTypes.bool.isRequired,
    listBook: PropTypes.bool.isRequired,
    onChangeListBook: PropTypes.func.isRequired,
    onItemsPerPageChange: PropTypes.func.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    fromItem: PropTypes.number.isRequired,
    toItem: PropTypes.number.isRequired,
    totalItem: PropTypes.number.isRequired,
    sortBook: PropTypes.number.isRequired,
    onSortBook: PropTypes.func.isRequired
}

export default ModuleToolBar;
