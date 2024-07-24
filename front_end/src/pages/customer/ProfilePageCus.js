import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUser, getOrderDetailByOrder } from "../../services/OrderManage";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EditProfileModal from "../../components/modal/EditProfileModal";
import { toast } from "react-toastify";
import { editPasswordUser, editUser, profileUser } from "../../services/UserManage";
import { update } from "../../stores/reducers/authSlice";
import '../../styles/page/customer/ProfilePageCus.scss'
import EditPasswordModal from "../../components/modal/EditPasswordModal";

const ProfilePageCus = () => {
    const [user, setUser] = useState(useSelector((state) => state.auth.user));
    const { t } = useTranslation();
    const [orders, setOrders] = useState([])
    const [orderDetail, setOrderDetail] = useState([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false)
    const dispatch = useDispatch();

    const openModal = () => {
        setIsOpenModal(true);
    };
    const openPasswordModal = () => {
        setIsOpenPasswordModal(true);
    };

    const toggleModal = () => {
        setIsOpenModal(prevState => !prevState);
    };
    const togglePasswordModal = () => {
        setIsOpenPasswordModal(prevState => !prevState);
    };

    const handleEditProfile = (user) => {
        toast.promise(editUser(user), {
            pending: 'Processing your request...',
            success: 'Edit profile successfully!',
            error: 'Edit failed. Please try again.'
        }).then(async () => {
            const response = await profileUser();
            dispatch(update({ user: response.data }))
            setUser(response.data)
            setIsOpenModal(false)
        }).catch((error) => {
            console.error('Edit profile error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                console.log('Validation errors:', error.response.data.errors);
                console.log('Edit profile failed:', JSON.stringify(error.response.data.errors));
            } else {
                toast.error('Edit failed. Please try again.')
            }
        })
    }

    const handleEditPassword = (password) => {
        console.log(password);
        toast.promise(editPasswordUser(password), {
            pending: 'Processing your request...',
            success: 'Change password successfully!',
            error: 'Change password failed. Please try again.'
        }).then(async () => {
            const response = await profileUser();
            dispatch(update({ user: response.data }))
            setUser(response.data)
            setIsOpenPasswordModal(false)
        }).catch((error) => {
            console.error('Change password error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                console.log('Validation errors:', error.response.data.errors);
                console.log('Change password failed:', JSON.stringify(error.response.data.errors));
            } else {
                toast.error('Change password failed. Please try again.')
            }
        })
    }

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await getOrderByUser(user.id);
                setOrders(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchOrder()
    }, [user.id])

    const handleOrderDetail = async (id) => {
        try {
            const response = await getOrderDetailByOrder(id);
            setOrderDetail(response.data)
            console.log(orderDetail);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <EditProfileModal isOpen={isOpenModal} user={user} toggleModal={toggleModal} onEdit={handleEditProfile} />
            <EditPasswordModal isOpen={isOpenPasswordModal} toggleModal={togglePasswordModal} onEdit={handleEditPassword} />
            <div className="card title mb-3">
                <h5 className="card-header text-white ">
                    {t('user.profile')}
                </h5>
                <div className="row g-0">
                    <div className="col-md-2 text-center">
                        <img src={"/images/NO_IMG.png"} className="img-fluid" alt="..." />
                    </div>
                    <div className="col-md-10">
                        <div className="card-body title ">
                            <div className="d-flex">

                                <div className="input-group mb-2">
                                    <span className="input-group-text">{t('title.username')}</span>
                                    <input type="text" className="form-control" placeholder="Tên người dùng" aria-label="username" value={user.username} readOnly />
                                </div>
                                <div className="input-group mb-2">
                                    <span className="input-group-text">{t('title.fullname')}</span>
                                    <input type="text" className="form-control" placeholder="Tên" aria-label="fullname" value={user.fullname} readOnly />
                                </div>
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text">{t('title.phone')}</span>
                                <input type="text" className="form-control" placeholder="Số điện thoại" aria-label="Phone" value={user.phone_number} readOnly />
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text">{t('title.address')}</span>
                                <input type="text" className="form-control" placeholder="Địa chỉ" aria-label="Address" value={user.address} readOnly />
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text">{t('title.email')}</span>
                                <input type="text" className="form-control" placeholder="Email" aria-label="Email" value={user.email} readOnly />
                            </div>
                            <div className="btn-edit-group row">
                                <button type="button" className="btn btn-sm col-md-2 offset-md-6" onClick={openModal}>
                                    {t('button.update_profile')}
                                </button>
                                <button type="button" className="btn btn-sm bg-warning col-md-2 offset-md-1" onClick={openPasswordModal}>
                                    {t('button.change_password')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3 title">
                <h5 className="card-header text-white">
                    {t('title.order')}
                </h5>
                <div className="mx-3 mb-3 row">
                    <div className="table-book-container col-md-5 ">
                        <h3 className="title">{t('title.order', { context: 'list' })}</h3>
                        <table className="book-table text-center">
                            <thead>
                                <tr>
                                    <th className="col-fixed-width-2">{t('table.title')}</th>
                                    <th className="col-fixed-width-1">{t('table.total')}</th>
                                    <th className="col-fixed-width-1">{t('table.order_date')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map((order, index) => (
                                    <tr key={index}>
                                        <td className='col-3'>
                                            <Link onClick={() => handleOrderDetail(order.order_id)} className='link'>{order.order_id}</Link>
                                        </td>
                                        <td className='col-2'>{order.total_amount}</td>
                                        <td className='col-1'>{order.order_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="table-book-container col-md-7 title">
                        <h3 className="title">{t('title.order', { context: 'detail' })}</h3>
                        <table className="book-table text-center">
                            <thead>
                                <tr>
                                    <th className="col-fixed-width-2">{t('table.title')}</th>
                                    <th className="col-fixed-width-1">{t('title.quantity')}</th>
                                    <th className="col-fixed-width-1">{t('title.price')}</th>
                                    <th className="col-fixed-width-1">{t('table.total')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetail && orderDetail.map((detail, index) => (
                                    <tr key={index}>
                                        {/* <td className='col-3'>
                                            <Link to={`/order/${detail.order_id}`} state={{ order }} className='link'>{order.order_id}</Link>
                                        </td> */}
                                        <td className='col-2'>{detail.book.map((item) => item.title)}</td>
                                        <td className='col-1'>{detail.quantity}</td>
                                        <td className='col-1'>{detail.price}</td>
                                        <td className='col-1'>{detail.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </Fragment>
    );
};

export default ProfilePageCus