import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useTranslation } from 'react-i18next';


const EditProfileModal = ({ isOpen, toggleModal, user, onEdit }) => {
    const [username, setUsername] = useState(user.username);
    const [fullname, setFullname] = useState(user.fullname);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [phone, setPhone] = useState(user.phone_number);
    const { t } = useTranslation()
    // const [image, setImage] = useState('');
    // const [imageReview, setImageReview] = useState('');

    // const handleChangeFile = (e) => {
    //     const fileChoose = e.target.files[0];
    //     const validImage = ['image/jpg', 'image/jpeg', 'image/png'];
    //     if (fileChoose && validImage.includes(fileChoose.type)) {

    //         const readerFile = new FileReader();
    //         setError('');

    //         // setImage(fileChoose);
    //         readerFile.onloadend = () => {
    //             setImage(readerFile.result);
    //             setImageReview(readerFile.result);
    //         }

    //         readerFile.readAsDataURL(fileChoose);
    //     } else {
    //         setError('Please select a valid images files jpg, jpeg')
    //     }

    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        const editProfile = { username, fullname, email, address, phone_number: phone, role_name: 'customer' };
        onEdit({ ...editProfile, id: user.id });
    };
    if (!isOpen) {
        return null;
    }
    return (
        <Fragment>
            <Modal isOpen={isOpen} toggle={toggleModal} size="lg" >
                <ModalHeader toggle={toggleModal}>{t('title.your_profile')}</ModalHeader>
                <ModalBody>
                    <Form className='container title'>
                        <div className="row">
                            <div className='col-6'>
                                <FormGroup >
                                    <Label for="name">{t('title.username')}</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fullname">{t('title.fullname')}</Label>
                                    <Input
                                        type='text'
                                        id='fullname'
                                        name='fullname'
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                            </div>

                            <div className='col-6'>
                                <FormGroup >
                                    <Label for='email'>{t('title.email')}</Label>
                                    <Input
                                        type='email'
                                        name='email'
                                        id='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup >
                                    <Label for="phone">{t('title.phone')}</Label>
                                    <Input
                                        type='text'
                                        name="phone"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </FormGroup>
                            </div>
                            <FormGroup>
                                <Label for="address">{t('title.address')}</Label>
                                <Input
                                    type="textarea"
                                    name="address"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </FormGroup>
                        </div>
                    </Form>
                    {/* <FormGroup>
            <Label for='image'>Image:</Label>
            <Input
              type="file"
              name='image'
              id='image'
              // value={image}
              accept="image/*"
              onChange={handleChangeFile}
            />
            {error && <p>{error}</p>}
          </FormGroup> */}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}>
                        {t('button.edit')}
                    </Button>{' '}
                    <Button className='btn-cancel' onClick={toggleModal}>
                        {t('button.cancel')}
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

EditProfileModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    user: PropTypes.object,
    onEdit: PropTypes.func
};

export default EditProfileModal;
