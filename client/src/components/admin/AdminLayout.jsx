import React, { useContext, useState } from 'react';
import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import { theme } from '../../theme';
import { LayoutDashboard, Megaphone, Settings, LogOut, HeartHandshake, Image as ImageIcon } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLayout() {
  const { admin, loading, logout } = useContext(AdminContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Campaigns', path: '/admin/campaigns', icon: <Megaphone size={20} /> },
    { name: 'Donations', path: '/admin/donations', icon: <HeartHandshake size={20} /> },
    { name: 'Gallery', path: '/admin/gallery', icon: <ImageIcon size={20} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 overflow-hidden">
      <ToastContainer position="top-right" />

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 z-20 shadow-md" style={{ backgroundColor: theme.colors.textMain }}>
        <h2 className="text-xl font-bold" style={{ color: theme.colors.accent }}>Rakshak Admin</h2>
        <button className="text-white" onClick={() => setIsMobileMenuOpen(true)}>
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-30" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 text-white flex flex-col shadow-xl transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} 
        style={{ backgroundColor: theme.colors.textMain }}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: theme.colors.accent }}>Rakshak Admin</h2>
            <p className="text-sm text-white/60 mt-1">Logged in as {admin.username}</p>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin');
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all w-full text-left"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-slate-50 p-4 md:p-8 w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}
