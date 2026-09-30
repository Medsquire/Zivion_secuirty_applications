import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Menu, 
  X, 
  LayoutDashboard, 
  Users, 
  CarFront, 
  AlertTriangle, 
  LogOut,
  Bell,
  Search
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Visitors', path: '/dashboard/visitors', icon: Users },
    { name: 'Vehicles', path: '/dashboard/vehicles', icon: CarFront },
    { name: 'SOS Alerts', path: '/dashboard/sos', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-page flex font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy text-white transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 px-6 h-20 border-b border-white/10">
          <div className="bg-white/10 p-2 rounded-lg">
            <Building2 size={24} className="text-[#3B82F6]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-wide leading-none">ZIVION</span>
            <span className="text-[10px] font-medium text-white/60">Guard Terminal</span>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-[#1D4ED8] text-white shadow-md' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-border px-4 md:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-navy hover:bg-page p-2 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden md:flex items-center bg-page px-4 py-2 rounded-lg border border-border focus-within:border-[#1D4ED8] focus-within:ring-1 focus-within:ring-[#1D4ED8] transition-all w-80">
              <Search size={18} className="text-secondary mr-2" />
              <input 
                type="text" 
                placeholder="Search visitors, vehicles..." 
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="relative text-secondary hover:text-navy transition-colors">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-border pl-4 md:pl-6">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-sm font-semibold text-navy">Guard #1042</span>
                <span className="text-xs text-success">On Duty • Main Gate</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1D4ED8] flex items-center justify-center text-white font-bold border-2 border-white shadow-sm cursor-pointer">
                G
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-page p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
};
