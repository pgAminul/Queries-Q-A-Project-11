import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../AuthPorvider/useAuth";
export default function QueriesBanner() {
  const { user } = useAuth();
  return (
    <section className="bg-[#1F2937]  text-white py-16 px-8">
      <div className="max-w-7xl md:h-fit h-[80vh] mx-auto grid md:grid-cols-2 items-center gap-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Welcome to
            <span className="text-pink-500"> My Queries</span>
          </h1>
          <p className="mt-6 text-lg">
            Here you can manage and review all your submitted questions easily
            and effectively.
          </p>
          <button className="mt-8 px-6 py-3 bg-pink-500 text-white rounded-md shadow-lg hover:bg-pink-600">
            <NavLink to={"/add-queries"}>Add-Queries</NavLink>
          </button>
        </div>

        <div className="bg-black">
          <div className="relative  flex justify-center items-center">
            {/* Card 1 */}
            <div className="absolute transform -translate-x-12 md:translate-y-10  -rotate-6 bg-gradient-to-r from-blue-700 to-black w-72 h-40 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-bold">FeedBack</h2>
              <p className="mt-4 text-sm">Feel Free To Add Query</p>
              <p className="mt-2 text-sm">Name: {user?.displayName}</p>
              <p className="mt-2 text-sm">Email: {user?.email}</p>
            </div>

            <div className="absolute transform translate-x-0 rotate-3 bg-gradient-to-r from-pink-500 to-purple-600 w-72 h-40 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-bold">Query</h2>
              <p className="mt-4 text-sm">Feel Free To Add Your Query</p>
              <p className="mt-2 text-sm">Name: {user?.displayName}</p>
              <p className="mt-2 text-sm">Email: {user?.email}</p>
            </div>

            <motion.div
              className="absolute bg-gradient-to-r from-gray-800 to-black w-72 h-40 rounded-lg shadow-lg p-4"
              animate={{
                y: [0, 20, 0],
                rotate: 6,
                x: 48,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <h2 className="text-lg font-bold">Hello</h2>
              <p className="mt-2 text-sm">{user?.displayName}</p>
              <p className="mt-4 text-sm">Feel Free To Add Your Query</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
