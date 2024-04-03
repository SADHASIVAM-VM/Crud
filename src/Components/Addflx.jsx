import { faAt, faLeftLong, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import React, { createContext, useState } from "react";

import {ToastContainer, toast } from "react-toastify";

export const AddContext = createContext();
const Addflx = () => {
  const navigate = useNavigate();
  const [valids, setValid] = useState(false);
  const [getData, setData] = useState({
   
    name: "",
    age: ' ',
    mail: "",
    ph:''
    
  });
  
  const handleChange = (e) => {
    setData({ ...getData, [e.target.name]: e.target.value });
  };

  const handleSumbit = (e) => {
    toast.success("Successfully item Added")
    e.preventDefault();

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getData),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
      
  };

  return (
    <>
     <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className="flex justify-center sticky hidnum">
        <h1 className="text-2xl md:text-4xl mt-3 ">ADD ITEMS</h1>
      </div>
      <div className="contaier  flex items-center  justify-center mt-5">
        <div className="flex justify-center  ">
          <form
            action=""
            className="border-2 p-10 rounded-lg shadow-sm"
            onSubmit={handleSumbit}
          >
            <label htmlFor="" className="flex flex-col">
              NAME :
              {getData.name.length == 0 && valids && (
                <span className="text-red-300">You entered wrong</span>
              )}
            </label>
            <input
              type="text"
              className="border p-1 rounded-md md:w-[700px] mb-4 px-3"
              name="name"
              value={getData.name}
              onChange={(e) => handleChange(e)}
              onMouseDown={(e) => setValid(true)}
              required
            />

            <label htmlFor="">
              AGE :
            </label>
            <input
              type="number"
              className="border p-1 rounded-md md:w-[700px] mb-4 px-3"
              name="age"
              value={getData.age}
              onChange={(e) => handleChange(e)}
              required
              maxLength={2}/>

            <div className="relative">
              <label htmlFor="">E-MAIL :</label>
              <input
                type="email"
                className="border p-1 rounded-md md:w-[700px] mb-4 px-3"
                value={getData.mail}
                onChange={(e) => handleChange(e)}
                name="mail"
                required
              />

              <span className="absolute bottom-5 right-2">
                <FontAwesomeIcon icon={faAt} />
              </span>
            </div>

            <label htmlFor="">PHONE NUMBER :</label>
            <input
              type="number"
              className="border p-1 rounded-md md:w-[700px] mb-4 px-3"
              value={getData.ph}
              onChange={(e) => handleChange(e)}
              name="ph"
              required
              maxLength={10}
            />

            <div className="btns flex gap-3 my-3">
              <button
                className="bg-green-400 text-white rounded-md px-2 flex items-center gap-3 p-1"
                type="submit"
              >
                <FontAwesomeIcon icon={faSave} />
                Save
              </button>
              <button
                className="bg-red-500 text-white rounded-md px-2 flex items-center gap-3 p-1"
                onClick={() => navigate("/")}
              >
                <FontAwesomeIcon icon={faLeftLong} />
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addflx;
