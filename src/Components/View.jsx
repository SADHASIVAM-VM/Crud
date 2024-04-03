import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEnvelope, faHome, faLeftLong, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';

const View = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const[oneVal, setOneVal]= useState({});

    console.log(id)
    useEffect(()=>{
        fetch("http://localhost:3000/users/"+id)
        .then((res) => res.json())
        .then(res => setOneVal(res))
        .catch((err)=> console.log(err))
    },[])
  return (
   <>
    <h1 className='text-center mb-10 text-2xl md:text-4xl '>INDIVIDUAL USERS DETAILS <FontAwesomeIcon icon={faArrowRight}/> <span className="text-green-500">{oneVal.name}</span></h1>
 
    <div className="flex justify-center items-center mt-20 ">
    <div className="bg-black  shadow-md rounded-lg overflow-hidden w-[500px]">

<div className="p-4">
  <div className="flex items-center justify-center ">
    <img className="h-20 w-20 rounded-full object-cover" src={'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='} alt="Profile" />
  </div>
  <div className="text-center mt-4 text-white">
    <h2 className="text-xl font-semibold">{oneVal.name}</h2>
    <p className=" text-sm">{oneVal.age}</p>
  </div>
</div>
<div className="border-t border-gray-200 p-4 text-white">
  <div className="flex items-center mb-2">
    <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
    <span className="">{oneVal.mail}</span>
  </div>
  <div className="flex items-center mb-2">
    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500 mr-2" />
    <span className="">{oneVal.location}</span>
  </div>
  <div className="flex items-center">
    <FontAwesomeIcon icon={faPhone} className="text-gray-500 mr-2" />
    <span className="">{oneVal.ph}</span>
  </div>
</div>

<div className="flex justify-center my-3">
    <button className='px-3 py-1 flex  gap-2 items-center bg-blue-400 rounded-lg text-white' onClick={()=> navigate('/')}><FontAwesomeIcon icon={faHome}/>Back</button>
</div>
</div>
    </div>
    </>
  );
};

export default View;
