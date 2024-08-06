import { Link } from 'react-router-dom';
import logo from '../assets/images/favicon.png';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Navbar() {
  const [user, setUser] = useState(null);

  

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="bg-gray-100 font-sans w-full m-0">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/">
              <img src={logo} className="w-16" alt="Logo" />
            </Link>

            <div className="hidden sm:flex sm:items-center">
              <Link to="/hospitality/patient" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">Patient</Link>
              <Link to="/hospitality/doctor" className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600">Doctor</Link>
              {user ? (
                <>
                  <span className="text-gray-800 text-sm font-semibold">Hello, {user.email}</span>
                  <button onClick={handleLogout} className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600 ml-4">Logout</button>
                </>
              ) : null}
            </div>
          </div>

          <div className="block sm:hidden bg-white border-t-2 py-2">
            <div className="flex flex-col">
              <div className="flex justify-between items-center border-t-2 pt-2">
                <Link to="/hospitality/patient" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">Patient</Link>
                <Link to="/hospitality/doctor" className="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600">Doctor</Link>
                {user ? (
                  <>
                    <span className="text-gray-800 text-sm font-semibold">Hello, {user.email}</span>
                    <button onClick={handleLogout} className="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600 ml-4">Logout</button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
