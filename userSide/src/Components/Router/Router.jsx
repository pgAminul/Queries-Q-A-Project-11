import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Layout/Home";
import Navbar from "../Layout/Navbar";
import AddQueries from "../Pages/AddQueries";
import MyQueries from "../Layout/MyQueries";
import Login from "../Layout/Login";
import Register from "../Layout/Register";
import PrivetRoute from "../Router/PrivetRoute";
import AllQuery from "../Layout/AllQuery";
import Details from "../Pages/Details";
import UpdateQuery from "../Pages/UpdateQuery";
import RecommendationDetails from "../Pages/RecomendationDetails";
import MyRecommendation from "../Pages/MyRecommendation";
import RecommendationForMe from "../Layout/RecommendationForMe";
import Footer from "../Layout/Footer";
import Error from "../Pages/Error";
export default function Router() {
  return (
    <BrowserRouter>
      <div className="h-[60px]">
        <Navbar />
      </div>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/my-queries"
          element={
            <PrivetRoute>
              <MyQueries />
            </PrivetRoute>
          }
        />
        <Route
          path="/add-queries"
          element={
            <PrivetRoute>
              <AddQueries />
            </PrivetRoute>
          }
        />
        <Route path="/all-queries" element={<AllQuery />} />
        <Route
          path="my-query-details/:_id"
          element={
            <PrivetRoute>
              <Details />
            </PrivetRoute>
          }
        />

        <Route
          path="/recommendationDetails/:_id"
          element={
            <PrivetRoute>
              <RecommendationDetails />
            </PrivetRoute>
          }
        />
        <Route
          path="updateQuery/:_id"
          element={
            <PrivetRoute>
              <UpdateQuery />
            </PrivetRoute>
          }
        />
        <Route
          path="my-recommendations"
          element={
            <PrivetRoute>
              <MyRecommendation />
            </PrivetRoute>
          }
        />
        <Route
          path="recommendations"
          element={
            <PrivetRoute>
              <RecommendationForMe />
            </PrivetRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
