import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Order = () => {
  return (
    <div>
      <h2 className=" w-[100%]   text-center my-9 text-3xl">
        0 items in Orders
      </h2>
      <div className=" text-center w-[100%] mt-[100px]">
        <h2 className="text-4xl">You have not placed any orders</h2>
        <Button className="mt-10 bg-red-500">
          <Link to={"/shop"}>Go to shop</Link>
        </Button>
      </div>
    </div>
  );
};

export default Order;
