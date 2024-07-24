import api from "../utils/api";

const loginAuth = ({ email, password }) => {
    return api.post('/login', { email, password });
}

const logoutAuth = () => {
    return api.get('/logout')
}

const registerAuth = ({ email, password, role, username }) => {
    return api.post('/register', { email, password, role_name: role, username })
}

export { loginAuth, logoutAuth, registerAuth }