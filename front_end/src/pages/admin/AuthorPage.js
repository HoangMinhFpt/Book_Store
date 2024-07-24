import React, { useEffect, useState } from 'react';
import '../../styles/table/BookPage.scss';
import { getAllAuthor, getAuthor } from '../../services/AuthorManage';
import { Link } from 'react-router-dom';

const AuthorPage = () => {
    const [author, setAuthor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getAuthor({ page, limit });
                setAuthor(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchBooks();
    }, [page, limit]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading authors: {error.message}</div>;
    }

    return (
        <div className="book-page">
            <h1>Authors</h1>
            <div className="table-book-container mt-3 mx-1">
                <table className="book-table text-center">
                    <thead>
                        <tr>
                            <th>Author's name</th>
                            <th>Biography</th>
                        </tr>
                    </thead>
                    <tbody>
                        {author && author.data.map((author, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to={`/admin/authors/${author.author_id}`} state={{ author }} className='link'>{author.author_name}</Link>
                                </td>
                                <td>{author.biography}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuthorPage;
