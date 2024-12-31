import React from "react";
import useAuth from "../AuthPorvider/useAuth";
import useAxiosInstance from "../Axios/AxiosInstance";
import Swal from "sweetalert2";

export default function AddRecomendations({ details }) {
  const axiosInstance = useAxiosInstance();
  console.log(details);
  const { user } = useAuth();
  const {
    productName,
    queryTitle,
    userEmail,
    userName,
    _id: previousDataId,
  } = details;

  const RecommenderEmail = user?.email;
  const RecommenderName = user?.displayName;
  const RecommenderImage = user?.photoURL;

  const handleAddRecommendation = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const sentData = {
      ...data,
      previousDataId,
      queryTitle,
      productName,
      userEmail,
      userName,
      RecommenderName,
      RecommenderEmail,
      RecommenderImage,
      createdAt: new Date().toISOString(),
    };
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(
          "/add-recommendation",
          sentData
        );
        console.log(response);
        Swal.fire({
          title: "Success!",
          text: "Recommendation added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.log(error.message);
        Swal.fire({
          title: "Error!",
          text: "Failed to add recommendation. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };
    fetchData();
  };

  return (
    <div className="bg-[#1F2937] px-4 md:px-0 pb-6">
      <div className="max-w-4xl  mx-auto p-8 bg-white/60 backdrop-blur-md shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Add a Recommendation
        </h2>
        <form onSubmit={handleAddRecommendation} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Recommendation Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Recommendation Title"
              className="mt-2 block w-full p-4 bg-white/80 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="myRecommendadName"
              className="block text-sm font-medium text-gray-700"
            >
              Recommended Product Name
            </label>
            <input
              type="text"
              id="myRecommendadName"
              name="myRecommendadName"
              placeholder="Enter Product Name"
              className="mt-2 block w-full p-4 bg-white/80 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="myRecommendadImg"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image URL
            </label>
            <input
              type="text"
              id="myRecommendadImg"
              name="myRecommendadImg"
              placeholder="Enter Product Image URL"
              className="mt-2 block w-full p-4 bg-white/80 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700"
            >
              Reason for Recommendation
            </label>
            <textarea
              id="reason"
              name="reason"
              placeholder="Why are you recommending this product?"
              rows="4"
              className="mt-2 block w-full p-4 bg-white/80 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Add Recommendation
          </button>
        </form>
      </div>
    </div>
  );
}
