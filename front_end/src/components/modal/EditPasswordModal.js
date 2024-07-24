import React, { Fragment, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import '../../styles/modal/EditPasswordModal.scss'
import { useTranslation } from "react-i18next";

const EditPasswordModal = ({ isOpen, toggleModal, onEdit }) => {
    const user = useSelector((state) => state.auth.user.id);
    const [passwords, setPasswords] = useState({ current_password: '', password: '', password_confirmation: '' })
    const [hiddenPassword, setHiddenPassword] = useState({ current_password: false, password: false, password_confirmation: false })
    const { t } = useTranslation()

    useEffect(() => {
        if (isOpen) {
            setPasswords({ current_password: '', password: '', password_confirmation: '' })
            setHiddenPassword({ current_password: false, password: false, password_confirmation: false })
        }
    }, [isOpen])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        onEdit({ ...passwords, user_id: user })
    }

    const handleChangeHidden = (field) => {
        setHiddenPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    }

    return (
        <Fragment>
            <Modal isOpen={isOpen} toggle={toggleModal} >
                <ModalHeader toggle={toggleModal} className="title">{t('button.change_password')}</ModalHeader>
                <ModalBody>
                    <Form >
                        <FormGroup className="input-password-eye">
                            <Label for="current_password">{t('title.current_password')}</Label>
                            <Input
                                type={hiddenPassword.current_password ? 'text' : 'password'}
                                name="current_password"
                                id="current_password"
                                placeholder="Your current password"
                                value={passwords.current_password}
                                onChange={handleInputChange}
                            />
                            <span>
                                <button type="button" onClick={() => handleChangeHidden('current_password')} className="btn-eye">

                                    <FontAwesomeIcon icon={hiddenPassword.current_password ? faEye : faEyeSlash} />
                                </button>
                            </span>
                        </FormGroup>
                        <FormGroup className="input-password-eye">
                            <Label for="password"> {t('title.new_password')}</Label>
                            <Input
                                type={hiddenPassword.password ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="Your new password"
                                value={passwords.password}
                                onChange={handleInputChange}
                            />
                            <span>
                                <button type="button" onClick={() => handleChangeHidden('password')} className="btn-eye">

                                    <FontAwesomeIcon icon={hiddenPassword.password ? faEye : faEyeSlash} />
                                </button>
                            </span>
                        </FormGroup>
                        <FormGroup className="input-password-eye">
                            <Label for="password_confirmation">{t('title.confirm _password')}</Label>
                            <Input
                                type={hiddenPassword.password_confirmation ? 'text' : 'password'}
                                name="password_confirmation"
                                id="password_confirmation"
                                placeholder="Please confirm new password"
                                value={passwords.password_confirmation}
                                onChange={handleInputChange}
                            />
                            <span>
                                <button type="button" onClick={() => handleChangeHidden('password_confirmation')} className="btn-eye">

                                    <FontAwesomeIcon icon={hiddenPassword.password_confirmation ? faEye : faEyeSlash} />
                                </button>
                            </span>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                        {t('button.change_password')}
                    </Button>{' '}
                    <Button className='btn-cancel' onClick={toggleModal}>
                        {t('button.cancel')}
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

EditPasswordModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    onEdit: PropTypes.func
}

export default EditPasswordModal