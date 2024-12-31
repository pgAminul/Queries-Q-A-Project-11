import { useEffect, useState } from "react";
import useAuth from "../AuthPorvider/useAuth";
import { NavLink } from "react-router-dom";
import useAxiosInstance from "../Axios/AxiosInstance";
import Swal from "sweetalert2";

export default function QueriesCard() {
  const { user } = useAuth();
  const [cards, setCard] = useState([]);
  const axiosInstance = useAxiosInstance();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/findDataByEmail/${user?.email}`);
        setCard(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setCard, user?.email]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        const fetchData = async () => {
          try {
            const response = await axiosInstance.delete(`/deleteQuery/${_id}`);
            if (response.data.deletedCount >= 0) {
              Swal.fire("Deleted!", "Your query has been deleted.", "success");
            }
            const findData = cards.filter((res) => res._id !== _id);
            setCard(findData);
          } catch (error) {
            console.error("Error deleting query:", error.message);
          }
        };
        fetchData();
      } else {
        Swal.fire("Cancelled", "Your query is safe!", "info");
      }
    });
  };

  return (
    <div className="bg-[#1F2937] min-h-screen py-10">
      <h2 className="text-white text-center text-4xl py-4 font-bold">
        My Queries
      </h2>
      {cards.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[40vh]">
          <h2 className="text-4xl text-red-500 font-bold">
            You didn't Add Any Query
          </h2>
          <NavLink to={"/add-queries"} className={`btn btn-error mt-4`}>
            Add Query
          </NavLink>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 max-w-7xl">
            {cards.map((card) => {
              const {
                _id,
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
              } = card;
              const formattedDateTime = new Date(createdAt).toLocaleString();

              return (
                <div
                  key={_id}
                  className="bg-black bg-opacity-30 backdrop-blur-md text-white p-6 rounded-lg shadow-lg flex flex-col h-full overflow-hidden"
                >
                  <div className="flex justify-between items-center ">
                    <div className="   text-purple-500">
                      <img
                        src={productImage}
                        className="w-24 h-14 object-cover rounded-md"
                        alt=""
                      />
                    </div>
                    <div className="   text-gray-400 text-sm">
                      {formattedDateTime}
                    </div>
                  </div>

                  <div className="mt-12">
                    <h3 className="text-lg font-semibold">{productName}</h3>
                    <p className="text-sm font-bold mt-2">
                      Brand name: {productBrand}
                    </p>
                    <p className="text-sm mt-2 text-gray-400">
                      Title: {queryTitle}
                    </p>
                  </div>
                  <div className="mt-8 text-gray-400 text-sm">
                    FeedBack From: {userName}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <NavLink
                      to={`/my-query-details/${_id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center"
                    >
                      Details
                    </NavLink>
                    <NavLink
                      to={`/updateQuery/${_id}`}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full text-center"
                    >
                      Update
                    </NavLink>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full text-center"
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
}
