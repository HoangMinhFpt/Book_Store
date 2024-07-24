import api from "../utils/api";

const getAllGenre = () => {
    return api.post("/genres");
}
const getGenre = ({ page, limit }) => {
    return api.post(`/genres?page=${page}&limit=${limit}`);
}

export { getGenre, getAllGenre }