import React, { useContext, useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { tokenContext } from '../../context/tokenContext';
import { cartContext } from '../../context/cartContext';
import { WishlistContext} from '../../context/WishlistContext';

export default function Navbar() {
  let { token, setToken } = useContext(tokenContext);
  let navigate = useNavigate();
  let { numOfCartItems } = useContext(cartContext);
  let { numOfwishlistItems } = useContext(WishlistContext)

  const [currentIcon, setCurrentIcon] = useState('fa-instagram'); //^ State for change social media icon
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); //! State for mobile menu

  //^ Array of social media icons
  const socialIcons = ['fa-instagram', 'fa-facebook', 'fa-tiktok', 'fa-twitter', 'fa-linkedin', 'fa-youtube'];

  //^ change icons every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prevIcon) => {
        const currentIndex = socialIcons.indexOf(prevIcon);
        const nextIndex = (currentIndex + 1) % socialIcons.length;
        return socialIcons[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [socialIcons]);

  //^ Logout function
  function logOut() {
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/login');
  }

  //^ Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  //^ Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //^ Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <>
      <nav className="bg-white dark:bg-gray-900 font-semibold mb-12 fixed w-screen z-50 border-b-[5px] border-main">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={''} className="flex items-center space-x-0 rtl:space-x-reverse mr-[-5px]">
              <img src={logo} width={'180px'} alt="Fresh Cart Logo" className="dark:invert" />
            </Link>
          </div>

          {/* Navbar Links (Visible on md and larger screens) */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            {token ? (
              <>
                <NavLink to={''} className="block py-1 px-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-white">
                  Home
                </NavLink>
                <NavLink to={'products'} className="block py-1 px-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-main">
                  Products
                </NavLink>
                <NavLink to={'categories'} className="block py-1 px-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-main">
                  Categories
                </NavLink>
                <NavLink to={'brands'} className="block py-1 px-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-main">
                  Brands
                </NavLink>
                <NavLink to={'allorders'} className="block py-1 px-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-main">
                  My Orders
                </NavLink>
                <NavLink to={'cart'} className=" py-1 px-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-main flex items-center justify-center">
                  <i id="cart-icon" className={`fa-cart-shopping fa-solid fa-xl me-1 dark:text-white ${numOfCartItems > 0 && 'fa-cart-arrow-down text-main'}`}></i>
                  Cart
                  {numOfCartItems > 0 && (
                    <span className="ml-2 border-x-[3px] px-[5px] rounded-md text-main text-xl border-main font-mono">
                      {numOfCartItems}
                    </span>
                  )}
                </NavLink>
                <NavLink to={'wishlist'} className=" py-1 px-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-main flex items-center justify-center">
                  <i id="wishlist-tab" className={`fa-heart fa-lg me-1 dark:text-white ${numOfwishlistItems > 0 ? 'fa-solid text-red-500' : 'fa-solid'}`}></i>
                  Wishlist
                  {numOfwishlistItems > 0 && (
                    <span className="ml-2 border-x-[3px] px-[5px] rounded-md text-main text-xl border-main font-mono">
                      {numOfwishlistItems}
                    </span>
                  )}
                </NavLink>
              </>
            ) : (
              ''
            )}
          </div>

          {/* Social Media Icon and Account Section */}
          <div className="flex items-center gap-6">
            {/* Social Media Icon */}
            <div className="border-x-[3.5px] px-3 border-main rounded-md overflow-hidden navbar-icons">
              <div
                key={currentIcon}
                className="cursor-pointer flex items-center justify-center animate-slide-right-to-left"
                onClick={openModal}
              >
                <i className={`fa-brands ${currentIcon} text-2xl text-main`}></i>
              </div>
            </div>

            {/* Account Section */}
            <div className="account">
              <ul className="login flex gap-3 border-x-[3.5px] px-3 border-main rounded-md">
                {token ? (
                  <li className="">
                    <span className="cursor-pointer dark:text-white hover:text-main dark:hover:text-main" onClick={logOut}>
                      Sign Out
                    </span>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink to={'login'} className="dark:text-white hover:text-main dark:hover:text-main">Login</NavLink>
                    </li>
                    <li>
                      <NavLink to={'register'} className="dark:text-white hover:text-main dark:hover:text-main">Register</NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Menu Button (for mobile and Tablet) */}
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden " onClick={toggleMobileMenu}>
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm sm:max-w-md h-4/4 dark:bg-gray-900">
                <ul className="flex flex-col items-center space-y-6">
                  <li>
                    <NavLink to={''} className="block py-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-white">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'products'} className="block py-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-main">
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'categories'} className="block py-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-main">
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'brands'} className="block py-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-main">
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'allorders'} className="block py-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-main">
                      My Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'cart'} className="py-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-main flex items-center justify-center">
                      <i id="cart-icon" className={`fa-cart-shopping fa-solid fa-xl me-1 ${numOfCartItems > 0 && 'fa-cart-arrow-down text-main'}`}></i>
                      Cart
                      {numOfCartItems > 0 && (
                        <span className="ml-2 border-x-[3px] px-[5px] rounded-md text-main text-xl border-main font-mono">
                          {numOfCartItems}
                        </span>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'wishlist'} className="py-2 text-gray-900 rounded-sm dark:text-white hover:text-main dark:hover:text-main flex items-center justify-center">
                      <i id="wishlist-tab" className={`fa-heart fa-lg me-1 ${numOfwishlistItems > 0 ? 'fa-solid text-red-500' : 'fa-solid'}`}></i>
                      Wishlist
                      {numOfwishlistItems > 0 && (
                        <span className="ml-2 border-x-[3px] px-[5px] rounded-md text-main text-xl border-main font-mono">
                          {numOfwishlistItems}
                        </span>
                      )}
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Social Media Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-md">
          <div className="bg-white p-9 rounded-lg shadow-lg animate-fade-in md:w-5/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-main font-mono">Follow Us on Social Media</h2>
            <div className="flex gap-2 border-x-[3.5px] px-14 border-main rounded-lg mt-10 modal-icons">
              {socialIcons.map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-3xl md:text-4xl transition-colors inline-block mx-auto"
                >
                   <i className={`fa-brands ${icon}`}></i>
                </a>
              ))}
            </div>
            <button
              onClick={closeModal}
              className="mt-7 bg-main text-white px-8 py-1 rounded-lg hover:bg-opacity-80 transition-colors block mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}