import { useState } from "react";
import "../../styles/components/filter/Review.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Review(props) {
    const [statusType, setStatusType] = useState();

    const handleChangeStatus = (id) => {
        setStatusType({
            ...statusType,
            [id]: document.getElementById(id).checked ? 1 : 0,
        });
    };

    return (
        <div className="review-start-container">
            <div className="card mb-3 accordion">
                <div
                    className="card-header fw-bold accordion-icon-button"
                    data-bs-toggle="collapse"
                    data-bs-target="#filterReview"
                    aria-expanded="true"
                    aria-controls="filterReview"
                >
                    review
                </div>
                <ul className="list-group list-group-flush show" id="filterReview">
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
                                    />
                                    {item.start > 0 &&
                                        Array.from({ length: 5 }, (_, key) => {
                                            if (key < item.start)
                                                return (
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                        key={key}
                                                        className="text-warning"
                                                    />
                                                );
                                        })}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}

export default Review;
