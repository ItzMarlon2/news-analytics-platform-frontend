import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js que usaremos
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyReportChart = (props) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchReportData = async () => {
      if (!props.uid) {
        
        setLoading(false);
        return;
      }else{
      try {
        
        const response = await axios.get(`http://localhost:8000/stats/${props.uid}/last_week`);
        const data = response.data.data;
        console.log(data);
        
        // Preparar datos para el gráfico
        const labels = data?.map((entry) => entry.date);
        const articlesCounts = data?.map((entry) => entry.articles_upload);
        
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Artículos subidos',
              data: articlesCounts,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        setError('Error al obtener los datos del reporte para el gráfico.');
        setLoading(false);
      }
    }
    };

    fetchReportData();
  }, [props.uid]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Gráfico del Reporte Semanal</h2>
      {loading ? (
        <p className="text-gray-600">Cargando gráfico...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        chartData.labels && <Bar data={chartData} />
      )}
    </div>
  );
};

export default WeeklyReportChart;