import axios from 'axios';
import React, { useEffect, useState } from 'react'

const WeeklyReport = (props) => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCasts, setNewCasts] = useState([]);

  const getNewcast = async () => {
    try {
      const response = await axios.get("http://localhost:8000/newcast");

      if (response.data.data) {
        setNewCasts(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchReportData = async () => {
      if (!props.uid) {
        setLoading(false);
        return;
      }else{
      try {
        
        // Simulamos una solicitud GET al backend para obtener el reporte semanal.
        const response = await axios.get(`http://localhost:8000/stats/${props.uid}/last_week`);
        console.log(response);
        
        // La respuesta podría tener una estructura como:
        // { data: [{ date: '2024-10-01', articlesCount: 85 }, { date: '2024-10-02', articlesCount: 78 }, ...] }
        setReportData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Error al obtener el reporte semanal. Por favor, intenta nuevamente.');
        setLoading(false);
      }
    }
    };

    fetchReportData();
  }, [props.uid]);

  useEffect(() => {
    getNewcast()
  }, [])
  

  return (
    <div className="p-6 bg-white shadow-md rounded-lg flex flex-col gap-10">
      <div className="w-full flex flex-col gap-2">
      <label
        htmlFor="newcast"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Selecciona un noticiero
      </label>

      <select
        id="newcast"
        onChange={(e)=>{
          console.log(e.target);
          
          props.setUid(e.target.value)
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
      >
        <option value="" selected>Selecciona un noticiero</option>
        {newCasts.length === 0 ? (
          <option value="" selected>
            No existen noticieros
          </option>
        ) : (
          newCasts.map((newCast, index) => (
            <option key={index} value={newCast.uid}>
              {newCast.name}
            </option>
          ))
        )}
      </select>
      </div>
      <h2 className="text-xl font-bold mb-4">Reporte Semanal</h2>
      {loading ? (
        <p className="text-gray-600">Cargando reporte...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Fecha</th>
              <th className="py-2 px-4 border-b text-left">Día</th>
              <th className="py-2 px-4 border-b text-left">Cantidad de Artículos</th>

            </tr>
          </thead>
          <tbody>
            {reportData?.length > 0 ? (
              reportData?.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{entry.date}</td>
                  <td className="py-2 px-4 border-b">{entry.day_of_week}</td>
                  <td className="py-2 px-4 border-b">{entry.articles_upload}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-b text-center" colSpan="2">
                  No hay datos disponibles para la última semana.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WeeklyReport