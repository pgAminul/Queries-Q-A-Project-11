import React from "react";
import Slider from "../Pages/Slider";
import Card from "../Pages/Card";
import ExtraFristSec from "../Pages/ExtraFristSec";
import ExtraSecondSec from "../Pages/ExtraSecondSec";
import useAuth from "../AuthPorvider/useAuth";
import FutureAndFaq from "../Pages/FututreAndFaq";
const Home = () => {
  const { loading } = useAuth();
  if (loading)
    return (
      <div className="h-[80vh] flex justify-center items-center ">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  return (
    <div className="bg-[#1F2937] text-white">
      <div>
        <Slider />
      </div>
      <Card />

      <div>
        <ExtraFristSec />
      </div>
      <div>
        <ExtraSecondSec />
      </div>
      <div>
        <FutureAndFaq />
      </div>
    </div>
  );
};

export default Home;
