import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosInstance from "../Axios/AxiosInstance";

export default function Details() {
  const axiosInstance = useAxiosInstance();
  const { _id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`details-query/${_id}`)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((error) => console.log(error.message));
  }, [_id]);

  if (!details) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const {
    productName,
    productBrand,
    productImage,
    queryTitle,
    boycottingReason,
    userEmail,
    userName,
    userImage,
    createdAt,
    recommendationCount,
  } = details;

  return (
    <div>
      <div className="bg-[#1F2937] p-6 flex justify-center items-center  min-h-screen">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg  md:w-8/12  overflow-hidden">
          <div className="md:w-1/3">
            <img
              src={productImage || "https://via.placeholder.com/300"}
              alt={productName || "Product Image"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-2/3 p-6 flex flex-col justify-between">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={userImage || "https://via.placeholder.com/50"}
                alt={userName || "User"}
                className="w-12 h-12 rounded-full border-2 border-yellow-400"
              />
              <div>
                <h3 className="text-lg font-bold">
                  Query By: {userName || "Unknown User"}
                </h3>
                <div className="flex space-x-1 text-yellow-400">
                  <span>●</span>
                  <span>●</span>
                  <span>●</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-800 mb-4">
              {queryTitle || "Default Title"}
            </h2>

            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <span>{new Date(createdAt).toDateString()}</span>
              <span>{recommendationCount} Recommendations</span>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Reason: {boycottingReason || "No reason provided."}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              Barand Name: {productBrand || "No Brand provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
