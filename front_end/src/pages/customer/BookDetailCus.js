import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBook } from "../../services/BookMange";
import { getReviewByBook } from "../../services/ReviewManage";
import ModulePrice from "../../components/module/ModulePrice";
import NavBook from "../../components/nav/NavBook";
import '../../styles/page/customer/BookDetailCus.scss'
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


const BookDetailCus = () => {
    const [book, setBook] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const id = location.pathname.split("/")[2]
    const user = useSelector((state) => state.auth.user.id)
    const { t } = useTranslation()

    const fetchBook = async (id) => {
        try {
            const response = await getBook(id);
            setBook(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    const fetchReview = async (id) => {
        try {
            const response = await getReviewByBook(id);
            setReviews(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBook(id);
        fetchReview(id);
    }, [id])

    if (loading) {
        return <div>Loading...</div>;
    }

    const refreshReviews = () => {
        fetchReview();
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 mt-3">
                    <div className="row mb-3">
                        <div className="col-md-6 text-center mb-2">
                            <img src={`${book.image}`} className="img-fluid" alt="..." />
                        </div>
                        <div className="col left-content">
                            <h1 className="h3 d-inline me-2">
                                {book.title}
                            </h1>
                            <hr />
                            <dl className="row small mb-3 fs-5 title">
                                <dt className="col-sm-6">{t('title.author')} </dt>
                                <dd className="col-sm-6">{book.author.author_name} </dd>
                                <dt className="col-sm-6">{t('title.genre')}</dt>
                                <dd className="col-sm-6">{book.genre.genre_name}</dd>
                                <dt className="col-sm-6">{t('title.published_date')}</dt>
                                <dd className="col-sm-6">{book.published_date}</dd>
                            </dl>
                            <hr />
                            <div>
                                <ModulePrice book={book} review={reviews} />
                            </div>
                        </div>
                        <hr />
                        <NavBook book={book} review={reviews} user={user} refreshReviews={refreshReviews} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetailCus