import { useState } from "react";
import "../../styles/components/filter/Price.scss";

function Price(props) {
    const [statusType, setStatusType] = useState();

    const handleChangeStatus = (id) => {
        setStatusType({
            ...statusType,
            [id]: document.getElementById(id).checked ? 1 : 0,
        });
    };

    return (
        <div className="price-container">
            <div className="card mb-3 accordion">
                <div
                    className="card-header fw-bold accordion-icon-button"
                    data-bs-toggle="collapse"
                    data-bs-target="#filterPrice"
                    aria-expanded="true"
                    aria-controls="filterPrice"
                >
                    price
                </div>
                <ul className="list-group list-group-flush show" id="filterPrice">
                    {props.data &&
                        props.data.map((item, index) => {
                            return (
                                <li className="list-group-item" key={index}>
                                    <input
                                        className="form-check-input stretched-link"
                                        type="checkbox"
                                        id={item.id}
                                        onClick={() => {
                                            handleChangeStatus(item.id);
                                        }}
                                        style={{ backgroundColor: `${item.name}` }}
                                    />
                                    {item.from}-{item.to}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}

export default Price;
