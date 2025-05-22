import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from './ProductItem.module.css';
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { WishlistContext } from '../../../context/WishlistContext';
import { motion } from 'framer-motion';

export default function ProductItem(props) {
  const { wishlist, addToWishlist } = useContext(WishlistContext)
  const [isInWishlist, setIsInWishlist] = useState(false);
  let { imageCover, title, category, price, ratingsAverage, _id } = props.product;
  let { addProductToCart, isLoading } = props;

  //^ Animation states
  const [flyingHearts, setFlyingHearts] = useState([]);
  const [flyingCarts, setFlyingCarts] = useState([]);
  const cartButtonRef = useRef(null);

  //^ Check wishlist status
  useEffect(() => {
    setIsInWishlist(wishlist.some(product => product._id === _id));
  }, [wishlist, _id]);

  //^ Wishlist animation handler
  async function handleWishlistClick() {
    animateHeart(_id);
    await addToWishlist(_id);
    setIsInWishlist(true);
  }

  //^Cart animation handler
  const handleAddToCart = async () => {
    animateCart(_id);
    await addProductToCart(_id);
  };

  //^ Heart animation logic
  const animateHeart = (productId) => {
    const heartIcon = document.getElementById(`heart-${productId}`);
    const wishlistTab = document.getElementById("wishlist-tab");

    if (!heartIcon || !wishlistTab) return;

    const heartRect = heartIcon.getBoundingClientRect();
    const wishlistRect = wishlistTab.getBoundingClientRect();

    setFlyingHearts(prev => [...prev, {
      id: `${productId}-${Date.now()}`,
      left: heartRect.left,
      top: heartRect.top,
      size: heartRect.width,
      toLeft: wishlistRect.left + wishlistRect.width / 2,
      toTop: wishlistRect.top + wishlistRect.height / 2,
    }]);

    setTimeout(() => {
      setFlyingHearts(prev => prev.filter(heart => heart.id !== `${productId}-${Date.now()}`));
    }, 800);
  };

  //^ Cart animation logic
  const animateCart = (productId) => {
    const cartIcon = document.getElementById("cart-icon");
    const addToCartButton = cartButtonRef.current;

    if (!cartIcon || !addToCartButton) return;

    const buttonRect = addToCartButton.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    setFlyingCarts(prev => [...prev, {
      id: `${productId}-${Date.now()}`,
      left: buttonRect.left + buttonRect.width / 2,
      top: buttonRect.top + buttonRect.height / 2,
      toLeft: cartRect.left + cartRect.width / 2,
      toTop: cartRect.top + cartRect.height / 2,
      size: 24,
    }]);

    setTimeout(() => {
      setFlyingCarts(prev => prev.filter(item => item.id !== `${productId}-${Date.now()}`));
    }, 800);
  };

  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/6 mb-5" key={_id}>
      <div className="product px-3 mx-2 hover:border-x-[4px] hover:border-main rounded-md hover:transition-all hover:delay-100 relative">

        {/* Wishlist Animation */}
        {flyingHearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ left: heart.left, top: heart.top, scale: 2, opacity: 1 }}
            animate={{ left: heart.toLeft, top: heart.toTop, scale: 1, opacity: 0.3 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "fixed",
              zIndex: 1000,
              color: "red",
              fontSize: heart.size,
              pointerEvents: "none",
            }}
          >
            ❤️
          </motion.div>
        ))}

        {/* Cart Animation */}
        {flyingCarts.map(cart => (
          <motion.div
            key={cart.id}
            initial={{ left: cart.left, top: cart.top, scale: 2, opacity: 1 }}
            animate={{ left: cart.toLeft, top: cart.toTop, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "fixed",
              zIndex: 1000,
              pointerEvents: "none",
              fontSize: cart.size,
            }}
          >
            <i className="fa-solid fa-cart-shopping text-main"></i>
          </motion.div>
        ))}

        {/* Wishlist Button */}
        <i
          id={`heart-${_id}`}
          onClick={handleWishlistClick}
          className={`fa-heart fa-xl mb-4 absolute top-4 end-3 cursor-pointer ${isInWishlist ? 'fa-solid text-red-500' : 'fa-regular hover:text-main'
            }`}
        ></i>

        {/* Product Content */}
        <Link to={`/productDetails/${_id}/${category?._id}`}>
          <img src={imageCover} alt={title} className='mb-3 w-full h-full object-cover' />
          <span className='text-main font-semibold'>{category?.name}</span>
          <h2 className='mb-3 font-bold dark:text-white'>{title.split(" ").splice(0, 2).join(" ")}</h2>
          <div className="flex justify-between mb-4">
            <p className='font-bold dark:text-white'>{price} EGP</p>
            <p>
              <i className='fa fa-star rating-color'></i>
              <span className='dark:text-white'> {ratingsAverage}</span>
            </p>
          </div>
        </Link>

        {/* Add to Cart Button */}
        <button
          ref={cartButtonRef}
          onClick={handleAddToCart}
          className='btn bg-main text-white p-2 rounded-lg mt-2 font-semibold w-full flex items-center justify-center mb-4 hover:bg-main-dark transition-colors'
          disabled={isLoading}
        >
          {isLoading ? (
            <div className='flex text-center py-1'>
              <SyncLoader color="white" size={10} margin={4} />
            </div>
          ) : (
            <>
              <i className="fa-solid fa-cart-plus text-white me-2 text-xl"></i>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}