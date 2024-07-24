import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviewByBook } from "../../../services/ReviewManage";
import "../../../styles/components/card/book/CardList.scss";
import StarRating from "../../StarRating";

function CardList({ data, onAddToCart, onAddToWishlist }) {
    const book = data;
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

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
    //     (product.originPrice * product.discountPercentage) / 100;
    // const price = product.originPrice - discountPrice;
    return (
        <div className="card-container">
            <div className="card" >
                <div className="row g-0">
                    <Link to={`/book/${book.book_id}`} className="row col-md-9">
                        <div className="left-content col-md-3">
                            <img src={`${book.image}`} className="img-fluid" alt="..." />
                        </div>
                        <div className="center-content col-md-9">
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <StarRating rating={review} />
                                <p className="text-biography">{book.biography} </p>
                            </div>
                        </div>
                    </Link>
                    <div className="right-content col-md-3">
                        <div className="price-item">
                            <span className="fw-bold h4">{formatter.format(book.price)}</span>
                            {/* {product.originPrice > 0 && (
                                <del className="small ms-2">
                                {formatter.format(product.originPrice)}
                                </del>
                                )}
                                {(product.discountPercentage > 0 ||
                                product.discountPrice > 0) && (
                                    <span className={`rounded p-1 bg-warning ms-2 small`}>
                                    -{product.discountPercentage + "%"}
                                    </span>
                                    )} */}
                        </div>
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-cart" onClick={onAddToCart}>
                                <FontAwesomeIcon icon={faCartPlus} />
                            </button>
                            <button type="button" className="btn btn-sm btn-wishlist" onClick={onAddToWishlist}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>
                    </div>
                </div>
                {/* </button> */}
            </div>
        </div>
    );
}

export default CardList;
