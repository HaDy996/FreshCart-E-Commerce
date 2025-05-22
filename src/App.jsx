import { useContext, useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Home from './Components/Home/Home'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Products from './Components/Products/Products'
import NotFound from './Components/NotFound/NotFound'
import { tokenContext } from './context/tokenContext'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import { AuthView } from './Components/AuthView/AuthView'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import Checkout from './Components/Checkout/Checkout'
import AllOrders from './Components/AllOrders/AllOrders'
import Wishlist from './Components/Wishlist/Wishlist'
import SelectedCategory from './Components/SelectedCategory/SelectedCategory'
import SelectedBrand from './Components/SelectedBrand/SelectedBrand'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'
import PaymentSuccess from './Components/PaymentSuccess/PaymentSuccess'
import PaymentRedirect from './Components/PaymentRedirect/PaymentRedirect'
import { DarkModeProvider } from './Context/DarkModeContext'
import DarkModeToggle from './Components/Shared/DarkModeToggle/DarkModeToggle'


function App() {
  let { setToken } = useContext(tokenContext)
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"))
    }
  }, [])

  const routes = createHashRouter([
    {
      path: "", element: <LayOut />, children: [
        {
          index: true, element: <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        },
        {
          path: "home", element: <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        },
        {
          path: "cart", element:
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
        },
        {
          path: "categories", element:
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
        },
        {
          path: "/category/:categoryId", element:
            <ProtectedRoutes>
              <SelectedCategory />
            </ProtectedRoutes>
        },
        {
          path: "brands", element:
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
        },
        {
          path: "/brands/:brandId", element:
            <ProtectedRoutes>
              <SelectedBrand />
            </ProtectedRoutes>
        },
        {
          path: "register", element: <AuthView>
            <Register />
          </AuthView>
        },
        {
          path: "login", element: <AuthView>
            <Login />
          </AuthView>
        },
        {
          path: "products", element:
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
        },
        {
          path: "checkout", element:
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
        },
        {
          path: "wishlist", element:
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
        },
        {
          path: "allorders", element:
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
        },
        {
          path: "productDetails/:id/:categoryId", element:
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
        },
        {path:"/forgot-password", element: <ForgotPassword />},
        {
          path: "payment-success", element:
            <ProtectedRoutes>
              <PaymentSuccess />
            </ProtectedRoutes>
        },
        {
          path: "payment-success/allorders", element:
            <ProtectedRoutes>
              <PaymentRedirect />
            </ProtectedRoutes>
        },
        { path: "*", element: <NotFound /> }
      ]
    }
  ])

  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <RouterProvider router={routes} />
        <ToastContainer />
        <ScrollToTop />
        <DarkModeToggle />
      </div>
    </DarkModeProvider>
  )
}

export default App

