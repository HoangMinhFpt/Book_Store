import { useDispatch, useSelector } from "react-redux";
import '../../styles/page/customer/CartPageCus.scss'
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { clearWishlist, removeFromWishlist } from "../../stores/reducers/wishlistSlice";

const WishlistPageCus = () => {
    const wishlist = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClearWishlist = () => {
        dispatch(clearWishlist());
    };

    const handleRemoveItem = (book_id) => {
        dispatch(removeFromWishlist({ book_id }));
    };

    const handleShopping = () => {
        navigate('/book')
    }

    return (
        <div className="cart-container" >
            <div className="top-content">
                <button className="btn-cart btn-continue-shopping" onClick={handleShopping}>Countinue shopping</button>
                <h2>wishlist</h2>
                <button className="btn-cart btn-checkout" style={{ display: (wishlist.length > 0 ? '' : 'none') }}>Check out</button>
            </div>
            {
                wishlist.length > 0 ? (
                    <Fragment>
                        <div className="cart-items">
                            <div className="container-fluid">
                                <div className="cart-header">
                                    <div className="cart-header__title">Product</div>
                                    <div className="cart-header__price">Price</div>
                                </div>
                                {wishlist.map((item, index) => (
                                    <div key={index} className="cart-item">
                                        <div className="cart-item__title">
                                            <div className="cart-item__title__img">
                                                <img src={`/images/books/${item.image}`} alt={item.title} />
                                            </div>
                                            <div className="cart-item__title__item" >
                                                {item.title}
                                                <button onClick={() => handleRemoveItem(item.book_id)} className="btn-remove">
                                                    x
                                                </button>
                                            </div>
                                        </div>
                                        <div className="cart-item__price">{item.price}</div>
                                    </div>
                                ))}

                            </div>
                            <div className="bottom-content">
                                <button className="btn-cart btn-continue-shopping" onClick={handleShopping}>Countinue shopping</button>
                                <button onClick={handleClearWishlist} className="btn-cart btn-clear-cart">
                                    Remove wishlist
                                </button>
                                <button className="btn-cart btn-checkout">Check out</button>
                            </div>
                        </div >
                    </Fragment>
                ) : (
                    <div className="cart-empty">
                        <p>Wishlist is empty</p>
                    </div>
                )
            }
        </div>
    )
};

export default WishlistPageCus