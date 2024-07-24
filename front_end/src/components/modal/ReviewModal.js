import React, { Fragment, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const ReviewModal = ({ isOpen, toggleModal, onCreate, book, reviewed, onEdit }) => {
    const user = useSelector((state) => state.auth.user);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const { t } = useTranslation()

    useEffect(() => {
        if (isOpen) {
            if (reviewed) {
                setRating(reviewed.rating);
                setReviewText(reviewed.review_text)
            } else {
                setRating(0);
                setReviewText('')
            }
        }
    }, [isOpen, reviewed])

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const review = { user_id: user.id, book_id: book.book_id, review_text: reviewText, rating }
        if (reviewed) {
            onEdit({ ...review, user_id: user.id, book_id: book.book_id })
            console.log("edit");
        } else {
            console.log("create");
            onCreate(review)
        }
    }

    return (
        <Fragment>
            <Modal isOpen={isOpen} toggle={toggleModal} >
                <ModalHeader toggle={toggleModal}>{t('title.your_review')}</ModalHeader>
                <ModalBody>
                    <Form >
                        <FormGroup>
                            <Label for="rating">{t('title.rating')}</Label>
                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FontAwesomeIcon icon={faStar} key={star}
                                        size='2x'
                                        color={star <= rating ? '#ffc107' : '#e4e5e9'}
                                        onClick={() => handleRatingChange(star)}
                                        style={{ cursor: 'pointer', marginRight: 5 }}
                                    />
                                ))}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="comment">{t('title.comment')}</Label>
                            <Input
                                type="textarea"
                                name="comment"
                                id="comment"
                                placeholder="Your comment"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                        {t('button.post')}
                    </Button>{' '}
                    <Button className="btn-cancel" onClick={toggleModal}>
                        {t('button.cancel')}
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

ReviewModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    reviewed: PropTypes.object,
    onCreate: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}

export default ReviewModal