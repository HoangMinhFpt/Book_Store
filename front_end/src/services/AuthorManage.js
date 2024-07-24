import api from "../utils/api";

const getAuthor = ({ page, limit }) => {
    return api.post(`/authors?page=${page}&limit=${limit}`);
}

const getAllAuthor = () => {
    return api.post(`/authors`);
}

export { getAuthor, getAllAuthor }