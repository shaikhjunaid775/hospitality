import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import PrescriptionForm from "./PrescriptionForm";

const PatientDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const [patients, setPatients] = useState([]);

  const [consultations, setConsultations] = useState([]);
  const [selectedConsultationId, setSelectedConsultationId] = useState(null);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/consultations')
      .then(response => setConsultations(response.data))
      .catch(error => console.error('Error fetching consultations', error));
  }, []);

  const openPrescriptionForm = (id) => {
    setSelectedConsultationId(id);
    setShowPrescriptionForm(true);
  };

  const closePrescriptionForm = () => {
    setShowPrescriptionForm(false);
    setSelectedConsultationId(null);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patient");
        setPatients(response.data);
        console.log(patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatient();
  }, []);

  return (
    <>
      <div className="p-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {patients.map((patient) => (
          <div
            key={patient._id}
            className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:space-y-0 sm:space-x-6"
          >
            <img
              className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
              src={
                patient.profileImage ||
                "https://tailwindcss.com/img/erin-lindford.jpg"
              }
              alt={`${patient.name}'s Face`}
            />
            <div className="text-center space-y-2 sm:text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  {patient.name}
                </p>
                <p className="text-slate-500 font-medium">
                  Age :{patient.age}
                </p>
                <p className="text-slate-500 font-medium">
                  {patient.age}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                Prescription
              </button>
            </div>
            
          </div>
        ))}
      </div>

      {showModal ? (
        <>
          <PrescriptionForm  openPrescriptionForm={openPrescriptionForm} closePrescriptionForm={closePrescriptionForm} />
        </>
      ) : null}
    </>
  );
};

export default PatientDashboard;
