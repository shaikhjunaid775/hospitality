
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  // useNavigate,
  // Outlet,
} from "react-router-dom";
import Banner from './components/Banner'
import Navbar from './components/Navbar'
import Doctor from './components/Doctor';
import Patient from './components/Patient';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PateintDashboard';

function App() {

  return (
    <>
     <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/hospitality" element={<Banner />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/patient" element={<Patient />} />
         {/* Other routes */}
         <Route path='/DoctorDashboard' element={<DoctorDashboard />} />
         <Route path='/PatientDashboard' element={<PatientDashboard />} />
     
      </Routes>
    </Router>

     {/* <Banner />   */}
    </>
  )
}

export default App
