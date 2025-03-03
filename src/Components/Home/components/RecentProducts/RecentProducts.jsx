import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../../../Shared/ProductItem/ProductItem';
import Loader from '../../../Shared/Loader/Loader';
import { cartContext } from '../../../../context/cartContext';
import { wishlistContext } from '../../../../context/WishlistContext';
import { toast } from 'react-toastify';

export default function RecentProducts() {
  let [products, setProducts] = useState([]);
  let { addToCart } = useContext(cartContext);
  let { wishlist } = useContext(wishlistContext); //^Get wishlist from context
  const [loading, setLoading] = useState({}); //^track loading state for each product

  function getAllProducts() {
    axios.get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setProducts(data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function addProductToCart(id) {
    setLoading(prev => ({ ...prev, [id]: true }));

    let data = await addToCart(id);
    if (data.status === "success") {
      toast.success("Product Added to Cart Successfully", { position: "bottom-center", theme: "colored", autoClose: 800 });
    }
    setLoading(prev => ({ ...prev, [id]: false })); //^ Reset loading after response
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <h2 className='text-main text-2xl mb-6 font-bold border-x-[3.5px] border-main px-2 rounded-md inline-block'>Recent Products</h2>
      {products.length === 0 && <Loader />}
      {products.length !== 0 && (
        <div className='main-Layout my-5'>
          {products.map(product => (
            <ProductItem product={product} addProductToCart={addProductToCart} isLoading={loading[product.id]} wishlist={wishlist}
            />
          ))}
        </div>
      )}
    </>
  );
}
