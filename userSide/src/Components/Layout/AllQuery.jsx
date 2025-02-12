import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTh, FaThLarge, FaBars, FaSort } from "react-icons/fa";
import useAxiosInstance from "../Axios/AxiosInstance";

export default function AllQuery() {
  const [cards, setCards] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [layout, setLayout] = useState("grid-cols-3");
  const [sortOrder, setSortOrder] = useState("desc"); // Sorting order state
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    axiosInstance("/allQuery")
      .then((res) => {
        setCards(res.data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const filteredCards = cards.filter((card) =>
    card.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Sort function
  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortOrder === "desc") {
      return b.recommendationCount - a.recommendationCount; // বেশি recommendation আগে
    } else {
      return a.recommendationCount - b.recommendationCount; // কম recommendation আগে
    }
  });

  const handleLayoutChange = (layoutType) => {
    setLayout(layoutType);
  };

  // Sorting toggle function
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <div className="bg-[#1F2937]">
      <div className="text-white w-11/12 mx-auto py-6">
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by Product Name"
            className="flex-grow p-3 rounded-lg border border-gray-200 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Search
          </button>
        </div>

        <div className="flex gap-4 justify-between mb-6">
          {/* Sort Button */}
          <button
            onClick={toggleSortOrder}
            className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center gap-2"
          >
            <FaSort size={20} />
            Sort by Recommendation (
            {sortOrder === "desc" ? "High to Low" : "Low to High"})
          </button>

          {/* Layout Change Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => handleLayoutChange("grid-cols-1")}
              className={`p-2 rounded-full ${
                layout === "grid-cols-1" ? "bg-blue-500" : "bg-gray-800"
              }`}
            >
              <FaBars size={20} />
            </button>
            <button
              onClick={() => handleLayoutChange("grid-cols-2")}
              className={`p-2 rounded-full ${
                layout === "grid-cols-2" ? "bg-blue-500" : "bg-gray-800"
              }`}
            >
              <FaThLarge size={20} />
            </button>
            <button
              onClick={() => handleLayoutChange("grid-cols-3")}
              className={`p-2 rounded-full ${
                layout === "grid-cols-3" ? "bg-blue-500" : "bg-gray-800"
              }`}
            >
              <FaTh size={20} />
            </button>
          </div>
        </div>

        {sortedCards.length === 0 ? (
          <div className="text-white flex justify-center items-center h-[70vh]">
            No queries found matching "{searchText}"
          </div>
        ) : (
          <div
            className={`grid ${layout} justify-center items-stretch min-h-screen gap-4`}
          >
            {sortedCards.map((card) => {
              const {
                _id,
                productName,
                productImage,
                queryTitle,
                recommendationCount,
                createdAt,
              } = card;

              const formattedDateTime = new Date(createdAt).toLocaleString();

              return (
                <div
                  key={_id}
                  className="bg-black text-white rounded-lg shadow-lg overflow-hidden max-w-lg h-[430px] flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={productImage}
                      alt="Product"
                      className="w-full h-52 object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <h2 className="absolute top-3 left-3 text-xl font-bold">
                      {formattedDateTime}
                    </h2>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 text-center flex-grow">
                    <h1 className="mt-3 font-extrabold uppercase">
                      {queryTitle}
                    </h1>
                    <p className="text-sm mt-2">
                      Recommendation Count: {recommendationCount}
                    </p>
                    <p className="text-xs mt-2 text-gray-400">
                      Product Name: {productName}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="flex justify-center items-center pb-4">
                    <NavLink
                      to={`/recommendationDetails/${_id}`}
                      className="btn btn-primary"
                    >
                      Recommendation
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
