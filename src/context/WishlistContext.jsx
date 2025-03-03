import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { tokenContext } from "./tokenContext";
import { toast } from "react-toastify";



export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
    const Wishlist_API = `https://ecommerce.routemisr.com/api/v1/wishlist`
    const { token: userToken } = useContext(tokenContext)
    const token = userToken || localStorage.getItem("teken") //*Get token from context OR localStorage
    const headers = { token }
    const [wishlist, setWishlist] = useState([])
    const [numOfwishlistItems, setNumOfwishlistItems] = useState(0)
    const [isLoading, setIsLoading] = useState(true); //^Track loading state   
    const [isInWishlist, setIsInWishlist] = useState(false) //^Track if this product is in the wishlist

    useEffect(() => {
        if (token) {
            getUserWishlist();
        }
    }, [token]);

    //^ Fetch the user's wishlist / Get logged user wishlist
    async function getUserWishlist() {
        try {
            setIsLoading(true) //Start loading
            const { data } = await axios.get(Wishlist_API, { headers })
            // console.log(data);
            if (data.status == "success") {

                setWishlist(data.data)
                setNumOfwishlistItems(data.count)
            }
            return data
        } catch (error) {
            console.log(error, "Error Fetching wishlist");
        } finally {
            setIsLoading(false); //Stop loading when done
        }
    }

    //^ Add Product to wishlist
    async function addToWishlist(productId) {
        if (!token) return;
        
        try {
            const { data } = await axios.post(Wishlist_API, { productId }, { headers }
            );
            if (data.status === "success") {
                setWishlist(prevWishlist => [...prevWishlist, { _id: productId }]); //^ Update wishlist state after adding 
                setNumOfwishlistItems(prev => prev + 1) //^Update wishlist count immediately
                toast.success("Product added to Your Wishlist ❤️", { position: "bottom-right", theme: "light" });
            }
            return data;
        } catch (error) {
            console.error(error, "Error adding product to wishlist:");
        }

    }

    //^ Remove Product from wishlist
    async function removeFromWishlist(id) {
        const { data } = await axios.delete(`${Wishlist_API}/${id}`, { headers })

        if (data.status === "success") {
            setWishlist((prevWishlist) => prevWishlist.filter(product => product._id !== id));
            setNumOfwishlistItems(prev => Math.max(0, prev - 1)) //Update wishlist count immediately
            toast.success("Product Removed from Wishlsit 🧹", { position: "bottom-right", theme: "light", type: "success" });
        }


        return data

    }


    return <WishlistContext.Provider value={{ wishlist, getUserWishlist, addToWishlist, removeFromWishlist, numOfwishlistItems, setNumOfwishlistItems, isLoading, isInWishlist, setIsInWishlist }}>
        {children}
    </WishlistContext.Provider>
}

