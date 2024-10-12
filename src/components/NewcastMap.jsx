import axios from "axios";
import React, { useEffect, useState } from "react";

const NewcastMap = ({created, setCreated}) => {
  const [newCasts, setNewCasts] = useState([]);

  const getNewcast = async () => {
    try {
      const response = await axios.get("http://localhost:8000/newcast");
      
      if (response.data.data) {
        setNewCasts(response.data.data);
        setCreated(false)
      }
    } catch (error) {}
  };

  useEffect(() => {
    getNewcast()
  }, [created])
  
  
  return (
    <div className="p-6 bg-white shadow-md rounded-lg flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-4">Noticieros</h2>
      {newCasts.length === 0 ? (
        <p className="text-gray-600">No hay noticieros disponibles.</p>
      ) : (
        <ul className="list-disc pl-5">
          {newCasts?.map((newCast, index) => (
            <li key={index} className="mb-2 text-gray-700">
              {newCast.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewcastMap;
