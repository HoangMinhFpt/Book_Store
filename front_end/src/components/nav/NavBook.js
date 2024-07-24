import { useEffect, useState } from "react";
import CardReview from "../card/review/CardReview";
import '../../styles/components/nav/NavBook.scss'
import ReviewModal from "../modal/ReviewModal";
import { toast } from "react-toastify";
import { createReview, editReview } from "../../services/ReviewManage";
import { useTranslation } from "react-i18next";

function NavBook({ book, review, user, refreshReviews }) {

    const [activeTab, setActiveTab] = useState('description');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [userReview, setUserReview] = useState(null);
    const { t } = useTranslation()

    useEffect(() => {
        const userSpecificReview = review.find((a) => a.user_id === user);
        setUserReview(userSpecificReview);
    }, [review, user]);

    const openModal = () => {
        setIsOpenModal(true);
    };

    const toggleModal = () => {
        setIsOpenModal(prevState => !prevState);
    };

    const handleReview = (review) => {
        toast.promise(createReview(review), {
            pending: 'Processing your request...',
            success: 'Review book successfully!',
            error: 'Review failed. Please try again.'
        }).then(() => {
            setIsOpenModal(false)
            refreshReviews()
        }).catch((error) => {
            console.error('Review book error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                console.log('Validation errors:', error.response.data.errors);
                console.log('Review book failed:', JSON.stringify(error.response.data.errors));
            } else {
                toast.error('Review failed. Please try again.')
            }
        })
    }

    const handleEditReview = (review) => {
        toast.promise(editReview(review), {
            pending: 'Processing your request...',
            success: 'Edit review book successfully!',
            error: 'Edit review failed. Please try again.'
        }).then(() => {
            setIsOpenModal(false)
            refreshReviews();
        }).catch((error) => {
            console.error('Review book error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                console.log('Validation errors:', error.response.data.errors);
                console.log('Review book failed:', JSON.stringify(error.response.data.errors));
            } else {
                toast.error('Review failed. Please try again.')
            }
        })
    }

    return (
        <div>
            <ReviewModal
                isOpen={isOpenModal}
                toggleModal={toggleModal}
                book={book}
                onCreate={handleReview}
                onEdit={handleEditReview}
                reviewed={userReview}
            />

            <nav >
                <div className="nav nav-tabs title">
                    <div
                        className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                        onClick={() => setActiveTab('description')}
                    >
                        {t('title.description')}
                    </div>
                    <div
                        className={`nav-link ${activeTab === 'review' ? 'active' : ''}`}
                        onClick={() => setActiveTab('review')}
                    >
                        {t('title.review')}
                    </div>
                </div>
                <div className="content">
                    {activeTab === 'description' && (
                        <div>
                            {book.description} {book.biography}
                        </div>
                    )}
                    {activeTab === 'review' && (
                        <div>
                            <button className="btn btn-review mb-5" onClick={() => openModal()}>
                                {userReview ? t('button.edit_review') : t('button.create_review')}
                            </button>
                            {review && review.map((review, index) => {
                                return (
                                    <div key={index}>
                                        <CardReview data={review} />
                                    </div>
                                )
                            })}
                        </div>
                    )
                    }
                </div>
            </nav>
        </div>
    );
}

export default NavBook;
