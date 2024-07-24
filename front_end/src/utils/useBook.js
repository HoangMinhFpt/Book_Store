import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { filterBooks } from "../services/BookMange";

const useBooks = ({ authors, genres, currentPage, itemsPerPage }) => {
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [fromItem, setFromItem] = useState(0);
    const [toItem, setToItem] = useState(0);

    const { data, isLoading, refetch } = useQuery(
        ['books', { authors, genres, currentPage, itemsPerPage }],
        () => filterBooks({ authors, genres, page: currentPage, limit: itemsPerPage }),
        { keepPreviousData: true }
    );

    useEffect(() => {
        if (data) {
            setFilteredBooks(data.data);
            setTotalPages(data.last_page);
            setTotalItems(data.total);
            setFromItem(data.from);
            setToItem(data.to);
        }
    }, [data]);

    return {
        filteredBooks,
        isLoading,
        totalPages,
        totalItems,
        fromItem,
        toItem,
        refetch,
    };
};

export default useBooks;
