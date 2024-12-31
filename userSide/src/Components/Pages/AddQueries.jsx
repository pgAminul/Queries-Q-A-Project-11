import React from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../AuthPorvider/useAuth";
import useAxiosInstance from "../Axios/AxiosInstance";

const AddQueries = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const sendData = {
      ...data,
      createdAt: new Date().toISOString(),
      userEmail: user?.email,
      userName: user?.displayName,
      userImage: user?.photoURL,
      recommendationCount: 0,
    };

    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("/addQuery", sendData);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Query Added!",
            text: "Your query has been successfully posted.",
            confirmButtonText: "Okay",
          });
          e.target.reset(); // Reset the form
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong. Please try again later.",
          confirmButtonText: "Close",
        });
        console.error(error);
      }
    };

    fetchData();
  };

  return (
    <div className="flex py-6 justify-center items-center min-h-screen bg-[#1F2937]">
      <motion.div
        className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add Query Form
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="productBrand"
              className="block text-sm font-medium text-gray-600"
            >
              Product Brand
            </label>
            <input
              type="text"
              id="productBrand"
              name="productBrand"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product brand"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="productImage"
              className="block text-sm font-medium text-gray-600"
            >
              Product Image URL
            </label>
            <input
              type="url"
              id="productImage"
              name="productImage"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product image URL"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="queryTitle"
              className="block text-sm font-medium text-gray-600"
            >
              Query Title
            </label>
            <input
              type="text"
              id="queryTitle"
              name="queryTitle"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your query title"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="boycottingReason"
              className="block text-sm font-medium text-gray-600"
            >
              Boycotting Reason
            </label>
            <textarea
              id="boycottingReason"
              name="boycottingReason"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Explain why you are boycotting this product"
              rows="4"
              required
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Query
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddQueries;
