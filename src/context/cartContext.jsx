import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { tokenContext } from "./tokenContext";
import { toast } from "react-toastify";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [cartId, setCartId] = useState('')
    const [cartDetails, setCartDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const { token } = useContext(tokenContext)
    const CART_API_URL = `https://ecommerce.routemisr.com/api/v1/cart`
    const ORDER_API_URL = `https://ecommerce.routemisr.com/api/v1/orders`
    const headers = {
        token
    }

    useEffect(() => {
        token && getCart()

    }, [token])

    //* Cart_API & Logic:
    //^ Add Product To CART
    async function addToCart(productId) {
        const { data } = await axios.post(CART_API_URL, { productId }, {
            headers
        })
        if (data.status == "success") {
            setNumOfCartItems(data.numOfCartItems)
        }
        return data

    }
    //^ Fetch the user's CART / Get logged user CART
    async function getCart() {
        try {
            setLoading(true)
            const { data } = await axios.get(CART_API_URL, { headers });
            if (data.status == "success") {
                setNumOfCartItems(data.numOfCartItems);
                setCartDetails(data);
                setCartId(data.cartId)
            }
            return data;
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false)
        }
    }
    //^ Remove Product from CART
    async function removeProduct(id) {
        const { data } = await axios.delete(`${CART_API_URL}/${id}`, {
            headers
        })

        if (data.status === "success") {
            setNumOfCartItems(data.numOfCartItems)
        }
        setCartDetails(data)
        if (data.status === "success") {
            toast.success("Product Removed from Cart Successfully 🧹", { position: "bottom-right", theme: "light", type: "success" });
        }
        return data

    }

    async function updateProductCount(id, count) {
        const { data } = await axios.put(`${CART_API_URL}/${id}`, { count }, {
            headers
        })
        if (data.status == "success") {
            setNumOfCartItems(data.numOfCartItems)
        }
        setCartDetails(data)
        if (data.status == "success") {
            toast.success("Product Count Updated Successfully", { position: "top-center", theme: "colored", type: "success", autoClose: 800 });
        }
        return data

    }
    //* Checkout_API & Logic:
    async function cashOnDelivery(shippingAddress) {
        const { data } = await axios.post(`${ORDER_API_URL}/${cartId}`, { shippingAddress }, {
            headers
        })
        if (data.status == "success") {
            getCart()
        }
        return data

    }
    async function onlinePayment(shippingAddress) {
        const { data } = await axios.post(`${ORDER_API_URL}/checkout-session/${cartId}?url=http://localhost:5174`, { shippingAddress }, {
            headers
        })
        return data

    }
    //* Orders_API & Logic:
    async function getUserOrders(id) {
        const { data } = await axios.get(`${ORDER_API_URL}/user/${id}`)
        return data
    }




    return (
        <cartContext.Provider value={{ numOfCartItems, setNumOfCartItems, addToCart, getCart, cartDetails, setCartDetails, removeProduct, updateProductCount, cashOnDelivery, onlinePayment, getUserOrders, headers }} >
            {children}
        </cartContext.Provider>
    )
}