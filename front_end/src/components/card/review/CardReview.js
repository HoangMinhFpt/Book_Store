import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

const CardReview = (props) => {
    const review = props.data;

    return (
        <Fragment>
            <div>
                {review.user.fullname}
            </div>
            {review.rating > 0 &&
                Array.from({ length: 5 }, (_, key) => {
                    if (key < review.rating)
                        return <FontAwesomeIcon icon={faStar} key={key} className="text-warning me-1" />;
                    else
                        return (
                            <FontAwesomeIcon
                                icon={faStar}
                                className="text-secondary me-1"
                                key={key}
                            />
                        );
                })}
            <p>
                {review.review_text}
            </p>
            <span>
                {review.review_date}
            </span>
            <hr />
        </Fragment>
    )
}

export default CardReview