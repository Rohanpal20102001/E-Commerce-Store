import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Make a GET request to the protected admin route
    const fetchAdminData = async () => {
      try {
        const response = await axios.get("/api/admin");
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response.data.message);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>{message}</p>
    </div>
  );
};

export default Admin;
