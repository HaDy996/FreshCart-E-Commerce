import React, { useEffect, useState } from 'react'
import styles from './ScrollToTop.module.css'
import { motion, AnimatePresence } from 'framer-motion';
import { flushSync } from 'react-dom';


export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  //^Show button when page is scrolled down
  function toggleVisibility () {
    if (window.scrollY > 300 || window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  //^Scroll to top of the page 
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  //^Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.scrollToTop}>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className={styles.scrollButton}
            aria-label="Scroll to top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <i class="fa-solid fa-arrow-up text-white text-2xl"></i>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};