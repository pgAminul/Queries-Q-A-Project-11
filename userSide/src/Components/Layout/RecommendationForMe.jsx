import React, { useEffect, useState } from "react";
import useAuth from "../AuthPorvider/useAuth";
import { FaRegSadCry } from "react-icons/fa";
import useAxiosInstance from "../Axios/AxiosInstance";

export default function RecommendationForMe() {
  const axiosInstance = useAxiosInstance();
  const [recommendation, setRecommendation] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fethData = async () => {
      const res = await axiosInstance.get(
        `/recommendationForMe?email=${user?.email}`
      );

      setRecommendation(res.data);
    };
    fethData();
  }, [user?.email]);
  return (
    <div>
      <div className="p-4 bg-[#1F2937] text-white">
        {recommendation.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[85vh]">
            <FaRegSadCry className="text-6xl text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-300">
              No Recommendations Found
            </h2>
            <p className="text-gray-400">
              Anyone Didn;t Give You any recommendations yet.
            </p>
          </div>
        ) : (
          <div>
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full  shadow-md rounded-lg">
                <thead className="bg-gray-100 text-black">
                  <tr>
                    <th className="p-2 text-left">Image</th>
                    <th className="p-2 text-left">Title</th>
                    <th className="p-2 text-left">Recommender Name</th>
                    <th className="p-2 text-left">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendation.map((item) => {
                    const {
                      RecommenderName,
                      _id,
                      title,
                      myRecommendadImg,
                      reason,
                      productName,
                    } = item;

                    return (
                      <tr key={_id} className={` `}>
                        <td className="p-2">
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={myRecommendadImg}
                                  alt="Recommender Image"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{RecommenderName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-2">{title}</td>
                        <td className="p-2">{productName}</td>
                        <td className="p-2">{reason}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden">
              {recommendation.map((item) => {
                const {
                  RecommenderName,
                  _id,
                  title,
                  myRecommendadImg,
                  reason,
                  productName,
                } = item;

                return (
                  <div
                    key={_id}
                    className=" shadow-md rounded-lg p-4 mb-4 border"
                  >
                    <div className="">
                      <div className="font-semibold flex justify-between">
                        <h2> Image:</h2>{" "}
                        <img
                          className="h-12 w-12 rounded-full"
                          src={myRecommendadImg}
                          alt=""
                        />{" "}
                      </div>
                    </div>
                    <div className="">
                      <span className="font-semibold">Title: </span>
                      {title}
                    </div>
                    <div className="">
                      <span className="font-semibold">Product Name: </span>
                      {productName}
                    </div>
                    <div className="">
                      <span className="font-semibold">Recommender Name: </span>
                      {RecommenderName}
                    </div>
                    <div className="">
                      <span className="font-semibold">Reason: </span>
                      {reason}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
