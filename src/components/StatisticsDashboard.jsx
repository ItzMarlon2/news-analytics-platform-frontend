import axios from 'axios';
import React, { useEffect, useState } from 'react'

const StatisticsDashboard = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let data = window.localStorage.getItem('data')
  data = JSON.parse(data)
  let message = window.localStorage.getItem('message')
  
  useEffect(() => {
    if (!data) {
      setError('Error al obtener el resumen estadístico. Por favor, intenta nuevamente.');
      setLoading(false);
      return;
    }else{
      setSummaryData(data)
      setLoading(false)
    }

  }, []);
  console.log(summaryData);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Resumen del Análisis Estadístico</h2>
      {loading ? (
        <p className="text-gray-600">Cargando resumen...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <p className="text-lg">
              <strong>carga media:</strong> {summaryData.avgerage_upload}
            </p>
            <p className="text-lg">
              <strong>Artículos subidos hoy:</strong> {summaryData.uploaded_today}
            </p>
            <p className="text-lg">
              <strong>Desviación estandar:</strong> {summaryData.standard_deviation}
            </p>
            <p className="text-lg">
              <strong>Varianza:</strong> {summaryData.variance}
            </p>
            <p className="text-lg">
              <strong>Coeficiente de varianza:</strong> {summaryData.variation_coefficient}
            </p>
          </div>
          {!summaryData.is_normal_upload ? (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              <p>
                {message}
              </p>
            </div>
          ) : (
            <div className="p-4 bg-green-100 text-green-700 rounded-lg">
              {/* <p>
                La cantidad de artículos subidos ({summaryData.uploaded}) cumple con el umbral esperado de {summaryData.threshold}.
              </p> */}
              <p>{message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StatisticsDashboard