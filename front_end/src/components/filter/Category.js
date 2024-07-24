import { useState } from "react";
import "../../styles/components/filter/Category.scss";

function Category(props) {

    const handleChangeStatus = (id) => {
        props.onFilterChange(id, document.getElementById(id).checked);

    };

    return (
        <div className="category-container">
            <div className="card mb-3 accordion">
                <div
                    className="card-header fw-bold accordion-icon-button"
                    data-bs-toggle="collapse"
                    data-bs-target="#filterCategory"
                    aria-expanded="true"
                    aria-controls="filterCategory"
                >
                    {props.title}
                </div>
                <ul className="list-group list-group-flush show" id="filterCategory">
                    {props.data &&
                        props.data.map((item, index) => {
                            return (
                                <li className="list-group-item" key={index}>
                                    <input
                                        className="form-check-input stretched-link"
                                        type="checkbox"
                                        id={item.author_id ?? item.genre_id}
                                        onClick={() => {
                                            handleChangeStatus(item.author_id ?? item.genre_id);
                                        }}
                                    />

                                    {item.author_name ?? item.genre_name}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}

export default Category;
