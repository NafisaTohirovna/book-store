import PropTypes from "prop-types";
import { useEffect } from "react";
import { instance } from "@/utils/use-request";
import ShopCart from "@/components/shop-cart";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Cart({ getData, shopCart, setShopCart }) {
  const handleLikeBtnClick = async (id) => {
    await instance.delete("/wishlist/" + id);
    getData();
  };

  const handleShopCartBtnClick = async (id) => {
    await instance.delete("/cart/" + id);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  let discount = 0;
  let total = 0;

  {
    shopCart.map((cart) => {
      discount = cart.originalPrice - cart.discountedPrice + discount;
      total = cart.discountedPrice + total;
    });
  }
  console.log(shopCart);

  const handleIncreaseQuantity = (itemId) => {
    setShopCart((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (itemId) => {
    setShopCart((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div>
      <h2 className=" w-[100%]   text-center my-9 text-3xl">
        {shopCart?.length} items in Cart
      </h2>
      <div className="flex  mt-5 flex-col gap-10">
        {shopCart?.length ? (
          <div className="flex gap-[100px] items-start">
            <div className=" flex flex-col gap-5">
              {shopCart.map((cart) => (
                <ShopCart
                  key={cart._id}
                  {...cart}
                  handleLikeBtnClick={handleLikeBtnClick}
                  handleShopCartBtnClick={handleShopCartBtnClick}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                />
              ))}
            </div>
            <div className="border w-[400px] text-center ">
              <h2 className="text-center my-4 text-2xl ">Bill Details</h2>
              <hr />
              {shopCart.map((cart) => (
                <div key={cart._id} className=" m-5 flex justify-between ">
                  <span className=" text-lg">{cart.bookName}</span>
                  <span>₹{cart.discountedPrice}</span>
                </div>
              ))}
              <hr />

              <div className=" m-5 flex justify-between ">
                <span className=" text-lg">Discount</span>
                <span>₹{discount}</span>
              </div>
              <div className=" m-5 flex justify-between ">
                <span className=" text-lg">Delivery Charges</span>
                <span>₹50</span>
              </div>
              <hr />
              <div className=" m-5 flex justify-between">
                <span className=" text-lg font-bold">Total Charges </span>
                <span className=" font-bold">₹{total}</span>
              </div>
              <hr />
              <Button className=" my-4">Place Order</Button>
            </div>
          </div>
        ) : (
          <div className=" text-center w-[100%] mt-[100px]">
            <h2 className="text-4xl">Your cart is empty 🙃 </h2>
            <Button className="mt-10 bg-red-500">
              <Link to={"/shop"}>Go to shop</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Cart;

Cart.propTypes = {
  wishList: PropTypes.array,
  shopCart: PropTypes.array,
  setWishList: PropTypes.func,
  getData: PropTypes.func,
  products: PropTypes.array,
  setShopCart: PropTypes.func,
};
