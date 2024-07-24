import api from "../utils/api";

const getBooks = ({ page, limit }) => {
    return api.post(`/books?page=${page}&limit=${limit}`,);
}

const getFilterBooks = ({ page, limit, sortBook }) => {
    // console.log(sortBook);
    const params = {
        page,
        limit,
        sortBook
        // authors: authors.join(','),
        // genres: genres.join(','),
    }
    return api.post(`/books`, params);
}

const filterBooks = (data) => {
    return api.post(`/books`, data);
}

const getAllBooks = () => {
    return api.post(`/books`);
}

const createBook = (data) => {
    return api.post(`/create-book`, data)
}

const getBook = (id) => {
    return api.get(`/get-book?id=${id}`)
}

const getBookAuthor = (id) => {
    return api.get(`/get-book-author?author_id=${id}`)
}

const getBookGenre = (id) => {
    return api.get(`/get-book-genre?genre_id=${id}`)
}

const editBook = (id, data) => {
    return api.put(`/update-book?id=${id}`, data)
}

const deleteBook = (id) => {
    return api.delete(`/delete-book?id=${id}`)
}

const searchBook = ({ query }) => {
    // console.log(query);
    return api.get(`/search?query=${query}`)
}

export { getAllBooks, filterBooks, getFilterBooks, getBooks, createBook, getBook, editBook, deleteBook, getBookAuthor, getBookGenre, searchBook }