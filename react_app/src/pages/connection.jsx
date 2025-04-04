import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const connectionTypeOptions = [
  "Sales",
  "Compliance",
  "Finance",
  "Master",
  "ROI",
  "Score card",
  "dummy"
];

const Connection = () => {
  const navigate = useNavigate();
  
  const [selectedConnections, setSelectedConnections] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelection = (type) => {
    setSelectedConnections((prevSelected) =>
      prevSelected.includes(type)
        ? prevSelected.filter((t) => t !== type)
        : [...prevSelected, type]
    );
  };

  const handleProceed = async () => {
    if (selectedConnections.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Selection",
        text: "Please select at least one connection type.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/create-destinations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ con_type: selectedConnections }),
      });
      const data = await response.json();
      
      Swal.fire({
        icon: data.success ? "success" : "error",
        title: data.success ? "Success" : "Error",
        text: data.message || "An error occurred.",
        confirmButtonColor: data.success ? "#3085d6" : "#d33",
        confirmButtonText: "OK",
      }).then(() => {
        if (data.success && data.redirect) {
          window.location.href = data.redirect;
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while processing.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    } 
    finally {
      setLoading(false);
    }
  };

  const loadDataHandler = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/run-pipe/", {
        method: "POST",
      });

      if (response.ok) {
        Swal.fire({
          title: "Data Loaded!",
          text: "The data has been successfully loaded.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => navigate("/home"), 2000);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to load data.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  // Add a Load Data Handler to prevent errors
  // const loadDataHandler = () => {
  //   Swal.fire({
  //     icon: "info",
  //     title: "Load Data",
  //     text: "Load data functionality is not yet implemented.",
  //     confirmButtonColor: "#3085d6",
  //     confirmButtonText: "OK",
  //   });
  // };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 ml-[430px] relative">

      {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-white mt-4 text-lg">Loading...</p>
                </div>
              </div>
            )}


      <div className="bg-[#2a7a8c] text-white rounded-lg shadow-xl w-full max-w-4xl p-8 mx-auto">

        <h2 className="text-2xl font-bold text-center mb-6">Select Connections</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {connectionTypeOptions.map((type) => (
            <div
              key={type}
              className={`p-3 rounded-md shadow-md cursor-pointer text-center ${
                selectedConnections.includes(type) ? "bg-green-500" : "bg-gray-700"
              }`}
              onClick={() => handleSelection(type)}
            >
              <h3 className="text-md font-semibold">{type}</h3>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            className="px-5 py-2 rounded-lg bg-green-500 text-white"
            onClick={handleProceed}
            disabled={selectedConnections.length === 0}
          >
            Proceed
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-blue-500 text-white"
            onClick={loadDataHandler}
          >
            Load Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Connection;
