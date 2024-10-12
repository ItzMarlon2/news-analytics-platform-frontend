import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UploadPage from '../pages/UploadPage'
import ReportPage from '../pages/ReportPage'
import DashboardPage from '../pages/DashboardPage'
import Navbar from '../components/Navbar'
import NewcastPage from '../pages/NewcastPage'

const AppRouter = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
      <Route path="/" element={<NewcastPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  )
}

export default AppRouter