import React, { Fragment, useEffect, useState } from "react";
import { data } from "../../components/data"
import { getAllAuthor } from "../../services/AuthorManage";
import { getAllGenre } from "../../services/GenreManage";
import { getFilterBooks } from "../../services/BookMange";
import { useDispatch } from "react-redux";
import { addToCart } from "../../stores/reducers/cartSlice";
import { addToWishlist } from "../../stores/reducers/wishlistSlice";
import { useQuery } from "react-query";

import ModuleToolBar from "../../components/module/ModuleToolBar";
import Review from "../../components/filter/Review";
import Paging from "../../components/module/Paging";
import Category from "../../components/filter/Category";
import CardGrip from "../../components/card/book/CardGrip";
import CardList from "../../components/card/book/CardList";
import '../../styles/page/customer/BookPageCus.scss'

const CardPlaceholder = () => (
    <div className="card-placeholder">
        <div className="placeholder-content">Loading...</div>
    </div>
);

const BookPageCus = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [gripBook, setGripBook] = useState(true);
    const [listBook, setListBook] = useState(false);
    const [sortBook, setSortBook] = useState(1)

    const { data: authors, isLoading: authorsLoading } = useQuery('authors', getAllAuthor);
    const { data: genres, isLoading: genresLoading } = useQuery('genres', getAllGenre);
    // const { data: booksData, isLoading: booksLoading } = useQuery(['books', currentPage, itemsPerPage, selectedAuthors, selectedGenres], () => getFilterBooks({ page: currentPage, limit: itemsPerPage, authors: selectedAuthors, genres: selectedGenres }), { keepPreviousData: true });
    const { data: booksData, isLoading: booksLoading } = useQuery(['books', currentPage, itemsPerPage, sortBook], () => getFilterBooks({ page: currentPage, limit: itemsPerPage, sortBook: sortBook }), { keepPreviousData: true });
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);


    const handleChange = (newGripBook, newListBook) => {
        setGripBook(newGripBook);
        setListBook(newListBook);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (items) => {
        setItemsPerPage(items);
        setCurrentPage(1);
    };

    const handleAddToCart = (book, quantity, stock) => {
        dispatch(addToCart({ ...book, quantity, stock }));
    };

    const handleAddToWishlist = (book) => {
        dispatch(addToWishlist({ ...book }))
    }

    const handleSortBook = (items) => {
        setSortBook(items)
        console.log(sortBook);
    }

    // const handleFilterChange = (id, checked) => {
    //     if (authors.data.some(author => author.author_id === id)) {
    //         setSelectedAuthors(prev => checked ? [...prev, id] : prev.filter(authorId => authorId !== id));
    //     } else if (genres.data.some(genre => genre.genre_id === id)) {
    //         setSelectedGenres(prev => checked ? [...prev, id] : prev.filter(genreId => genreId !== id));
    //     }
    // };

    if (authorsLoading || genresLoading) {
        return <div>Loading...</div>;
    }

    const books = booksData ? booksData.data : [];
    const totalPages = booksData ? booksData.data.last_page : 0;
    const totalItem = booksData ? booksData.data.total : 0;
    const fromItem = booksData ? booksData.data.from : 0;
    const toItem = booksData ? booksData.data.to : 0;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12 col-md-3">
                    <Category data={authors.data} title={"Author"} />
                    <Category data={genres.data} title={"Genre"} />
                    <Review data={data.reviewStart} />
                </div>

                <div className="col-md-9 mb-3">
                    <ModuleToolBar
                        book={books}
                        gripBook={gripBook}
                        listBook={listBook}
                        onChangeListBook={handleChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        fromItem={fromItem}
                        toItem={toItem}
                        totalItem={totalItem}
                        sortBook={sortBook}
                        onSortBook={handleSortBook}
                    />
                    <div className="row">
                        {booksLoading ?
                            (<CardPlaceholder className="d-flex" />) : books.data.map((book, index) => {
                                return (
                                    <Fragment key={index}>
                                        {gripBook ? <div className="col-md-4">
                                            <CardGrip data={book} onAddToCart={() => handleAddToCart(book, 1, book.stock_quantity)} onAddToWishlist={() => handleAddToWishlist(book)} />
                                        </div> :
                                            <CardList data={book} onAddToCart={() => handleAddToCart(book, 1, book.stock_quantity)} onAddToWishlist={() => handleAddToWishlist(book)} />
                                        }
                                    </Fragment>
                                )
                            })}
                        <Paging
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookPageCus