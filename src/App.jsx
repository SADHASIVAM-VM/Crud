import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPen,
  faPlus,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from 'react-epic-spinners'

import "./App.css";

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setUserData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setLoading(false)
  }, [userData, setUserData]);

  function handleDelete(id) {
    if (window.confirm("ARE YOU SURE")) {
      fetch("http://localhost:3000/users/" + id, {
        method: "DELETE",
      })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
    toast.warning("Removed Successfully");
  }

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
       
      {
        !loading ?   <ClipLoader
        color={color}
        loading={!loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />:
        <section className="flex flex-col ">
        <h1 className="text-center text-2xl md:text-4xl mt-2">
          <span className="text-blue-500">CRUD</span> OPERATIONS
        </h1>
        <div className="inline-block">
          <button
            className="flex justify-start p-2 bg-green-300 rounded-lg text-center items-center gap-2 mt-4 ml-5 "
            onClick={() => navigate("/additm")}
          >
            <FontAwesomeIcon icon={faPlus} /> ADD
          </button>
        </div>
        <div className="relative overflow-x-auto  sm:rounded-lg mx-5 mt-10 border-2 ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  age
                </th>
                <th scope="col" className="px-6 py-3">
                  e-mail
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone number
                </th>
                <th scope="col" className="px-6 py-3">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={user.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.name}
                  </th>
                  {user.age < 18 ? (
                    <td className="text-red-400 px-6 py-4">{user.age}</td>
                  ) : (
                    <td className="px-6 py-4">{user.age}</td>
                  )}
                  <td className="px-6 py-4">{user.mail}</td>
                  <td className="px-6 py-4">{user.ph}</td>
                  <td className=" px-4 py-2">
                    <div className="flex gap-3">
                      <Link to={`/edit/${user.id}`}>
                        {" "}
                        <button className="bg-green-500 px-2 rounded ">
                          <FontAwesomeIcon
                            icon={faPen}
                            className="text-white text-sm"
                          />
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 px-2 rounded "
                        onClick={() => handleDelete(user.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="text-white text-sm"
                        />
                      </button>

                      <Link to={`/view/${user.id}`}>
                        <button className="bg-blue-400 px-2 rounded ">
                          <FontAwesomeIcon
                            icon={faEye}
                            className="text-white text-sm"
                          />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      }
    </>
  );
}

export default App;
