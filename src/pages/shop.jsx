import PropTypes from "prop-types";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import Card from "@/components/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { genres } from "@/constants/genre";

function Shop({
  products,
  selectedGenres,
  setSelectedGenres,
  handleLikeBtnClick,
  wishList,
}) {
  const [sliderValues, setSliderValues] = useState({
    min: 0,
    max: 0,
  });
  const [range, setRange] = useState([sliderValues?.min, sliderValues?.max]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedRating, setSelectedRating] = useState("4");
  const [sortBy, setSortBy] = useState("lowToHigh");

  const handleRangeChange = (value) => {
    setRange(value);
  };

  useEffect(() => {
    if (!selectedGenres.length) {
      setSelectedGenres([...genres]);
    }
  }, []);
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (products.length) {
      setSliderValues(
        products.reduce(
          (acc, curr) =>
            curr.originalPrice > acc.max
              ? { ...acc, max: curr.originalPrice }
              : acc,
          { min: 0, max: 0 }
        )
      );
    }
  }, [products]);

  useEffect(() => {
    let newProducts = products.filter(
      (product) =>
        (product.discountedPrice >= range[0] ||
          product.originalPrice >= range[0]) &&
        (product.discountedPrice <= range[1] ||
          product.originalPrice <= range[1])
    );

    newProducts = newProducts.filter(
      (pr) =>
        selectedGenres.findIndex(
          (gr) => gr.title.toUpperCase() == pr.genre.toUpperCase()
        ) !== -1
    );

    setFilteredProducts([...newProducts]);
  }, [range, selectedGenres]);

  useEffect(() => {
    setRange([sliderValues.min, sliderValues.max]);
  }, [sliderValues]);

  const handleGenreChange = (title) => {
    const currentGrIdx = selectedGenres.findIndex((gr) => gr.title == title);
    if (currentGrIdx === -1) {
      setSelectedGenres((prev) => [...prev, { title }]);
    } else {
      selectedGenres.splice(currentGrIdx, 1);
      setSelectedGenres([...selectedGenres]);
    }
  };
  const onClear = () => {
    setSelectedGenres([...genres]);
    setRange([0, sliderValues.max]);
    setSelectedRating("4");
    setSortBy("lowToHigh");
  };

  useEffect(() => {
    let minRating = parseInt(selectedRating);
    let newProducts = products.filter((product) => product.rating >= minRating);

    newProducts = newProducts.filter(
      (pr) =>
        selectedGenres.findIndex(
          (gr) => gr.title.toUpperCase() == pr.genre.toUpperCase()
        ) !== -1
    );

    setFilteredProducts([...newProducts]);
  }, [selectedRating, selectedGenres]);

  useEffect(() => {
    let minRating = parseInt(selectedRating);
    let newProducts = products.filter((product) => product.rating >= minRating);

    newProducts = newProducts.filter(
      (pr) =>
        selectedGenres.findIndex(
          (gr) => gr.title.toUpperCase() == pr.genre.toUpperCase()
        ) !== -1
    );

    if (sortBy === "lowToHigh") {
      newProducts.sort((a, b) => a.originalPrice - b.originalPrice);
    } else if (sortBy === "highToLow") {
      newProducts.sort((a, b) => b.originalPrice - a.originalPrice);
    }

    setFilteredProducts([...newProducts]);
  }, [selectedRating, selectedGenres, sortBy]);

  return (
    <div className=" flex justify-between">
      <div className="w-[350px] p-10 block  h-[80vh] overflow-y-auto my-5">
        <div className="flex justify-between mb-10 items-end">
          <h2 className=" text-2xl">Filters</h2>
          <ins onClick={onClear} className=" cursor-pointer">
            Clear Filter
          </ins>
        </div>
        <h2 className=" text-2xl mt-[60px] mb-3">Price</h2>
        <Slider
          defaultValue={[sliderValues.min, sliderValues.max]}
          max={sliderValues?.max}
          min={0}
          step={1}
          value={range}
          onValueChange={handleRangeChange}
          formatLabel={(value) => `${value} `}
        />
        <h2 className=" text-2xl mt-[60px] mb-3">Category</h2>
        <div>
          {genres.map((genre) => (
            <div className="flex items-center space-x-2 mt-2" key={genre.title}>
              <Checkbox
                id={genre.title}
                checked={
                  selectedGenres.findIndex((gr) => gr.title == genre.title) !==
                  -1
                }
                onCheckedChange={() => handleGenreChange(genre.title)}
              />
              <Label
                htmlFor={genre.title}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {genre.title}
              </Label>
            </div>
          ))}
        </div>
        <h2 className="text-2xl mt-[60px] mb-3">Rating</h2>
        <label className="block mb-2">
          <input
            type="radio"
            value="4"
            checked={selectedRating === "4"}
            onChange={() => setSelectedRating("4")}
          />
          4 stars or above
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            value="3"
            checked={selectedRating === "3"}
            onChange={() => setSelectedRating("3")}
          />
          3 stars or above
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            value="2"
            checked={selectedRating === "2"}
            onChange={() => setSelectedRating("2")}
          />
          2 stars or above
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            value="1"
            checked={selectedRating === "1"}
            onChange={() => setSelectedRating("1")}
          />
          1 star or above
        </label>

        <h2 className="text-2xl mt-[60px] mb-3">Sort By</h2>
        <label className="block mb-2">
          <input
            type="radio"
            value="lowToHigh"
            checked={sortBy === "lowToHigh"}
            onChange={() => setSortBy("lowToHigh")}
          />
          Price - Low to High
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            value="highToLow"
            checked={sortBy === "highToLow"}
            onChange={() => setSortBy("highToLow")}
          />
          Price - High to Low
        </label>
      </div>

      <div className=" w-[1400px] text-center">
        <h2 className=" text-3xl font-mono mt-7">
          Showing {filteredProducts.length} products
        </h2>

        <div className="flex mt-8 gap-5 justify-center flex-wrap">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <Card
                key={product._id}
                {...product}
                handleLikeBtnClick={handleLikeBtnClick}
                isLiked={
                  wishList.findIndex(
                    (wishItem) => wishItem._id === product._id
                  ) === -1
                }
              />
            ))
          ) : (
            <h1>Not found</h1>
          )}
        </div>
      </div>
    </div>
  );
}
export default Shop;

Shop.propTypes = {
  sliderValues: PropTypes.object,
  setSliderValues: PropTypes.func,
  products: PropTypes.array,
  selectedGenres: PropTypes.array,
  setSelectedGenres: PropTypes.func,
  handleLikeBtnClick: PropTypes.func,
  wishList: PropTypes.array,
};
