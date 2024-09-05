import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screen/HomeScreen";
import SideBar from "./components/SideBar";
import ProductScreen from "./screen/ProductScreen";
import CreateScreen from "./screen/CreateScreen";
import UpdateScreen from "./screen/UpdateScreen";
import OrderListScreen from "./screen/OrderListScreen";
import OrderDetails from "./screen/OrderDetails";
import OrderTracking from "./screen/OrderTracking";
import ProductReportList from "./screen/ProductReportList";

function App() {
  return (
    <div className="flex gap-2 relative max-w-6xl mx-auto">
      <div className="invisible absolute md:relative md:visible">
        <SideBar />
      </div>
      <div className="w-full bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/Product/list" element={<ProductScreen />}></Route>
          <Route path="/Product/list/report" element={<ProductReportList />}></Route>
          <Route path="/Product/create" element={<CreateScreen />}></Route>
          <Route path="/Product/update/:id" element={<UpdateScreen />}></Route>
          <Route path="/orders/list" element={<OrderListScreen />}></Route>
          <Route path="/orders/details/:id" element={<OrderDetails />}></Route>
          <Route path="/orders/details/:id/tracking" element={<OrderTracking />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
