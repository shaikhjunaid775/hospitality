import  { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";

import defaultUser from "../assets/images/default-user.png";

function Patient() {
  const [openTab, setOpenTab] = useState(1);
  const [file, setFile] = useState(defaultUser);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [surgeryHistory, setSurgeryHistory] = useState("");
  const [illnessHistory, setIllnessHistory] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");

    // Inside your component
    const navigate = useNavigate();
  const handlePreview = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      age,
      email,
      phone,
      surgeryHistory,
      illnessHistory,
      password,
      profileImage: file
    };

    
    try {
      await axios.post("http://localhost:5000/api/patients", formData);
      toast.success("Patient data submitted successfully");
      

      // Navigate to the desired route after successful login
      navigate("/hospitality/patient"); // Replace with your target route
    } catch (error) {
      
      toast.error("There was an error submitting the form!", error);
      
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/patient-login", {
        email: loginEmail,
        password: loginPassword
      });
          // Show success toast
    toast.success(response.data.message);

      // Navigate to the desired route after successful login
      navigate("/hospitality/PatientDashboard"); // Replace with your target route
      // Handle successful login, e.g., redirect or store token
    } catch (err) {
      toast.error(err.response?.data?.error || "Server error");
    }
  };

  const color = "green";
  return (
    <div>
      <div className="flex flex-wrap sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <h6
                className={
                  "text-xs font-bold uppercase px-5 py-3  rounded block leading-normal " +
                  (openTab === 1
                    ? "text-dark border-b-2 border-blue-600 bg-" +
                      color +
                      "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Login
              </h6>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3  rounded block leading-normal " +
                  (openTab === 2
                    ? "text-dark border-b-2 border-blue-600 bg-" +
                      color +
                      "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Sign Up
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {/* Login Tab */}
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Patient Sign in
                      </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form className="space-y-6" onSubmit={handleLoginSubmit}>
                        <div>
                          <label
                            htmlFor="login-email"
                            className="block px-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="login-email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              onChange={(e) => setLoginEmail(e.target.value)}
                              value={loginEmail}
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="login-password"
                              className="block px-2 text-sm font-medium leading-6 text-gray-900"
                            >
                              Password
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              id="login-password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              onChange={(e) => setLoginPassword(e.target.value)}
                              value={loginPassword}
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                          >
                            Sign in
                          </button>
                        </div>

                        {error && (
                          <div className="text-red-600 text-sm mt-2">
                            {error}
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>

                {/* Sign Up Tab */}
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Patient Sign up
                      </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form
                        className="space-y-6"
                        onSubmit={handlePatientSubmit}
                      >
                         <div className="flex justify-center ">
                          <div className="flex items-center space-x-6">
                            <div className="shrink-0">
                              <img
                                id="preview_img"
                                className="h-16 w-16 object-cover rounded-full"
                                alt="Current profile photo"
                                src={file}
                              />
                            </div>
                            <label className="block px-2">
                              <input
                                type="file"
                                className="block px-2 w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
      "
                                onChange={handlePreview}
                              />
                            </label>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="name"
                            className="block px-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="name"
                              name="name"
                              type="text"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="age"
                            className="block px-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            Age
                          </label>
                          <div className="mt-2">
                            <input
                              id="age"
                              name="age"
                              type="number"
                              onChange={(e) => setAge(e.target.value)}
                              value={age}
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block px-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block px-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              name="phone"
                              type="text"
                              onChange={(e) => setPhone(e.target.value)}
                              value={phone}
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="surgeryHistory"
                            className="block px-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            Surgery History
                          </label>
                          <div className="mt-2">
                            <input
                              id="surgeryHistory"
                              name="surgeryHistory"
                              type="text"
                              onChange={(e) =>
                                setSurgeryHistory(e.target.value)
                              }
                              value={surgeryHistory}
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="illnessHistory"
                            className="block px-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            Illness History
                          </label>
                          <div className="mt-2">
                            <input
                              id="illnessHistory"
                              name="illnessHistory"
                              type="text"
                              onChange={(e) =>
                                setIllnessHistory(e.target.value)
                              }
                              value={illnessHistory}
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="block px-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            Password
                          </label>
                          <div className="mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        
                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                          >
                            Sign up
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient;
