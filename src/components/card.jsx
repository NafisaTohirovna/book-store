import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Card({
  bookName,
  originalPrice,
  author,
  discountedPrice,
  imgSrc,
  imgAlt,
  badgeText,
  discountPercent,
  _id,
  isLiked,
  handleLikeBtnClick,
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    handleLikeBtnClick(_id);
    // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  };
  return (
    <div
      className="w-[250px] h-[380px]  border bg-[#F4F4FF] border-[rgba(9, 9, 55, 0.10)] transition-all cursor-pointer p-[20px] text-center relative hover:shadow-xl  "
      onClick={() => navigate("/product/" + _id)}
    >
      <span
        className={` absolute top-0 left-0 rounded-none p-1 bg-red-600 text-white`}
      >
        {badgeText}
      </span>
      <span
        onClick={handleClick}
        className={` absolute top-0 right-1 rounded-none text-xl`}
      >
        <i
          className={`${
            isLiked ? "fa-regular" : "fa-solid text-red-600 "
          } fa-heart`}
        ></i>
      </span>
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-[150px] mx-auto mt-2 h-[200px] object-contain"
      />
      <h3>{bookName}</h3>
      <span className="my-4 inline-block ">by {author}</span>
      <div className="flex justify-between items-center">
        <p className="text-[#6251DD] ">R.S {discountedPrice}</p>
        <del>R.S {originalPrice}</del>
        <span className="text-red-500 text-[12px]">({discountPercent}%)</span>
      </div>
    </div>
  );
}
export default Card;

Card.propTypes = {
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
  isLiked: PropTypes.any,
  handleLikeBtnClick: PropTypes.func,
};
