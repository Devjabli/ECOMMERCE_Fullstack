import { Routes, Route, useLocation } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import Shoes from "./components/ScreenProducts/Shoes";
import Jackets from "./components/ScreenProducts/Jackets";
import Bags from "./components/ScreenProducts/Bags";
import Tshirts from "./components/ScreenProducts/Tshirts";
import CartScreen from "./screens/CartScreen";
import WishListScreen from "./screens/WishListScreen";
import LoginScreen from "./screens/LoginScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import PageNotFound from "./screens/PageNotFound";
import PlaceOrder from "./screens/PlaceOrder";
import OrderScreen from "./screens/OrderScreen";
import PrivateRoutes from "./PrivateRoutes";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );
  const { itemList } = useSelector((state) => state.wish);
  const { userInfo } = useSelector((state) => state.authUser);

  const location = useLocation();

  useEffect(() => {

    const allItems = {
      cartItems,
      shippingAddress,
      paymentMethod,
      itemList,
      userInfo,
    };

    for (const k in allItems) {
      localStorage.setItem(k, JSON.stringify(allItems[k]));
    }
  }, [cartItems, itemList, shippingAddress, paymentMethod, userInfo]);

  return (
    <>
      {location.pathname !== '/login' && <Header/>}
      <div className="max-w-7xl px-4 mx-auto">
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route element={<PrivateRoutes/>}>
            <Route path="/order" element={<OrderScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrder />}></Route>
          </Route>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route path="/shoes" element={<Shoes />}></Route>
          <Route path="/jackets" element={<Jackets />}></Route>
          <Route path="/bags" element={<Bags />}></Route>
          <Route path="/tshirts" element={<Tshirts />}></Route>
          <Route path="/cart" element={<CartScreen />}></Route>
          <Route path="/wish_list" element={<WishListScreen />}></Route>
          <Route path="/product/:id" element={<ProductDetailScreen />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
