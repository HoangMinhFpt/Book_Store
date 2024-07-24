import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviewByBook } from "../../../services/ReviewManage";
import "../../../styles/components/card/book/CardGrid.scss";
import StarRating from "../../StarRating";

function CardGrip({ data, onAddToCart, onAddToWishlist }) {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const book = data;
    const [review, setReview] = useState([]);

    useEffect(() => {
        const fetchReviewBook = async () => {
            try {
                const response = await getReviewByBook(book.book_id);
                setReview(response.data)
                // setLoading(false)
            } catch (error) {
                console.log(error);
                // setLoading(false)
            }
        }

        fetchReviewBook()
    }, [book.book_id])

    // const discountPrice =
    //     (book.originPrice * product.discountPercentage) / 100;
    // const price = product.originPrice - discountPrice;
    return (
        <div className="card-grid-container">
            <div className="card">
                <Link to={`/book/${book.book_id}`}>
                    <div className="card-img">
                        <img src={`${book.image}`} className="card-img-top" alt="..." />
                    </div>
                    {/* <div className="label-product label_sale">
                    <span>-{book.discountPercentage + "%"}</span>
                        </div> */}
                    <div className="card-body" to={`/book/${book.book_id}`}>
                        <div className="review-star">
                            <div className="star">
                                <StarRating rating={review} />
                            </div>
                            <div className="review-title">{review.length} review</div>
                        </div>
                        <hr />
                        <h4 className="card-title">{book.title}</h4>
                        <div className="card-text-content">
                            <span className="fs-3">{formatter.format(book.price)} </span>
                            {/* {book.originPrice > 0 && (
                            <del className="small text-muted">
                                {formatter.format(book.originPrice)}
                            </del>
                        )} */}
                        </div>
                    </div>
                </Link>
                <div className="card-footer">
                    <button
                        type="button"
                        className="btn btn-sm btn-cart"
                        title="Add to cart"
                        onClick={onAddToCart}
                    >
                        <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-wishlist"
                        title="Add to wishlist"
                        onClick={onAddToWishlist}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardGrip;
