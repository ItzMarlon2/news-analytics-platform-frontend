import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-bold">Diarios y Análisis</h1>
        <div className="space-x-4">
          <Link to="/upload" className="text-white hover:text-gray-200">
            Cargar Artículos
          </Link>
          <Link to="/report" className="text-white hover:text-gray-200">
            Reporte Semanal
          </Link>
          <Link to="/dashboard" className="text-white hover:text-gray-200">
            Análisis Estadístico
          </Link>
          <Link to="/" className="text-blue-500 bg-white hover:text-blue-800  px-4 py-2 rounded-lg">
            Inicio
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar