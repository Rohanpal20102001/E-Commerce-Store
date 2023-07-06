import React from "react";
import "./ProductList.css";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product" key={product.id}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <button>Add to Cart</button>
          <button>Add to Wishlist</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
