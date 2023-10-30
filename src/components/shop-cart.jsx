import PropTypes from "prop-types";
import { Button } from "./ui/button";

const ShopCart = ({
  bookName,
  originalPrice,
  author,
  discountedPrice,
  imgSrc,
  imgAlt,
  badgeText,
  discountPercent,
  _id,
  handleLikeBtnClick,
  handleShopCartBtnClick,
  quantity,
  handleIncreaseQuantity, 
  handleDecreaseQuantity,
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    handleLikeBtnClick(_id);
  };
  const handleClickShop = (e) => {
    e.stopPropagation();
    handleShopCartBtnClick(_id);
  };

  return (
    <div className=" flex border w-[500px] bg-[#F4F4FF] border-[rgba(9, 9, 55, 0.10)] transition-all cursor-pointer p-[20px] text-center relative hover:shadow-xl ">
      <span
        className={` absolute top-0 left-0 rounded-none p-1 bg-red-600 text-white`}
      >
        {badgeText}
      </span>
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-[200px] mx-auto mt-2 h-[300px] object-contain"
      />
      <div className="flex flex-col p-[40px]">
        <h3 className="text-3xl">{bookName}</h3>
        <span className="my-4 block text-2xl ">by {author}</span>
        <div className="flex justify-between items-center">
          <p className="text-[#6251DD] ">R.S {discountedPrice}</p>
          <del>R.S {originalPrice}</del>
          <span className="text-red-500 text-[12px]">({discountPercent}%)</span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <button onClick={() => handleDecreaseQuantity(_id)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleIncreaseQuantity(_id)}>+</button>
        </div>

        <Button
          onClick={handleClickShop}
          className=" text-white bg-yellow-600 w-[100%] my-2 "
        >
          Remove from Cart
        </Button>
        <Button
          onClick={handleClick}
          className=" text-white bg-pink-600  w-[100%]  "
        >
          Remove wishList
        </Button>
      </div>
    </div>
  );
};

export default ShopCart;

ShopCart.propTypes = {
  bookName: PropTypes.string,
  originalPrice: PropTypes.number,
  author: PropTypes.string,
  discountedPrice: PropTypes.number,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  badgeText: PropTypes.string,
  discountPercent: PropTypes.number,
  _id: PropTypes.string,
  genre: PropTypes.string,
  handleLikeBtnClick: PropTypes.func,
  handleShopCartBtnClick: PropTypes.func,
  quantity: PropTypes.number,
  handleIncreaseQuantity: PropTypes.func,
  handleDecreaseQuantity: PropTypes.func,
};
