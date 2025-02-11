import React, { useEffect, useState } from "react";
import useAxiosInstance from "../Axios/AxiosInstance";

export default function Card() {
  const [cards, setCard] = useState([]);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    axiosInstance
      .get("/allData")
      .then((res) => {
        setCard(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [setCard]);

  return (
    <div>
      <div className="divider divider-secondary text-4xl font-bold text-center py-3">
        Recent Queries
      </div>

      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {cards.map((card) => {
            console.log(card);
            const {
              productName,
              productBrand,
              productImage,
              queryTitle,
              userName,
              createdAt,
            } = card;
            console.log(card);
            const recommendation = card.recommendationCount?.$numberInt || "0";
            const formattedDateTime = new Date(createdAt).toLocaleString();

            return (
              <div
                key={card._id}
                className="bg-black text-white p-6 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <img
                    src={productImage}
                    className="w-24 h-14 object-cover"
                    alt=""
                  />
                  <div className="text-gray-400 text-sm">
                    {formattedDateTime}
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{productName}</h3>
                <p className="text-sm font-bold mt-2">
                  Brand name: {productBrand}
                </p>
                <p className="text-sm mt-2 text-gray-400">
                  Title: {queryTitle}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Recommendation: {recommendation}
                </p>
                <p className="mt-8 text-gray-400 text-sm">
                  Feedback From: {userName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
