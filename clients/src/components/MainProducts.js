import React, { useEffect } from "react";
import { dataMain } from "../dataMain";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productList } from "../feataures/products/productsSlice";

function MainProducts() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productList());
  }, [dispatch]);

  return (
    <div>
      <p className="py-8 text-2xl font-bold text-slate-600">
        Collections of products
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {dataMain.map((item) => (
          <div
            key={item.id}
            className="border-[1px] p-4 text-slate-600 rounded-md  shadow-2xl"
          >
            <div className="flex justify-between w-[300px]">
              <img
                src={item.image}
                alt=""
                className="w-[100px] h-[100px] p-4 bg-slate-300 rounded-md"
              />
              <p className="text-sm">
                {" "}
                {products
                  .filter((x) => x.category === item.type)
                  .reduce((acc, val) => acc + val.countInStock, 0)}{" "}
                products
              </p>
            </div>
            <div className="mt-4 flex justify-between items-end">
              <div>
                <p className="font-light text-md">Manufacturar</p>
                <p className="font-bold">{item.name}</p>
              </div>
              <Link
                to={`${item.link}`}
                className="font-light rounded-md border-[1px] p-2 bg-slate-200 hover:bg-teal-600 hover:text-white transition-all"
              >
                see collections
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainProducts;
