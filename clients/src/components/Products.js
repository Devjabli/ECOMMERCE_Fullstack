import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productList } from '../feataures/products/productsSlice'

function Products() {
 const dispatch = useDispatch()
 const {loading, products, error} = useSelector(state => state.products)

 useEffect(() => {
  dispatch(productList())
 },[dispatch])
  return (
    <div>
        <div>
            {/**
             * 
             */
             products.map((product) => (
               <div key={product._id}>
               <img src={product.image} alt={product.name} />
               </div>
               ))
            }
        </div>
    </div>
  )
}

export default Products