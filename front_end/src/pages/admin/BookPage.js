import React, { useEffect, useState } from 'react';
import { createBook, deleteBook, editBook, getBooks } from '../../services/BookMange';
import Pagination from '../../components/Pagination';
import CreateBookModal from '../../components/modal/CreateBookModal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import '../../styles/table/BookPage.scss';

const BookPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limitPage, setLimitPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    const fetchBooks = async (page, limit) => {
        try {
            const response = await getBooks({ page, limit });
            setBooks(response.data.data);
            setTotalPages(response.data.last_page);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks(currentPage, limitPage);
    }, [currentPage, limitPage]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading books: {error.message}</div>;
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleLimitChange = (limit) => {
        setLimitPage(limit);
        setCurrentPage(1);
    };

    const openModal = () => {
        setIsOpenModal(true);
        setEditingBook(null);
    };

    const toggleModal = () => {
        setIsOpenModal(prevState => !prevState);
        setEditingBook(null);
    };

    const handleCreateBook = async (book) => {
        toast.promise(createBook(book), {
            pending: 'Processing your request...',
            success: 'Create new book successfully!',
            error: 'Create failed. Please try again.'
        }).then(() => {
            setIsOpenModal(false);
            fetchBooks(currentPage, limitPage);
        }).catch((error) => {
            console.error('Create book error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                console.log('Validation errors:', error.response.data.errors);
                console.log('Create book failed:', JSON.stringify(error.response.data.errors));
            } else {
                toast.error('Create failed. Please try again.')
            }
        })
    }

    const openEditModal = (book) => {
        setIsOpenModal(true);
        setEditingBook(book);
    };

    const handleEditBook = async (book) => {
        toast.promise(editBook(book.book_id, book), {
            pending: 'Processing your request...',
            success: 'Edit a book successfully!',
            error: 'Edit failed. Please try again.'
        }).then(() => {
            setIsOpenModal(false);
            setEditingBook(null);
            fetchBooks(currentPage, limitPage);
        }).catch((error) => {
            console.error('Edit a book error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                console.log('Validation errors:', error.response.data.errors);
                console.log('Edit a book failed:', JSON.stringify(error.response.data.errors));
            } else {
                toast.error('Edit failed. Please try again.')
            }
        })
    }

    const handleDeleteBook = async (book) => {

        toast.promise(deleteBook(book.book_id), {
            pending: 'Processing your request...',
            success: 'Delete a book successfully!',
            error: 'Delete failed. Please try again.'
        }).then(() => {
            const newBooks = books.filter((b) => b.book_id !== book.book_id);
            if (newBooks.length === 0 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                setBooks(newBooks);
                fetchBooks(currentPage, limitPage);
            }
        }).catch((error) => {
            console.error('Delete a book error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                console.log('Validation errors:', error.response.data.errors);
                console.log('Delete a book failed:', JSON.stringify(error.response.data.errors));
            } else {
                toast.error('Delete failed. Please try again.')
            }
        })
    }

    return (
        <div className="book-page">
            <h1>Books</h1>
            <CreateBookModal isOpen={isOpenModal} toggleModal={toggleModal} onCreate={handleCreateBook} onEdit={handleEditBook} book={editingBook} />
            <div className="book-item">
                <div className='create-book'>
                    <Button className="btn-create" onClick={() => openModal()}>
                        Create new book
                    </Button>
                </div>
                <div className="book-content-right">
                    <div className="book-search">
                        <label >Search: </label>
                        <input type="text" className="input-search" />
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        limitPage={limitPage}
                        onLimitPageChange={handleLimitChange}
                    />
                </div>

            </div>
            <div className="table-book-container mt-3 mx-1">
                <table className="book-table text-center">
                    <thead>
                        <tr>
                            <th className="col-fixed-width-2">Title</th>
                            <th className="col-fixed-width-1">Author</th>
                            <th className="col-fixed-width-1">Genre</th>
                            <th className="col-fixed-width-1">Price</th>
                            <th className="col-fixed-width-1">Image</th>
                            <th className="col-fixed-width-1">Stock Quantity</th>
                            <th className="col-fixed-width-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books && books.map((book, index) => (
                            <tr key={index}>
                                <td className='col-3'>
                                    <Link to={`/admin/books/${book.book_id}`} state={{ book }} className='link'>{book.title}</Link>
                                </td>
                                <td className='col-2'>{book.author.author_name}</td>
                                <td className='col-1'>{book.genre.genre_name}</td>
                                <td className='col-1'>{book.price}</td>
                                <td className='col-2 image_item'><img src={`${book.image}`} alt={book.title} className="card-img-top" /></td>
                                <td className='col-1'>
                                    {book.stock_quantity}</td>
                                <td className='col-2'>
                                    <div className="btn-group">
                                        <button className="btn btn-edit" onClick={() => openEditModal(book)}>
                                            Edit</button>
                                        <button className="btn btn-delete" onClick={() => handleDeleteBook(book)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookPage;
