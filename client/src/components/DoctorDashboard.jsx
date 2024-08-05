import axios from "axios";
import { useState, useEffect } from "react";
import PrescriptionForm from "./PrescriptionForm";

const PatientDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedConsultationId, setSelectedConsultationId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/consultations')
      .then(response => {
        console.log('Consultations:', response.data);
        // Uncomment the next line if you plan to use consultations later
        // setConsultations(response.data);
      })
      .catch(error => console.error('Error fetching consultations', error));
  }, []);

  const openPrescriptionForm = (id) => {
    setSelectedConsultationId(id);
    setShowModal(true);
  };

  const closePrescriptionForm = () => {
    setShowModal(false);
    setSelectedConsultationId(null);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patient");
        setPatients(response.data);
        console.log(patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);


  return (
    <>
      <h3>Patients</h3>
      <div className="p-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  Age: {patient.age}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openPrescriptionForm(patient._id)}
                className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                Prescription
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <PrescriptionForm
          selectedConsultationId={selectedConsultationId}
          closePrescriptionForm={closePrescriptionForm}
        />
      )}
    </>
  );
};

export default PatientDashboard;