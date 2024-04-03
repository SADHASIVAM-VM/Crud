import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Editflx = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [upData, setUpData] = useState({
    name: "",
    age: " ",
    mail: "",
    ph: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/users/" + id)
      .then((res) => res.json())
      .then((res) => {
        setUpData(res);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Sucessfully Updated");
    fetch("http://localhost:3000/users/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("The Response is Denied");
        }
      })
      .then(() => window.location.reload())
      .catch((err) => console.log("error" + err));
  };

  const handleChange = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value });
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

      <h1 className="text-2xl md:text-4xl text-center">UPDATE FORMS</h1>
      <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 shadow-md rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={upData.name}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-gray-700 font-medium mb-2"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={upData.age}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="mail"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={upData.mail}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="ph"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={upData.ph}
            />
          </div>

          <div className="flex gap-3">
            <button
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => navigate("/")}>
              Back
            </button>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Editflx;
