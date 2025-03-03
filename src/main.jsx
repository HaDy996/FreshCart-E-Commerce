import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'flowbite/dist/flowbite.min.js'
import './index.css'
import App from './App.jsx'
import TokenContextProvider from './context/tokenContext.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CounterContextProvider from './context/CounterContext.jsx'
import CartContextProvider from './context/cartContext.jsx'
import WishlistContextProvider from './context/WishlistContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenContextProvider>
      <CartContextProvider>
        <CounterContextProvider>
          <WishlistContextProvider>
            <App />
          </WishlistContextProvider>
        </CounterContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  </StrictMode>,
)
