import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function Header({ isLogged, setIsLogged, wishList, shopCart }) {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("access_token");
    setIsLogged(false);
    navigate("/");
  };

  return (
    <header className="flex justify-between py-6 px-2  border-b-2 fixed top-0 w-[90%] bg-white z-30">
      <Link to={"/"}>
        {" "}
        <img src="/Logo.svg" alt="" />{" "}
      </Link>
      <div>
        {isLogged ? (
          <div className=" flex gap-5">
            <Link
              to={"/shop"}
              className="rounded-full bg-[#6251DD] text-white w-10 h-10 flex items-center justify-center"
            >
              <i className="fa-solid fa-shop "></i>
            </Link>
            <Link
              to={"/wishlist"}
              className="rounded-full bg-[#6251DD] text-white  w-10 h-10 flex items-center justify-center text-lg relative"
            >
              <span
                className={`w-5 h-5 bg-red-500 absolute top-[-5px] right-[-5px] rounded-full flex items-center justify-center text-sm ${
                  wishList.length ? "block" : "hidden"
                }`}
              >
                {wishList.length ? wishList.length : ""}
              </span>
              <i className="fa-regular fa-heart "></i>
            </Link>
            <Link
              to={"/cart"}
              className="rounded-full bg-[#6251DD] text-white  w-10 h-10 flex items-center justify-center relative"
            >
              <span
                className={`w-5 h-5 bg-red-500 absolute top-[-5px] right-[-5px] rounded-full flex items-center justify-center text-sm ${
                  shopCart.length ? "block" : "hidden"
                }`}
              >
                {shopCart.length ? shopCart.length : ""}
              </span>
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
            <Link
              to={"/order"}
              className="rounded-full bg-[#6251DD] text-white  w-10 h-10 flex items-center justify-center"
            >
              <i className="fa-solid fa-bag-shopping"></i>
            </Link>
            <Button onClick={onLogout}>Logout</Button>
          </div>
        ) : (
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
export default Header;

Header.propTypes = {
  isLogged: PropTypes.any,
  setIsLogged: PropTypes.func,
  wishList: PropTypes.array,
  shopCart: PropTypes.array,
};
