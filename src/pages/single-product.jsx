import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const SingleProduct = ({
  products,
  handleLikeBtnClick,
  wishList,
  shopCart,
  handleShopCartBtnClick,
}) => {
  const { productID } = useParams();
  const selectedProduct = products.find((product) => product._id === productID);

  if (!selectedProduct) {
    return <div className="loader"></div>;
  }

  let {
    bookName,
    originalPrice,
    author,
    discountedPrice,
    description,
    imgSrc,
    imgAlt,
    discountPercent,
    _id,
    isLiked,
    rating,
  } = selectedProduct;

  isLiked =
    wishList.findIndex((wishItem) => wishItem._id === selectedProduct._id) ===
    -1;

  let isShop =
    shopCart.findIndex((shopItem) => shopItem._id === selectedProduct._id) ===
    -1;

  const handleClick = (e) => {
    e.stopPropagation();
    handleLikeBtnClick(_id);
  };

  const handleShop = (e) => {
    e.stopPropagation();
    handleShopCartBtnClick(_id);
  };

  return (
    <div className="flex gap-14 w-[100%] p-24 text-center relative ">
      <img src={imgSrc} alt={imgAlt} className="w-[280px] h-[100%]" />
      <div className=" w-[80%] text-left flex flex-col justify-between">
        <h1 className=" text-4xl border-b border-gray-700 pb-6 mb-6 w-[100%]">
          {bookName}
        </h1>
        <p className=" text-xl font-mono mb-6">
          <span className=" font-bold"> Author:</span> {author}
        </p>
        <p className=" text-xl font-mono  mb-6">
          <span className=" font-bold"> Description:</span> {description}
        </p>
        <p className=" text-xl font-mono  mb-6">
          <span className=" font-bold"> Rating:</span> {rating}
        </p>
        <h2 className=" text-xl flex items-end gap-10">
          Rs. {discountedPrice} <del className="">Rs. {originalPrice} </del>{" "}
          <span className=" text-base text-red-600">
            {" "}
            ({discountPercent}% off)
          </span>
        </h2>
        <div className="flex mt-5 gap-5 w-[100%]">
          <Button
            onClick={handleClick}
            className=" text-white bg-pink-600  w-[100%]"
          >
            {isLiked ? "Add to Wishlist" : "Remove from Wishlist"}
          </Button>
          <Button
            onClick={handleShop}
            className=" text-white bg-yellow-600 w-[100%]"
          >
            {isShop ? "Add to Cart" : "Remove from Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

SingleProduct.propTypes = {
  products: PropTypes.array,
  handleLikeBtnClick: PropTypes.func,
  wishList: PropTypes.any,
  shopCart: PropTypes.any,
  handleShopCartBtnClick: PropTypes.func,
};
