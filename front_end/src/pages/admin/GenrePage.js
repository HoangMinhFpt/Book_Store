import React, { useEffect, useState } from 'react';
import '../../styles/table/BookPage.scss';
import { getGenre } from '../../services/GenreManage';
import { getBookGenre } from '../../services/BookMange';
import { Link } from 'react-router-dom';

const GenrePage = () => {
    const [genre, setGenre] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [error, setError] = useState(null);

    const handleGetBook = async (id) => {
        try {
            const response = await getBookGenre(id);
            setBooks(response.data);
            // setLoading(false);
        } catch (error) {
            setError(error);
            // setLoading(false);
        }
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await getGenre({ page, limit });
                setGenre(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchGenres();
    }, [page, limit]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading Genres: {error.message}</div>;
    }



    return (
        <div className="book-page">
            <h1>Genres</h1>
            <div className="table-book-container mt-3 mx-1">
                <table className="book-table text-center">
                    <thead>
                        <tr>
                            <th>Genre's name</th>
                            <th>Biography</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genre && genre.data.map((genre, index) => (
                            <tr key={index}>
                                <td><Link onClick={() => handleGetBook(genre.genre_id)}>
                                    {genre.genre_name}
                                </Link></td>
                                <td>{genre.biography}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="feeback-book" >
                <h1>Books</h1>
                <div className="table-book-container mt-3 mx-1">
                    <table className="book-table text-center">
                        <thead>
                            <tr>
                                <th>Ttile</th>
                                <th>Author</th>
                                <th>Published Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books && books.map((book, index) => (
                                <tr key={index}>
                                    <td>
                                        {book.title}
                                    </td>
                                    <td>{book.author.author_name}</td>
                                    <td>{book.published_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GenrePage;
