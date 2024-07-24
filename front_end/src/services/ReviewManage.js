import api from "../utils/api"

const getReviewByBook = (id) => {
    return api.post(`/get-review-book?book_id=${id}`)
}

const getReviewByUser = (id) => {
    return api.post(`/get-review-user?user_id=${id}`)
}

const createReview = (data) => {
    return api.post(`/create-review`, data)
}

const editReview = (data) => {
    return api.put(`/update-review?user_id=${data.user_id}&book_id=${data.book_id}`, data)
}
export { getReviewByBook, getReviewByUser, createReview, editReview }