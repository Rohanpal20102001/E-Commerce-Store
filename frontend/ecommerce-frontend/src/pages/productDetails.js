import React from "react";

const productDetails = ({ match }) => {
  const productId = match.params.id;

  // Fetch product details based on productId

  return (
    <div>
      <h1>Product Details</h1>
      {/* Display the product details here */}
    </div>
  );
};

export default productDetails;
