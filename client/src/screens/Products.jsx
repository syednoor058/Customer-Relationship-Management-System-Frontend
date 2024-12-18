/* eslint-disable react/prop-types */
// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { FcShop } from "react-icons/fc";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

function ProductCard({ item }) {
  return (
    <div className="flex flex-col gap-2 bg-gray-200 rounded-md p-5">
      <div className="text-4xl">
        <FcShop />
      </div>
      <div className="text-2xl font-semibold">{item.name}</div>
      <div className="text-[#1b1b1b] font-light flex-1">{item.description}</div>
      <div className="flex flex-row justify-between">
        <div className="">Price: {item.price}</div>
        <div>Quantity: {item.quantity}</div>
      </div>
    </div>
  );
}

export default function Products() {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchInventory = async () => {
      if (!token) {
        setError("You need to log in first");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/inventory", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.inventory) {
          setInventory(response.data.inventory);
        } else {
          setError("No inventory data available");
        }
      } catch (err) {
        setError("Failed to fetch inventory");
        console.error(err);
      } finally {
        setIsLoading(false); // End loading after the request completes
      }
    };

    fetchInventory();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <div className="text-2xl font-semibold flex-1">All Products</div>
        <Link
          to="/"
          className="px-3 py-2 rounded-md bg-accentColor text-primaryColor flex flex-row gap-2 items-center"
        >
          <span>
            <HiOutlinePlusCircle />
          </span>
          Add Products
        </Link>
      </div>
      <div className="pt-5">
        {error && <p className="text-red-500">{error}</p>}
        {inventory.length > 0 ? (
          <div className="w-full grid grid-cols-3 gap-5">
            {inventory.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <p>No inventory items found!</p>
        )}
      </div>
    </div>
  );
}
