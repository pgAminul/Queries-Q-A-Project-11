import React, { useEffect, useState } from "react";
import useAxiosInstance from "../Axios/AxiosInstance";

export default function QueryComment({ id }) {
  const axiosInstance = useAxiosInstance();
  const [comment, setComment] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance(`/queryComment/${id._id}`)
        .then((res) => setComment(res.data))
        .catch((e) => console.log(e));
    };
    fetchData();
  }, [id]);
  console.log(comment);

  return (
    <div className="bg-[#1F2937] pb-4">
      <h2 className="font bold text-4xl py-3 text-white text-center">
        Query Answer
      </h2>
      <div className="divider"></div>
      {comment.map((c) => {
        const {
          title,
          myRecommendadName,
          myRecommendadImg,
          productName,
          createdAt,
        } = c;
        const formattedDateTime = new Date(createdAt).toLocaleString();

        return (
          <div className="w-8/12 mb-3 bg-white shadow-md rounded-lg p-4  mx-auto">
            <div className="flex items-center mb-4">
              <div className="ml-3">
                <span className="text-gray-500 text-sm">
                  {formattedDateTime}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-5 ">
              <div>
                <img src={myRecommendadImg} className="w-14" alt="" />
              </div>
              <div>
                <p className=" text-gray-800 font-bold ">Title: {title}</p>
                <p className="text-gray-800 font-bold py-2">
                  Recommendation Name: {myRecommendadName}
                </p>

                <p className="text-gray-800">Product: {productName}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
