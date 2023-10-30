import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/home.jsx";

import Header from "./components/header.jsx";
import Layout from "./components/layout.jsx";
import SingleProduct from "./pages/single-product.jsx";
import Shop from "./pages/shop.jsx";
import WishList from "./pages/wishlist.jsx";
import { instance } from "./utils/use-request.js";
import Login from "./pages/login.jsx";
import Cart from "./pages/cart.jsx";
import SignUp from "./pages/signup.jsx";
import Order from "./pages/order.jsx";
import Modal from "./components/modal.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [shopCart, setShopCart] = useState([]);
  const [isLogged, setIsLogged] = useState(() =>
    localStorage.getItem("access_token")
  );

  const [showModal, setShowModal] = useState(false);

  const getData = async () => {
    const data = await instance.get("/user");
    if (data.data?.user) {
      setWishList(data.data?.user?.wishlist);
      setShopCart(data.data?.user?.cart);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    (async () => {
      const data = await instance.get("/home/products");
      setProducts(data.data?.productsList);
    })();
    getData();
  }, []);

  const handleLikeBtnClick = async (id) => {
    if (!isLogged) {
      setShowModal(true);
      return;
    }

    const el = wishList.find((wishItem) => wishItem._id === id);

    if (!el) {
      const product = products.find((arr) => arr._id === id);
      setWishList((prev) => [...prev, product]);
      await instance.patch("/wishlist", {
        productdetails: product,
      });
    } else {
      setWishList((prev) => prev.filter((wishItem) => wishItem._id !== id));
      await instance.delete("/wishlist/" + id);
    }
  };

  const handleShopCartBtnClick = async (id) => {
    if (!isLogged) {
      setShowModal(true);

      return;
    }

    const el = shopCart.find((cartItem) => cartItem._id === id);

    if (!el) {
      const product = products.find((arr) => arr._id === id);
      setShopCart((prev) => [...prev, product]);
      await instance.patch("/cart", {
        productdetails: product,
      });
    } else {
      setShopCart((prev) => prev.filter((cartItem) => cartItem._id !== id));
      await instance.delete("/cart/" + id);
    }
  };

  return (
    <BrowserRouter>
      <Layout>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
        <Header
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          wishList={wishList}
          shopCart={shopCart}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                wishList={wishList}
                setWishList={setWishList}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                handleLikeBtnClick={handleLikeBtnClick}
                products={products}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                wishList={wishList}
                setWishList={setWishList}
              />
            }
          />
          <Route
            path="/product/:productID"
            element={
              <SingleProduct
                products={products}
                wishList={wishList}
                handleLikeBtnClick={handleLikeBtnClick}
                shopCart={shopCart}
                handleShopCartBtnClick={handleShopCartBtnClick}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute isLogged={isLogged}>
                <WishList wishList={wishList} getData={getData} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"  
            element={
              <ProtectedRoute isLogged={isLogged}>
                <Cart
                  shopCart={shopCart}
                  setShopCart ={setShopCart}
                  handleLikeBtnClick={handleLikeBtnClick}
                  handleShopCartBtnClick={handleShopCartBtnClick}
                  getData={getData}
                  products={products}
                  wishList={wishList}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute isLogged={isLogged}>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
          <Route
            path="/sign-up"
            element={<SignUp setIsLogged={setIsLogged} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
