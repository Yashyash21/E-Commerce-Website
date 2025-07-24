import { useEffect } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import api from "../../api";

const CartPage = () => {

    useEffect(function(){
  const cart_code = localStorage.getItem("cart_code");

  api.get(`get_cart?cart_code=${cart_code}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error("Error fetching cart:", err.message);
    });
}, []);


  return (
    <div
      className="container my-3 py-3"
      style={{ height: "80vh", overflow: "scroll" }}>
      <h5 className="mb-4">Shopping Cart</h5>
      <div className="row">
        <div className="col-md-8">
        <CartItem />
        </div>

        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
