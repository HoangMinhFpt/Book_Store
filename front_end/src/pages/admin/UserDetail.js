import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../styles/page/BookDetail.scss';
import { getReviewByUser } from '../../services/ReviewManage';
import { getOrderByUser } from '../../services/OrderManage';
const UserDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate()
    const user = location.state?.user
    const [review, setReview] = useState([]);
    const [order, setOrder] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        const fetchReviewBook = async () => {
            try {
                const response = await getReviewByUser(id);
                setReview(response.data)
            } catch (error) {
                setError(error)
            }
        }

        const fetchOrder = async () => {
            try {
                const response = await getOrderByUser(id)
                setOrder(response.data);
                setLoading(false);
            } catch (error) {
                setError(error)
                setLoading(false);
            }
        }

        fetchReviewBook();
        fetchOrder();
    }, [id])

    if (loading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Error loading books: {error.message}</div>;
    }

    return (
        <div className="book-detail-page">
            <h1>User detail</h1>
            <div className="book-detail-container">
                <div className="book-detail-content">
                    <div className="detail-book">
                        <p>
                            <label> Fullname:</label>
                            {user.fullname}
                        </p>
                        <p>
                            <label> Email:</label>
                            {user.email}
                        </p>
                        <p>
                            <label> Email:</label>
                            {user.email}
                        </p>
                        <p>
                            <label> Address:</label>
                            {user.address}
                        </p>
                        <p>
                            <label> Phone number:</label>
                            {user.phone_number}
                        </p>
                    </div>
                </div>
                <div className="feeback-book">
                    <h2>Order list</h2>
                    <div className="table table-book-container mt-3 mx-1">
                        <table className="book-table text-center">
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Order date</th>
                                    <th>Total_amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order && order.map((order, index) => (
                                    <tr key={index}>
                                        <td className='col-2'>
                                            <Link to={`/admin/orders/${order.order_id}`} state={{ order }} className='link'>{index + 1}</Link>
                                        </td>
                                        <td className='col-2'>{order.order_date}</td>
                                        <td className='col-1'>{order.total_amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                                    <th>Review book</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {review && review.map((review, index) => (
                                    <tr key={index}>
                                        <td className='col-2'>{review.review_text}</td>
                                        <td className='col-1'>{review.review_date}</td>
                                        <td className='col-1'>{review.book.title}</td>
                                        <td className='col-2 '>{review.rating}</td>
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

export default UserDetail;