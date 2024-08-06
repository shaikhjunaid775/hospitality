import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/images/default-user.png"
import { toast } from "react-toastify";

function Doctor() {
  const [openTab, setOpenTab] = useState(1); // 1 for login, 2 for signup
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerSpeciality, setRegisterSpeciality] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerExperience, setRegisterExperience] = useState("");

  const [consultations, setConsultations] = useState([]);

  // Inside your component
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [file, setFile] = useState(profile);

  const handlePreview = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files);
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: registerName,
      speciality: registerSpeciality,
      email: registerEmail,
      phone: registerPhone,
      yearsofexp: registerExperience,
      password: registerPassword,
      profileImage: file
    };

    try {
      await axios.post("http://localhost:5000/api/doctors", formData);
      toast.success("Doctor data submitted successfully");
      // Navigate to the desired route after successful login
      navigate("/hospitality/Doctor"); // Replace with your target route
    } catch (error) {
      toast.error("There was an error submitting the form!", error);
      
    }
  };

  const handleDoctorLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctor-login",
        {
          email: loginEmail,
          password: loginPassword
        }
      );
      toast.success(response.data.message);
      // Navigate to the desired route after successful login
      navigate("/hospitality/DoctorDashboard"); // Replace with your target route
      // Handle successful login, e.g., redirect or store token
    } catch (err) {
      toast.error("Login failed:", err);
      setError(err.response?.data?.error || "Server error");
    }
  };

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/:id/consultations');
        setConsultations(response.data);
      } catch (err) {
        console.error("Error fetching consultations:", err);
        setError("Failed to fetch consultations.");
        toast.error("Failed to fetch consultations.");
      }
    };

    fetchConsultations();
  }, []);

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
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Doctor Sign in
                      </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form className="space-y-6" onSubmit={handleDoctorLogin}>
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
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                              autoComplete="email"
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="password"
                              className="block px-2 text-sm font-medium leading-6 text-gray-900"
                            >
                              Password
                            </label>
                            <div className="text-sm">
                              <a
                                href="#"
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                              ></a>
                            </div>
                          </div>
                          <div className="mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              autoComplete="current-password"
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                             Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <div className="flex min-h-full flex-col justify-center px-6  lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Doctor Sign up
                      </h2>
                    </div>

                    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form className="space-y-6" onSubmit={handleDoctorSubmit}>
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
                              value={registerName}
                              onChange={(e) => setRegisterName(e.target.value)}
                              autoComplete="name"
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="speciality"
                            className="block px-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            speciality
                          </label>
                          <div className="mt-2">
                            <input
                              id="speciality"
                              name="speciality"
                              type="text"
                              value={registerSpeciality}
                              onChange={(e) =>
                                setRegisterSpeciality(e.target.value)
                              }
                              autoComplete="speciality"
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
                              value={registerEmail}
                              onChange={(e) => setRegisterEmail(e.target.value)}
                              autoComplete="email"
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
                              type="number"
                              value={registerPhone}
                              onChange={(e) => setRegisterPhone(e.target.value)}
                              autoComplete="phone"
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="yoe"
                            className="block px-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            Years of Experience
                          </label>
                          <div className="mt-2">
                            <input
                              id="yoe"
                              name="yoe"
                              type="number"
                              value={registerExperience}
                              onChange={(e) =>
                                setRegisterExperience(e.target.value)
                              }
                              autoComplete="yoe"
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="password"
                              className="block px-2 text-sm font-medium leading-6 text-gray-900"
                            >
                              Password
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              value={registerPassword}
                              onChange={(e) =>
                                setRegisterPassword(e.target.value)
                              }
                              autoComplete="current-password"
                              required
                              className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Sign Up
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
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default Doctor;
