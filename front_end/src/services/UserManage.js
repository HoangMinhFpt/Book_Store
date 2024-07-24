import api from "../utils/api";

const getUsers = ({ page, limit }) => {
    return api.post(`/users?page=${page}&limit=${limit}`);
}
const editUser = (data) => {
    return api.put(`/update-user`, data);
}

const profileUser = () => {
    return api.get(`/profile`)
}

const editPasswordUser = (data) => {
    return api.put(`/password-user`, data)
}
export { getUsers, editUser, profileUser, editPasswordUser }