import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../styles/page/BookDetail.scss';
import { getReviewByBook } from '../../services/ReviewManage';
import StarRating from '../../components/StarRating';
const BookDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate()
    const [review, setReview] = useState([]);
    const [error, setError] = useState(null);
    const book = location.state?.book

    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        const fetchReviewBook = async () => {
            try {
                const response = await getReviewByBook(id);
                setReview(response.data)
            } catch (error) {
                setError(error)
            }
        }
        fetchReviewBook()
    }, [id])

    if (error) {
        return <div>Error loading books: {error.message}</div>;
    }
    console.log(review);
    return (
        <div className="book-detail-page">
            <h1>Book detail</h1>
            <div className="book-detail-container">
                <div className="book-detail-content">
                    <div className="img-book">
                        <img src={`${book.image}`} alt="book" />
                    </div>
                    <div className="detail-book">
                        <h2>{book.title}</h2>
                        <p>
                            <label> Author:</label>
                            {book.author.author_name}
                        </p>
                        <p>
                            <label> Genre:</label>
                            {book.genre.genre_name}
                        </p>
                        <p>
                            <label> Price:</label>
                            {book.price}
                        </p>
                        <p>
                            <label> Description:</label>
                            {book.description}
                        </p>
                        <p>
                            <label> Published Date:</label>
                            {book.published_date}
                        </p>
                        <p>
                            <label> Stock Quantity:</label>
                            {book.stock_quantity}
                        </p>
                        <p>
                            <label> Biography:</label>
                            {book.biography}
                        </p>
                        <p>
                            <label> Rating:</label>
                            <StarRating rating={review} />
                        </p>
                    </div>
                </div>
                <div className="feeback-book">
                    <h2>Review</h2>
                    <div className="table table-book-container mt-3 mx-1">
                        <table className="book-table text-center">
                            <thead>
                                <tr>
                                    <th>Review message</th>
                                    <th>Review date</th>
                                    <th>User review</th>
                                    <th>Rating</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {review && review.map((review, index) => (
                                    <tr key={index}>
                                        <td className='col-2'>{review.review_text}</td>
                                        <td className='col-1'>{review.review_date}</td>
                                        <td className='col-1'>{review.user.fullname}</td>
                                        <td className='col-2 '>{review.rating}</td>
                                        <td className='col-2'>
                                            <div className="btn-group">
                                                <button className="btn btn-edit" >
                                                    Edit</button>
                                                <button className="btn btn-delete">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="btn-book">
                    <button className="btn-back" onClick={handleBack}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default BookDetail;