import React, { useEffect, useState } from 'react'
import styles from './RelatedProducts.module.css'
import axios from 'axios';
import ProductItem from '../../../Shared/ProductItem/ProductItem';
import Loader from '../../../Shared/Loader/Loader';


export default function RelatedProducts(props) {
  const [relatedProducts, setRelatedProducts] = useState([])
  let { categoryId, id } = props
  console.log(categoryId, "This is categoryId");

  function getAllProducts() {
    axios.get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        console.log(data.data);
        let res = data.data.filter(product => product.category._id == categoryId)
        console.log(res);
        setRelatedProducts(res)
      })
      .catch(err => {
        console.log(err);

      })
  }

  useEffect(() => {
    if (categoryId) {
      getAllProducts();
    }
  }, [id, categoryId])

  return (
    <>
      {relatedProducts == 0 && <Loader />}
      {relatedProducts != 0 && <div className='main-Layout'>
        {relatedProducts.map(product => <ProductItem product={product} />)}
      </div>}
    </>
  )
}
