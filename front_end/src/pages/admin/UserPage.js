import React, { useEffect, useState } from 'react';
import '../../styles/table/BookPage.scss';
import { getUsers } from '../../services/UserManage';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';

const UserPage = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limitPage, setLimitPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getUsers({ page: currentPage, limit: limitPage });
                setUser(response.data);
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
            <h1>Users</h1>
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
                            <th>Fullname</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user && user.data.map((user, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to={`/admin/users/${user.id}`} state={{ user }} className='link'>{user.fullname}</Link>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.role_name} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserPage;
