import React, { useEffect, useState } from 'react';
import '../../styles/table/BookPage.scss';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import { getOrder } from '../../services/OrderManage';

const OrderPage = () => {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limitPage, setLimitPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getOrder({ page: currentPage, limit: limitPage });
                setOrder(response.data);
                setTotalPages(response.data.last_page);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchBooks(currentPage, limitPage);
    }, [currentPage, limitPage]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading users: {error.message}</div>;
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleLimitChange = (limit) => {
        setLimitPage(limit);
    };

    return (
        <div className="book-page">
            <h1>Order</h1>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onLimitPageChange={handleLimitChange}
                limitPage={limitPage}
            />
            <div className="table-book-container mt-3 mx-1">
                <table className="book-table text-center">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Customer</th>
                            <th>Order date</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order && order.data.map((order, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to={`/admin/orders/${order.order_id}`} state={{ order }} className='link'>{order.order_id}</Link>
                                </td>
                                <td>{order.user.fullname}</td>
                                <td>{order.order_date}</td>
                                <td>{order.total_amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderPage;
