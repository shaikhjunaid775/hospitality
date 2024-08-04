import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const DoctorDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const [doctors, setDoctors] = useState([]);


  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    illnessHistory: "",
    recentSurgery: "",
    diabetics: "",
    allergies: "",
    others: ""
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleDateChange = (date) => {
    setFormData({ ...formData, recentSurgery: date });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/submit", formData)
      .then((response) => {
        alert("Form submitted successfully!");
      })
      .catch((error) => {
        alert("Error submitting form");
      });
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data);
        console.log(doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <div className="p-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:space-y-0 sm:space-x-6"
          >
            <img
              className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
              src={
                doctor.profileImage ||
                "https://tailwindcss.com/img/erin-lindford.jpg"
              }
              alt={`${doctor.name}'s Face`}
            />
            <div className="text-center space-y-2 sm:text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  {doctor.name}
                </p>
                <p className="text-slate-500 font-medium">
                  {doctor.speciality}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                Consultant
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal ? (
        <>
          <div
            className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 ${
              !showModal && "hidden"
            }`}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              {step === 1 && (
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                      Step 1: Current Illness History
                    </h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setShowModal(false)}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <label className="block mb-2">
                    Current Illness History:
                    <textarea
                      name="illnessHistory"
                      value={formData.illnessHistory}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="block mb-4">
                    Recent Surgery (time span):
                    <DatePicker
                      selected={formData.recentSurgery}
                      onChange={handleDateChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <button
                    onClick={nextStep}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Next
                  </button>
                </div>
              )}
              {step === 2 && (
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold mb-4">
                      Step 2: Family Medical History
                    </h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setShowModal(false)}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <label className="block mb-2">
                    Diabetics:
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="diabetics"
                          value="yes"
                          checked={formData.diabetics === "yes"}
                          onChange={handleChange}
                          className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          name="diabetics"
                          value="no"
                          checked={formData.diabetics === "no"}
                          onChange={handleChange}
                          className="form-radio"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </label>
                  <label className="block mb-2">
                    Any Allergies:
                    <input
                      type="text"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="block mb-4">
                    Others:
                    <input
                      type="text"
                      name="others"
                      value={formData.others}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <div className="flex justify-between">
                    <button
                      onClick={prevStep}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                    
                  <h2 className="text-xl font-bold mb-4">
                    Step 3: Review and Submit
                  </h2>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setShowModal(false)}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  <p>
                    <strong>Current Illness History:</strong>{" "}
                    {formData.illnessHistory}
                  </p>
                  <p>
                    <strong>Recent Surgery:</strong>{" "}
                    {formData.recentSurgery.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Diabetics:</strong> {formData.diabetics}
                  </p>
                  <p>
                    <strong>Allergies:</strong> {formData.allergies}
                  </p>
                  <p>
                    <strong>Others:</strong> {formData.others}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={prevStep}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DoctorDashboard;
