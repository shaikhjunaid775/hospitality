import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const DoctorDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [prescription, setPrescription] = useState({
    care: "",
    medicines: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/consultations")
      .then((response) => {
        console.log("Consultations:", response.data);
      })
      .catch((error) => toast.error("Error fetching consultations", error));
  }, []);

  const openPrescriptionForm = (id) => {
    setSelectedPatientId(id);
    setShowModal(true);
  };

  const closePrescriptionForm = () => {
    setShowModal(false);
    setSelectedPatientId(null);
    setPrescription({ care: "", medicines: "" });
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

  const handlePrescriptionChange = (e) => {
    const { name, value } = e.target;
    setPrescription({ ...prescription, [name]: value });
  };

  const handleSubmitPrescription = () => {
    console.log("Submitting prescription for patient ID:", selectedPatientId); // Log the patient ID
    axios
      .post(`http://localhost:5000/api/patients/${selectedPatientId}/prescribe`, prescription)
      .then((response) => {

        toast.success("Prescription submitted successfully");
        alert();
        closePrescriptionForm();
      })
      .catch((error) => toast.error("Error submitting prescription", error));
  };

  return (
    <div className="p-4">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        Patient Details
      </h5>

      <div className="p-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <div
            key={patient._id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow"
          >
            <div className="flex flex-col items-center py-5">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={
                  patient.profileImage ||
                  "https://tailwindcss.com/img/erin-lindford.jpg"
                }
                alt={`${patient.name}'s Face`}
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900">
                {patient.name}
              </h5>
              <span className="text-sm text-gray-500">
                Age: {patient.age}
              </span>
              <span className="text-sm text-gray-500">
                Surgery History: {patient.surgeryHistory}
              </span>
              <span className="text-sm text-gray-500">
                Illness History: {patient.illnessHistory}
              </span>
              <div className="flex mt-4 md:mt-6">
                <button
                  type="button"
                  onClick={() => openPrescriptionForm(patient._id)}
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100"
                >
                  Prescription
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default DoctorDashboard;
