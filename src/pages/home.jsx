import PropTypes from "prop-types";
import Genres from "@/components/genres";
import NewArrivals from "@/components/new-arrivals";

function Home({ selectedGenres, setSelectedGenres, wishList, setWishList }) {
  return (
    <div className="mt-[50px]">
      <div className='h-[70vh] w-[100%] bg-[url("/public/Banner.png")] bg-no-repeat  bg-center bg-cover rounded-[20px] '>
        <h2 className="p-[90px] text-7xl text-white font-bold "><span className=" text-[#F0B861]">25% discount</span> <br /> all Paulo Coelho <br /> books!</h2>
      </div>
      <h2 className=" font-mono text-4xl text-center m-[70px]">Genres</h2>
      <Genres
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <h2 className=" font-mono text-4xl text-center m-[70px]">New Arrivals</h2>
      <NewArrivals setWishList={setWishList} wishList={wishList} />
    </div>
  );
}
export default Home;

Home.propTypes = {
  selectedGenres: PropTypes.array,
  setSelectedGenres: PropTypes.func,
  wishList: PropTypes.array,
  setWishList: PropTypes.func,
};
