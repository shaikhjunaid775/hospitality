import React, { useState } from "react";
import defaultUser from "../assets/images/default-user.png" 
import axios from 'axios'

function Patient() {
    const [openTab, setOpenTab] = useState(1);
    const [file, setFile] = useState(defaultUser);
    
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [surgeyHistory, setSurgeyHistory] = useState("");
    const [illnessHistory, setIllnessHistory] = useState("");
    const [password, setPassword] = useState("");
  
    const handlePreview = (e) => {
      setFile(URL.createObjectURL(e.target.files[0]));
      console.log(e.target.files)
    }

    const handlePateintsubmit = (e) =>{
      e.preventDefault();
      axios.post('/patient', {name, email, password})
      .then(result => console.log(result))
      .catch(arr => console.log(err))
    }
    


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
                        Sign in
                      </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form className="space-y-6" action="#" method="POST">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium leading-6 text-gray-900"
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
                              autoComplete="current-password"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        Sign up
                      </h2>
                    </div>

                    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form className="space-y-6" onSubmit={handlePateintsubmit}>
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
                            <label className="block">
                              <input
                                type="file"
                                className="block w-full text-sm text-slate-500
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
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="name"
                              name="name"
                              type="text"
                              autoComplete="name"
                              onChange={(e)=>{setName(e.target.value)}}
                              value={name}
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="age"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Age
                          </label>
                          <div className="mt-2">
                            <input
                              id="age"
                              name="age"
                              type="number"
                              autoComplete="age"
                              onChange={(e)=>{setAge(e.target.value)}}
                              value={age}
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              onChange={(e)=>{setEmail(e.target.value)}}
                              value={email}
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              name="phone"
                              type="number"
                              autoComplete="phone"
                              onChange={(e)=>{setPhone(e.target.value)}}
                              value={phone}
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="yoe"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            History of surgery
                          </label>
                          <div className="mt-2">
                            <input
                              id="hos"
                              name="hos"
                              type="text"
                              autoComplete="hos"
                              onChange={(e)=>{setSurgeyHistory(e.target.value)}}
                              value={surgeyHistory}
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="hoi"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            History of Illness
                          </label>
                          <div className="mt-2">
                            <input
                              id="hoi"
                              name="hoi"
                              type="text"
                              autoComplete="hoi"
                              onChange={(e)=>{setIllnessHistory(e.target.value)}}
                              value={illnessHistory}
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Password
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              onChange={(e)=>{setPassword(e.target.value)}}
                              value={password}
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
    </div>
  );
}

export default Patient;
