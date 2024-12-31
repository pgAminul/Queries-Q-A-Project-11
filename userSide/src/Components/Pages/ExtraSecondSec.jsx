import React from "react";
import {
  FaLaptop,
  FaMobileAlt,
  FaHeadphones,
  FaCamera,
  FaTv,
  FaStopwatch,
} from "react-icons/fa";

const ProductQuerySection = () => {
  const queries = [
    {
      id: 1,
      icon: <FaLaptop size={32} className="text-blue-500" />,
      title: "Best Laptops for Students",
      description: "Find the most affordable and high-performance laptops.",
    },
    {
      id: 2,
      icon: <FaMobileAlt size={32} className="text-blue-500" />,
      title: "Top Smartphones of 2024",
      description: "Explore the latest and most popular smartphones.",
    },
    {
      id: 3,
      icon: <FaHeadphones size={32} className="text-blue-500" />,
      title: "Best Noise-Cancelling Headphones",
      description: "Get the best headphones for music and calls.",
    },
    {
      id: 4,
      icon: <FaCamera size={32} className="text-blue-500" />,
      title: "Top Cameras for Photography",
      description: "Discover cameras for both beginners and professionals.",
    },
    {
      id: 5,
      icon: <FaTv size={32} className="text-blue-500" />,
      title: "Smart TVs with Best Features",
      description: "Check out the best smart TVs of the year.",
    },
    {
      id: 6,
      icon: <FaStopwatch size={32} className="text-blue-500" />,
      title: "Best Smartwatches Under $200",
      description: "Affordable and feature-rich smartwatches for you.",
    },
  ];

  return (
    <div className="bg-[#0f1722]  p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Product Recommendations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {queries.map((query) => (
          <div
            key={query.id}
            className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transform transition duration-300 hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              {query.icon}
              <h3 className="text-lg font-semibold ml-4 text-gray-800">
                {query.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600">{query.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductQuerySection;
