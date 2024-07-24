import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/components/module/ModulePrice.scss'
import { faCartShopping, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../stores/reducers/cartSlice';
import { addToWishlist } from '../../stores/reducers/wishlistSlice';
import { useTranslation } from 'react-i18next';


const ModulePrice = ({ book, review }) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const [count, setCount] = useState(1);
    const [showTooltip, setShowTooltip] = useState(false);
    const totalStars = review.reduce((sum, review) => sum + review.rating, 0);
    const averageStars = totalStars / review.length;
    const dispatch = useDispatch();
    const { t } = useTranslation()

    const handleIncrement = () => {
        if (count < book.stock_quantity) {
            setCount(count + 1);
            setShowTooltip(false);
        } else {
            setShowTooltip(true);
        }
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
            setShowTooltip(false);
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart({ ...book, quantity: count }));
    };

    const handleAddToWishlist = () => {
        dispatch(addToWishlist({ ...book }))
    }

    const handleChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (isNaN(value)) {
            setCount(1);
        } else if (value > book.stock_quantity) {
            setCount(book.stock_quantity);
            setShowTooltip(true);
        } else {
            setCount(value);
            setShowTooltip(false);
        }
    }

    return (
        <div className="module-price-container">
            <div className="module-price-content">
                <div className="star ">
                    {averageStars > 0 &&
                        Array.from({ length: 5 }, (_, key) => {
                            if (key < averageStars)
                                return <FontAwesomeIcon icon={faStar} key={key} className="text-warning me-1" />;
                            else
                                return (
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className="text-secondary me-1"
                                        key={key}
                                    />
                                );
                        })
                    }
                    <span className="ml-1">{review.length} {t('title.review')}</span>
                </div>
                <div className="price-item">
                    <h3>{formatter.format(book.price)}</h3>
                </div>
                <dl className="stock-item row fs-5">
                    <dt className="col-sm-3 title">{t('title.stocking')}</dt>
                    <dd className="col-sm-1">{book.stock_quantity}</dd>
                    <dt className="col-sm-3">{t('title.product')}</dt>
                </dl>
                <div className="count-buy-item">
                    <div className="counter">
                        <button className="counter__button" onClick={handleDecrement}>-</button>
                        <span className="counter__value" id="my-anchor-element">
                            <input type="text" value={count} onChange={handleChange} className='input-count' onFocus={() => setShowTooltip(false)} />
                        </span>
                        <button className="counter__button" onClick={handleIncrement}>+</button>
                    </div>

                    <Tooltip anchorSelect="#my-anchor-element" id="stockTooltip" place="bottom" effect="solid" isOpen={showTooltip} data-tooltip-delay-hide={1000} >
                        {t('toast.cannot_add_more')}
                    </Tooltip>

                    <button className="btn btn-buy" onClick={handleAddToCart}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span>{t('button.buy_now')}</span>
                    </button>
                    <button className="btn btn-wishlist" onClick={handleAddToWishlist}>
                        <FontAwesomeIcon icon={faHeart} />
                        <span>{t('button.add_wishlist')}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModulePrice