import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsFlitered from "../ProductsFlitered";
import { productList } from "../../feataures/products/productsSlice";

function Bags() {
  /*
  */
  const dispatch = useDispatch();
  
  const { products } = useSelector((state) => state.products);
  
  const BagsFilter = products.filter((item) => item.category === "BG");
  
  useEffect(() => {
    dispatch(productList());
  }, [dispatch]);

  return (
    <div>
      <div className="mt-8">
        <p className="text-2xl font-bold text-slate-500 py-8">
          Collection of Jackets
        </p>
        <div className="flex flex-wrap justify-center gap-3">
           
          {
            BagsFilter.map((product) => (
              <ProductsFlitered key={product._id} product={product} />
              ))
             
          }
        </div>
      </div>
    </div>
  );
}

export default Bags;
