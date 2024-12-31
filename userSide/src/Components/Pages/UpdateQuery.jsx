import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import useAxiosInstance from "../Axios/AxiosInstance";
import Swal from "sweetalert2"; // Import SweetAlert2

const UpdateQuery = () => {
  const { _id } = useParams();
  const [update, setUpdate] = useState([]);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/details-query/${_id}`);
      setUpdate(res.data);
    };
    fetchData();
  }, [_id]);

  const {
    productName,
    productBrand,
    productImage,
    queryTitle,
    boycottingReason,
  } = update;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const fetchData = async () => {
      try {
        const response = await axiosInstance.patch(`/updateQuery/${_id}`, data);
        Swal.fire({
          icon: "success",
          title: "Update Successful",
          text: "The query has been successfully updated!",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Something went wrong. Please try again.",
        });
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
          Product Update Form
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
              defaultValue={productName}
              type="text"
              id="productName"
              name="productName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
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
              defaultValue={productBrand}
              type="text"
              id="productBrand"
              name="productBrand"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product brand"
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
              defaultValue={productImage}
              id="productImage"
              name="productImage"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product image URL"
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
              defaultValue={queryTitle}
              name="queryTitle"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your query"
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
              defaultValue={boycottingReason}
              name="boycottingReason"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Explain why you are boycotting this product"
              rows="4"
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Update Query
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateQuery;
