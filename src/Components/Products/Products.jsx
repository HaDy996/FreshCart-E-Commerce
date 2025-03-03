import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import styles from './Products.module.css';
import axios from 'axios';
import Loader from '../Shared/Loader/Loader';
import { WishlistContext} from '../../context/WishlistContext';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import { SyncLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToWishlist, wishlist } = useContext(WishlistContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const { addToCart } = useContext(cartContext);
  const [flyingHearts, setFlyingHearts] = useState([]);
  const [flyingCart, setFlyingCart] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const cartButtonRefs = useRef({});

  const wishlistIds = useMemo(() => wishlist.map(item => item._id), [wishlist]);

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      setAllProducts(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products", { position: "bottom-center" });
      setLoading(false);
    }
  }

  function animateHeart(productId) {
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
  }

  function animateCart(productId) {
    const cartButton = cartButtonRefs.current[productId];
    const cartIcon = document.getElementById("cart-icon");

    if (!cartButton || !cartIcon) return;

    const buttonRect = cartButton.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    setFlyingCart(prev => [...prev, {
      id: `${productId}-${Date.now()}`,
      left: buttonRect.left + buttonRect.width / 2,
      top: buttonRect.top + buttonRect.height / 2,
      toLeft: cartRect.left + cartRect.width / 2,
      toTop: cartRect.top + cartRect.height / 2,
      size: 24,
    }]);

    setTimeout(() => {
      setFlyingCart(prev => prev.filter(cart => cart.id !== `${productId}-${Date.now()}`));
    }, 800);
  }

  const handleSearch = (event) => {
    setSearchProduct(event.target.value);
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product =>
      product.title.toLowerCase().includes(searchProduct.toLowerCase())
    );
  }, [allProducts, searchProduct]);

  return (
    <>
      <h1 className='text-main text-4xl font-bold border-x-[3.5px] border-main px-2 rounded-md inline-block my-10'>
        All Products
      </h1>

      <div className="flex justify-center mb-6 items-center my-5">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchProduct}
          onChange={handleSearch}
          className="w-3/4 px-4 py-2 border-main rounded-lg my-9 focus:border-[2.5px] focus:border-main focus:ring-0"
        />
        <i className="fa-solid fa-magnifying-glass ms-2 text-3xl text-main"></i>
      </div>

      {loading ? <Loader /> : (
        <div className='main-Layout my-5 relative'>
          {/* Heart Animations */}
          {flyingHearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{
                left: heart.left,
                top: heart.top,
                scale: 2,
                opacity: 1
              }}
              animate={{ left: heart.toLeft, top: heart.toTop, scale: 1, opacity: 0 }}
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

          {/* Cart Animations */}
          {flyingCart.map(cart => (
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

          {filteredProducts.length > 0 ? filteredProducts.map(product => (
            <div className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 mb-5" key={product._id}>
              <div className="product px-3 mx-2 hover:border-x-[4px] hover:border-main rounded-md transition-all duration-100 relative">
                <i
                  id={`heart-${product._id}`}
                  onClick={() => {
                    animateHeart(product._id);
                    addToWishlist(product._id);
                  }}
                  className={`fa-heart fa-xl mb-4 absolute top-4 end-3 cursor-pointer ${wishlistIds.includes(product._id)
                    ? 'fa-solid text-red-500'
                    : 'fa-regular hover:text-main'
                    }`}
                ></i>

                <Link to={`/productDetails/${product._id}/${product.category?._id}`}>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className='mb-3 '
                  />
                  <span className='text-main font-semibold'>{product.category?.name}</span>
                  <h2 className='mb-3 font-bold'>{product.title.split(" ").slice(0, 2).join(" ")}</h2>
                  <div className="flex justify-between mb-4">
                    <p className='font-bold'>{product.price} EGP</p>
                    <p>
                      <i className='fa fa-star text-yellow-400'></i>
                      {product.ratingsAverage}
                    </p>
                  </div>
                </Link>

                <button
                  ref={el => cartButtonRefs.current[product._id] = el}
                  onClick={async () => {
                    setBtnLoading(true);
                    try {
                      animateCart(product._id);
                      await addToCart(product._id);
                      toast.success("Added to cart!", {
                        position: "bottom-center",
                        theme: "colored",
                        autoClose: 800
                      });
                    } catch (error) {
                      toast.error("Failed to add to cart", {
                        position: "bottom-center",
                        theme: "colored"
                      });
                    } finally {
                      setBtnLoading(false);
                    }
                  }}
                  className='btn bg-main hover:bg-main-dark text-white p-2 rounded-lg mt-2 font-semibold w-full flex items-center justify-center mb-4 transition-colors'
                  disabled={btnLoading}
                >
                  {btnLoading ? (
                    <SyncLoader color="white" size={10} margin={4} />
                  ) : (
                    <>
                      <i className="fa-solid fa-cart-plus text-white me-2 text-xl"></i>
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          )) : (
            <p className="text-center text-gray-500 text-lg">
              No products found for "<span className="font-bold">{searchProduct}</span>"
            </p>
          )}
        </div>
      )}
    </>
  );
}
