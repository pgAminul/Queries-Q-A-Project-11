import React, { useEffect, useState } from "react";
import useAuth from "../AuthPorvider/useAuth";
import { FaRegSadCry } from "react-icons/fa";
import useAxiosInstance from "../Axios/AxiosInstance";
import Swal from "sweetalert2";

const MyRecommendation = () => {
  const [myRecommendation, setReommendation] = useState([]);
  const axiosInstance = useAxiosInstance();
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/findMyRecommed/${user?.email}`);
      setReommendation(res.data);
    };
    fetchData();
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const fetchData = async () => {
          await axiosInstance.delete(`/deleteRecommendation/${id}`);
          setReommendation(myRecommendation.filter((item) => item._id !== id));
          Swal.fire(
            "Deleted!",
            "Your recommendation has been deleted.",
            "success"
          );
        };
        fetchData();
      }
    });
  };

  return (
    <div className="p-4 bg-[#1F2937] text-white">
      {myRecommendation.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[85vh]">
          <FaRegSadCry className="text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-300">
            No Recommendations Found
          </h2>
          <p className="text-gray-400">
            You didn't add any recommendations yet.
          </p>
        </div>
      ) : (
        <div className="min-h-screen">
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full  shadow-md rounded-lg">
              <thead className="bg-gray-100 text-black">
                <tr>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Products</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {myRecommendation.map((item) => {
                  const { productName, _id, title, createdAt } = item;
                  const formattedDateTime = new Date(
                    createdAt
                  ).toLocaleString();
                  return (
                    <tr key={_id} className={` `}>
                      <td className="p-2">{formattedDateTime}</td>
                      <td className="p-2">{title}</td>
                      <td className="p-2">{productName}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleDelete(_id)}
                          className="btn bg-gradient-to-r from-red-600 to-red-800 text-white btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="md:hidden">
            {myRecommendation.map((item) => {
              const { productName, _id, title, createdAt } = item;
              const formattedDateTime = new Date(createdAt).toLocaleString();
              return (
                <div
                  key={_id}
                  className=" shadow-md rounded-lg p-4 mb-4 border"
                >
                  <div className="">
                    <span className="font-semibold">Date: </span>
                    {formattedDateTime}
                  </div>
                  <div className="">
                    <span className="font-semibold">Title: </span>
                    {title}
                  </div>
                  <div className="">
                    <span className="font-semibold">Product Name: </span>
                    {productName}
                  </div>
                  <div className="p-2 w-">
                    <button
                      onClick={() => handleDelete(_id)}
                      className="btn bg-gradient-to-r from-red-600 to-red-800 text-white btn-sm w-full"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecommendation;
