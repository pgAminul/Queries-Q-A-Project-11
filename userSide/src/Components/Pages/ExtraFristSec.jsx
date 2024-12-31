import React from "react";
import { NavLink } from "react-router-dom";

const ExtraFristSec = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[#182333] p-8 md:p-16">
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://amandakassner.com/wp-content/uploads/2019/08/questionmark-e1578104881429.jpg" // Replace with your actual image URL
          alt="Team Collaboration"
          className="rounded-lg shadow-md"
        />
      </div>

      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
          Looking for Recommendations?
        </h2>
        <p className="text-white mb-6">
          Discover personalized product suggestions tailored to your
          preferences. Our curated recommendations make it easy to find what you
          love, offering a seamless shopping experience with items suited to
          your unique tastes and needs.
        </p>
        <NavLink
          to={"/add-queries"}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
        >
          Post Now!
        </NavLink>
      </div>
    </div>
  );
};

export default ExtraFristSec;
