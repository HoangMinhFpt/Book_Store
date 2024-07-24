import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../styles/page/BookDetail.scss';
import { getBookAuthor } from '../../services/BookMange';
const AuthorDetail = () => {
    const { id } = useParams();
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate()
    const author = location.state?.author

    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBookAuthor(id);
                setBooks(response.data);
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        fetchBooks()
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading books: {error.message}</div>;
    }

    return (
        <div className="book-detail-page">
            <h1>Book detail</h1>
            <div className="book-detail-container">
                <div className="book-detail-content">
                    <div className="detail-book">
                        <p>
                            <label> Author:</label>
                            {author.author_name}
                        </p>
                        <p>
                            <label> Biography:</label>
                            {author.biography}
                        </p>
                    </div>
                </div>
                <div className="feeback-book">
                    <h2>Book's list</h2>
                    <div className="table table-book-container mt-3 mx-1">
                        <table className="book-table text-center">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Biography</th>
                                    <th>Published Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books && books.map((book, index) => (
                                    <tr key={index}>
                                        <td className='col-2'>
                                            <Link to={`/admin/books/${book.book_id}`} state={{ book }} className='link'>{book.title}</Link>
                                        </td>
                                        <td className='col-2'>{book.biography}</td>
                                        <td className='col-1'>{book.published_date}</td>
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

export default AuthorDetail;