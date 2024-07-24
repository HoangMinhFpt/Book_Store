import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart, updateQuantity } from "../../stores/reducers/cartSlice";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { checkout } from "../../services/OrderManage";
import { toast } from "react-toastify";
import '../../styles/page/customer/CartPageCus.scss'
import { useTranslation } from "react-i18next";

const CartPageCus = () => {
    const cart = useSelector((state) => state.cart.items);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation()

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleRemoveItem = (book_id) => {
        dispatch(removeFromCart({ book_id }));
    };

    const handleChangeQuantity = (event, item) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            if (value > item.stock_quantity) {
                toast.error(`Only ${item.stock_quantity} items available in stock.`);
                dispatch(updateQuantity({ book_id: item.book_id, quantity: item.stock_quantity }));
            } else if (value < 1) {
                dispatch(updateQuantity({ book_id: item.book_id, quantity: 1 }));
            } else {
                dispatch(updateQuantity({ book_id: item.book_id, quantity: value }));
            }
        }
    };

    const handleUpdateQuantity = (book_id, quantity, stock_quantity) => {
        if (quantity < 1) {
            quantity = 1;
        } else if (quantity > stock_quantity) {
            toast.error(`Only ${stock_quantity} items available in stock.`);
            quantity = stock_quantity;
        }
        dispatch(updateQuantity({ book_id, quantity }));
    };

    const calculateSubtotal = (items) => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const subtotal = calculateSubtotal(cart);
    const shippingCost = 0;
    const discount = 0;
    const total = subtotal + shippingCost - discount;
    const handleShopping = () => {
        navigate('/book')
    }

    const handleCheckOut = async () => {

        const orderData = {
            user_id: auth.user.id,
            order_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            total_amount: total,
            status: 'pending',
            order_details: cart.map(item => ({
                book_id: item.book_id,
                quantity: item.quantity,
                price: item.price,
                total: (item.price * item.quantity)
            }))
        };

        toast.promise(checkout(orderData), {
            pending: 'Processing your order...',
            success: 'Checkout successfully!',
            error: 'Checkout failed. Please try again.'

        }).then(() => {
            dispatch(clearCart());
            navigate('/book')

        }).catch((error) => {
            console.error('Checkout error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                console.log('Validation errors:', error.response.data.errors);
                console.log('Checkout failed:', JSON.stringify(error.response.data.errors));
            } else {
                toast.error('Checkout failed. Please try again.')
            }
        })
    }

    return (
        <div className="cart-container" >
            <div className="top-content">
                <button className="btn btn-cart btn-continue-shopping" onClick={handleShopping}>{t('button.shopping')}</button>
                <h2 className="title">{t('title.cart')}</h2>
                <button className="btn btn-cart btn-checkout" onClick={handleCheckOut} style={{ display: (cart.length > 0 ? '' : 'none') }}>{t('button.check_out')}</button>
            </div>
            {
                cart.length > 0 ? (
                    <Fragment>
                        <div className="cart-items">
                            <div className="container-fluid">
                                <div className="cart-header title">
                                    <div className="cart-header__title">{t('title.product')}</div>
                                    <div className="cart-header__price">{t('title.price')}</div>
                                    <div className="cart-header__quantity">{t('title.author')}</div>
                                    <div className="cart-header__total-price">{t('title.total_amount')}</div>
                                </div>
                                {cart.map((item, index) => (
                                    <div key={index} className="cart-item">
                                        <div className="cart-item__title">
                                            <div className="cart-item__title__img">
                                                <img src={`${item.image}`} alt={item.title} />
                                            </div>
                                            <div className="cart-item__title__item" >
                                                {item.title}
                                                <button onClick={() => handleRemoveItem(item.book_id)} className="btn-remove">
                                                    x
                                                </button>
                                            </div>
                                        </div>
                                        <div className="cart-item__price">{item.price}</div>
                                        <div className="cart-item__quantity">
                                            <button className="cart-item__quantity-btn" onClick={() => handleUpdateQuantity(item.book_id, item.quantity - 1, item.stock_quantity)}>
                                                -
                                            </button>
                                            <input className="cart-item__quantity-input" type="text" value={item.quantity} onChange={(e) => handleChangeQuantity(e, item)} />
                                            <button className="cart-item__quantity-btn" onClick={() => handleUpdateQuantity(item.book_id, item.quantity + 1, item.stock_quantit)}>
                                                +
                                            </button>
                                        </div>
                                        <div className="cart-item__total-price">{item.price * item.quantity} đ</div>
                                    </div>
                                ))}

                                <div className="summary title">
                                    <div className="summary__details">
                                        <div>
                                            <span>{t('title.subtotal')}</span>
                                            <span>{subtotal} </span>
                                        </div>
                                        <div>
                                            <span>{t('title.ship_cost')}</span>
                                            <span>
                                                {shippingCost}
                                            </span>
                                        </div>
                                        <div>
                                            <span>{t('title.discount')}
                                            </span>
                                            {discount}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="summary__checkout">
                                        <span className="">{t('title.total')}</span>
                                        <span className="">{total} </span>
                                    </div>
                                </div>

                            </div>
                            <div className="bottom-content">
                                <button className="btn btn-cart btn-continue-shopping" onClick={handleShopping}>{t('button.shopping')}</button>
                                <button onClick={handleClearCart} className="btn btn-cart btn-clear-cart">
                                    {t('button.remove_cart')}
                                </button>
                                <button className="btn btn-cart btn-checkout" onClick={handleCheckOut}>{t('button.check_out')}</button>
                            </div>
                        </div >
                    </Fragment>
                ) : (
                    <div className="cart-empty title fs-5">
                        <p>{t('toast.cart_empty')}</p>
                    </div>
                )
            }
        </div>
    )
};

export default CartPageCus