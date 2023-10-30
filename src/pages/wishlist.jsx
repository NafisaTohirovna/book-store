import PropTypes from "prop-types";
import Card from "@/components/card";
import { useEffect } from "react";
import { instance } from "@/utils/use-request";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function WishList({ getData, wishList }) {
  // const [data, setData] = useState([])
  // const getData = async () => {
  //   const data = await instance.get('/user')
  //   setData(data.data?.user?.wishlist)
  // }
  const click = async (id) => {
    await instance.delete("/wishlist/" + id);
    getData();
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h2 className=" w-[100%]   text-center my-9 text-3xl">
        {wishList?.length} items in Wishlist
      </h2>
      <div className="flex  mt-5 flex-wrap gap-10 ">
        {wishList?.length ? (
          wishList.map((wishItem) => (
            <Card key={wishItem._id} {...wishItem} handleLikeBtnClick={click} />
          ))
        ) : (
          <div className=" text-center w-[100%] mt-[100px]">
            <h2 className="text-4xl">Your wishlist is empty 🙃 </h2>
            <Button className="mt-10 bg-red-500">
              <Link to={"/shop"}>Go to shop</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default WishList;

WishList.propTypes = {
  getData: PropTypes.func,
  wishList: PropTypes.array,
};
