import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./administrator/Adminlogin/Login";
import Dashboard from "./administrator/Adminlogin/dashboard";
import Home from './userinterface/screen/Home';
import SelectProduct from "./userinterface/screen/SelectProduct";
import ProductViewWithCategory from './userinterface/screen/ProductViewWithCategory';
import Cart from './userinterface/screen/Cart/Cart'

function App() {
  return (
    <div>
    
      <Router>
        <Routes>
         
          <Route element={<Login />} path="/Login" />
          <Route element={<Dashboard />} path="/dashboard/*" />
          <Route element={<Home />} path="/Home" />
         <Route element={<ProductViewWithCategory/>} path="/ProductViewWithCategory"/>
         <Route element={<SelectProduct />} path="/selectproduct" />
         <Route element={<Cart />} path="/cart" />

        </Routes>
      </Router>


    </div>
  );
}

export default App;
