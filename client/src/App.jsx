import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import CampaignsList from './pages/CampaignsList'
import CampaignDetail from './pages/CampaignDetail'
import GalleryPage from './pages/GalleryPage'
import ScrollToTop from './components/ScrollToTop'
import GlobalLoader from './components/GlobalLoader'
import { theme } from './theme'
import './index.css'

import { AdminProvider } from './context/AdminContext'
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminCampaignsList from './pages/admin/CampaignsList'
import AdminDonationsList from './pages/admin/DonationsList'
import AdminGalleryList from './pages/admin/GalleryList'

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" />
        <GlobalLoader />
        <ScrollToTop />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="campaigns" element={<AdminCampaignsList />} />
            <Route path="donations" element={<AdminDonationsList />} />
            <Route path="gallery" element={<AdminGalleryList />} />
          </Route>

          {/* Public Routes */}
          <Route path="/" element={
            <div 
              className="font-body antialiased min-h-screen flex flex-col bg-paws-pattern" 
              style={{ backgroundColor: theme.colors.background, color: theme.colors.textMain }}
            >
              <Navbar />
              <main className="flex-grow">
                <Outlet />
              </main>
              <Footer />
            </div>
          }>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="campaigns" element={<CampaignsList />} />
            <Route path="campaigns/:id" element={<CampaignDetail />} />
            <Route path="gallery" element={<GalleryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  )
}
