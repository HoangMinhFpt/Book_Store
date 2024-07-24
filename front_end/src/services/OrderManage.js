import api from "../utils/api"

const getOrder = ({ page, limit }) => {
    return api.post(`/orders?page=${page}&limit=${limit}`);
}

const getOrderByUser = (id) => {
    return api.get(`/get-order?id=${id}`)
}

const getOrderDetailByOrder = (id) => {
    return api.get(`/get-order-detail?id=${id}`)
}

const checkout = (data) => {
    return api.post(`/checkout`, data)
}

export { getOrder, getOrderByUser, getOrderDetailByOrder, checkout }