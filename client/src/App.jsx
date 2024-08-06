import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
  // Link,
  // useNavigate,
  // Outlet,
} from "react-router-dom";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Doctor from "./components/Doctor";
import Patient from "./components/Patient";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDashboard from "./components/PateintDashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        
        <ToastContainer />
        
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/hospitality" element={<Banner />} />
          <Route path="/hospitality/doctor" element={<Doctor />} />
          <Route path="/hospitality/patient" element={<Patient />} />
          {/* Other routes */}
          <Route path="/hospitality/DoctorDashboard" element={<DoctorDashboard />} />
          <Route path="/hospitality/PatientDashboard" element={<PatientDashboard />} />
        </Routes>
      </Router>

      {/* <Banner />   */}
    </>
  );
}

export default App;
