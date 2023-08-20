import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Heading1 from "../../components/common/text/Heading1/Heading";
import WishListItem from "./WishListItem";
import PrimaryText from "../../components/common/text/PrimaryText/PrimaryText";
import { useAddToCart } from "../../libs/business-logic/src/lib/cart/process/hooks";
import { toast } from "react-hot-toast";
import { useWishlist } from "../../libs/business-logic/src/lib/wishlist/process/hooks";

const WishList = () => {
  const { getWishlist, removeFromWishlist } = useWishlist();
  const products = getWishlist();
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("None");
  const { onAddToCart } = useAddToCart();

  useEffect(() => {
    setFilterData(products);
  }, [products]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onOrderChange = (e) => {
    setSelectedOrder(e.target.value);
  };

  const renderOrderOptions = () => {
    const options = ["None", "Increase", "Decrease"];
    return options.map((option) => (
      <div key={option}>
        <input
          type="radio"
          id={option}
          name="order"
          value={option}
          checked={selectedOrder === option}
          onChange={onOrderChange}
        />
        <label htmlFor={option}>{option}</label>
      </div>
    ));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const filteredData = products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    let sortedData = filteredData.slice();

    if (selectedOrder === "Increase") {
      sortedData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (selectedOrder === "Decrease") {
      sortedData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    setFilterData(sortedData);
  };

  //add Logic
  const handleDelete = (id) => {
    removeFromWishlist(id)
      .then((msg) => toast.success(msg))
      .catch((err) => console.error(err));
  };
  //add Logic
  const handleAddToCart = (item) => {
    onAddToCart({ item, quantity: 1 })
      .then((msg) => toast.success(msg))
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Heading1>Your WishList</Heading1>

        <form onSubmit={onSubmit}>
          <div className={styles.order}>
            <p>Price Order:</p>
            {renderOrderOptions()}
          </div>

          <div className={styles.search}>
            <input
              value={search}
              type="text"
              onChange={onChange}
              placeholder="Search"
            />
            <button type="submit">
              <i className="fi fi-rr-search"></i>
            </button>
          </div>
        </form>

        {filterData && filterData.length > 0 ? (
          filterData.map((item) => (
            <WishListItem
              key={item.id}
              data={item}
              addToCart={() => handleAddToCart(item)}
              deleteItem={() => handleDelete(item.id)}
            />
          ))
        ) : (
          <PrimaryText
            style={{ textTransform: "uppercase", fontSize: "1.5rem" }}
          >
            No items in your wishlist...
          </PrimaryText>
        )}
      </div>
    </div>
  );
};

export default WishList;
