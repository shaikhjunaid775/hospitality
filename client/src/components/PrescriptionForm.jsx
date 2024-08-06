import React, { useState } from "react";
import axios from "axios";

const PrescriptionForm = ({
  patientId,
  onClose,
  showModal,
  setShowModal
}) => {
  const [prescription, setPrescription] = useState({
    care: "",
    medicines: ""
  });

  const handlePrescriptionChange = (e) => {
    const { name, value } = e.target;
    setPrescription({ ...prescription, [name]: value });
  };

  const handleSubmitPrescription = () => {
    axios
      .post(`http://localhost:5000/api/patients/${patientId}/prescribe`, prescription)
      .then((response) => {
        alert("Prescription submitted successfully");
        setPrescription({ care: "", medicines: "" });
        onClose();
      })
      .catch((error) => alert("Error submitting prescription", error));
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Write Prescription</h2>
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
              Care to be taken:
              <textarea
                name="care"
                value={prescription.care}
                onChange={handlePrescriptionChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </label>
            <label className="block mb-4">
              Medicines:
              <textarea
                name="medicines"
                value={prescription.medicines}
                onChange={handlePrescriptionChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </label>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPrescription}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Submit Prescription
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrescriptionForm;
