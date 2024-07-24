import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../styles/page/BookDetail.scss';
import { getOrderDetailByOrder } from '../../services/OrderManage';
const OrderDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate()
    const order = location.state?.order
    const [orderDetail, setOrderDetail] = useState([]);
    const [error, setError] = useState(null);

    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await getOrderDetailByOrder(id);
                setOrderDetail(response.data)
            } catch (error) {
                setError(error)
            }
        }
        fetchOrderDetail();
    }, [id])

    if (error) {
        return <div>Error loading books: {error.message}</div>;
    }

    return (
        <div className="book-detail-page">
            <h1>Order detail</h1>
            <div className="book-detail-container">
                <div className="book-detail-content">
                    <div className="detail-book">
                        <p>
                            <label> Fullname:</label>
                            {order.user.fullname}
                        </p>
                        <p>
                            <label> Email:</label>
                            {order.user.email}
                        </p>
                        <p>
                            <label> Address:</label>
                            {order.user.address}
                        </p>
                        <p>
                            <label> Phone number:</label>
                            {order.user.phone_number}
                        </p>
                        <p>
                            <label> Order Date:</label>
                            {order.order_date}
                        </p>
                    </div>
                </div>
                <div className="feeback-book">
                    <div className="table table-book-container mt-3 mx-1">
                        <table className="book-table text-center">
                            <thead>
                                <tr>
                                    <th>Book</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetail && orderDetail.map((order, index) => (
                                    <tr key={index}>
                                        <td className='col-2'>
                                            {/* <Link to={`/admin/order/${order.order_id}`} state={{ order }} className='link'>{index}</Link> */}
                                            {order.book.map((book) => book.title)}
                                        </td>
                                        <td className='col-2'>{order.quantity}</td>
                                        <td className='col-2'>{order.price}</td>
                                        <td className='col-1'>{order.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <div className="feeback-book">
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
                    </div> */}
            </div>
            <div className="btn-book">
                <button className="btn-back" onClick={handleBack}>Back</button>
            </div>
        </div>
    )
}

export default OrderDetail;