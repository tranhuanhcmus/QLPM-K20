import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Heading1 from "../../components/common/text/Heading1/Heading";
import WishListItem from "./WishListItem";
import PrimaryText from "../../components/common/text/PrimaryText/PrimaryText";
import { Images } from "../../components/common/Cart/image";

const products = [
  {
    productId: 1,
    price: "110.00",
    name: "Original Vest 1",
    number: 1,
    image: Images.item,
  },
  {
    productId: 6,
    price: "160.00",
    name: "Original Vest 2",
    number: 1,
    image: Images.item,
  },
  {
    productId: 7,
    price: "170.00",
    name: "as Vest 3",
    number: 1,
    image: Images.item,
  },
  {
    productId: 8,
    price: "180.00",
    name: "Trouser",
    number: 1,
    image: Images.item,
  },
];

const WishList = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("None"); 

  //add Logic
  useEffect(() => {
    setData(products);
  }, []);

  useEffect(() => {
    setFilterData(data);
  }, [data]);

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
    const filteredData = data.filter((item) =>
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
  const onDelete = (id) => {
    const updatedData = data.filter((item) => item.productId !== id);
    setData(updatedData);
  };
  //add Logic
  const onAddToCart = (id) => {
    const updatedData = data.map((item) =>
      item.productId === id ? { ...item, number: 1 } : item
    );
    setData(updatedData);
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

        {filterData.length > 0 ? (
          filterData.map((item) => (
            <WishListItem
              key={item.productId}
              data={item}
              addToCart={onAddToCart}
              deleteItem={onDelete}
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
