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
  Search,
  Plus,
  QrCode,
  Package,
  PhoneCall,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Visitors', path: '/dashboard/visitors', icon: Users },
    { name: 'Vehicles', path: '/dashboard/vehicles', icon: CarFront },
  ];

  const handleSosTrigger = () => {
    setSosTriggered(true);
    setTimeout(() => {
      setSosTriggered(false);
      setSosModalOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-page flex font-sans antialiased text-text selection:bg-electric/20 selection:text-electric">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop & Tablet Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy text-white transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 h-20 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2.5 rounded-xl shadow-md">
              <Building2 size={22} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wide leading-none text-white">BEE PROPERTY</span>
              <span className="text-[10px] font-medium text-cyan mt-1 tracking-wider uppercase">Guard Console</span>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-white/60 hover:text-white rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Live Guard Status Card */}
        <div className="mx-4 my-4 p-3.5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-white text-sm">
                G1
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-navy ring-1 ring-white/20"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Main Gate • Post 01</p>
              <p className="text-[11px] text-white/60">Shift: Morning (08:00–16:00)</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  isActive 
                    ? 'bg-electric text-white shadow-lg shadow-electric/25' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'text-white/60'} />
                <span>{item.name}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              setSidebarOpen(false);
              setSosModalOpen(true);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-error/90 hover:bg-error/10 hover:text-error"
          >
            <AlertTriangle size={20} />
            <span>Emergency SOS</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            <span>End Shift & Exit</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-hidden">
        
        {/* Clear Classic Header: Only Bee Property & Right Side Icons */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-border px-4 md:px-8 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden text-navy hover:bg-slate-100 p-2 rounded-xl border border-border"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            {/* Clear Brand: Just Bee Property */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
                <ShieldAlert size={20} className="stroke-[1.75]" />
              </div>
              <span className="text-lg md:text-xl font-black text-navy tracking-tight">Bee Property</span>
            </div>
          </div>

          {/* Classic Right Side Icons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Classic Emergency SOS Icon */}
            <button
              onClick={() => setSosModalOpen(true)}
              className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center text-red-600 transition-colors"
              title="Emergency SOS"
            >
              <AlertTriangle size={19} className="stroke-[1.75]" />
            </button>

            {/* Classic Notification / Security Bell Icon */}
            <button
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-navy transition-colors"
              title="Security Alerts"
            >
              <Bell size={19} className="stroke-[1.75]" />
            </button>
          </div>
        </header>

        {/* Page Content with safe padding for mobile bottom bar */}
        <main className="flex-1 overflow-y-auto bg-page p-3.5 sm:p-6 md:p-8 pb-28 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* =========================================================================
          MOBILE-FIRST BOTTOM NAVIGATION BAR (Thumb Zone Optimized for 98% Mobile Users)
         ========================================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        {/* Soft blur backdrop container */}
        <nav className="bg-white/95 backdrop-blur-md border-t border-border px-3 py-1.5 shadow-[0_-8px_25px_rgba(0,0,0,0.06)] flex items-center justify-around relative">
          
          {/* Tab 1: Dashboard */}
          <button
            onClick={() => navigate('/dashboard')}
            className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
              location.pathname === '/dashboard'
                ? 'text-electric font-semibold'
                : 'text-secondary hover:text-navy'
            }`}
          >
            <div className={`p-1 rounded-xl transition-all ${location.pathname === '/dashboard' ? 'bg-electric/10 scale-105' : ''}`}>
              <LayoutDashboard size={20} />
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">Overview</span>
          </button>

          {/* Tab 2: Visitors */}
          <button
            onClick={() => navigate('/dashboard/visitors')}
            className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
              location.pathname.startsWith('/dashboard/visitors')
                ? 'text-electric font-semibold'
                : 'text-secondary hover:text-navy'
            }`}
          >
            <div className={`p-1 rounded-xl relative transition-all ${location.pathname.startsWith('/dashboard/visitors') ? 'bg-electric/10 scale-105' : ''}`}>
              <Users size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-success rounded-full ring-2 ring-white"></span>
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">Visitors</span>
          </button>

          {/* Center Thumb FAB: Quick Action Trigger */}
          <div className="relative -top-5 flex flex-col items-center">
            <button
              onClick={() => setQuickActionOpen(true)}
              aria-label="Quick Action Entry"
              className="w-14 h-14 rounded-full bg-gradient-primary text-white flex items-center justify-center shadow-lg shadow-electric/40 active:scale-95 transition-all ring-4 ring-white"
            >
              <Plus size={28} className="stroke-[2.5]" />
            </button>
            <span className="text-[10px] font-bold text-navy mt-1">Quick In</span>
          </div>

          {/* Tab 3: Vehicles */}
          <button
            onClick={() => navigate('/dashboard/vehicles')}
            className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
              location.pathname.startsWith('/dashboard/vehicles')
                ? 'text-electric font-semibold'
                : 'text-secondary hover:text-navy'
            }`}
          >
            <div className={`p-1 rounded-xl transition-all ${location.pathname.startsWith('/dashboard/vehicles') ? 'bg-electric/10 scale-105' : ''}`}>
              <CarFront size={20} />
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">Vehicles</span>
          </button>

          {/* Tab 4: SOS Emergency */}
          <button
            onClick={() => setSosModalOpen(true)}
            className="flex flex-col items-center justify-center min-w-[56px] py-1 transition-all text-error/90 hover:text-error active:scale-95"
          >
            <div className="p-1 rounded-xl bg-error/10">
              <AlertTriangle size={20} className="text-error" />
            </div>
            <span className="text-[11px] font-bold text-error mt-0.5 tracking-tight">SOS</span>
          </button>
        </nav>
      </div>

      {/* =========================================================================
          THUMB-ACCESSIBLE QUICK ACTION BOTTOM DRAWER (Mobile)
         ========================================================================= */}
      {quickActionOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setQuickActionOpen(false)}
          />

          {/* Slide-up Bottom Sheet */}
          <div className="relative bg-white rounded-t-3xl p-6 shadow-2xl border-t border-border z-10 animate-in slide-in-from-bottom duration-300">
            {/* Grab handle */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5" />

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-navy">Instant Gate Action</h3>
                <p className="text-xs text-secondary">Tap any action for rapid check-in</p>
              </div>
              <button 
                onClick={() => setQuickActionOpen(false)}
                className="p-2 text-secondary hover:text-navy rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => {
                  setQuickActionOpen(false);
                  navigate('/dashboard/visitors');
                }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-left active:scale-98 transition-all hover:bg-blue-100/50"
              >
                <div className="w-11 h-11 rounded-xl bg-electric text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Users size={22} />
                </div>
                <div>
                  <span className="text-sm font-bold text-navy block">New Guest</span>
                  <span className="text-[11px] text-secondary">Visitor pass entry</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setQuickActionOpen(false);
                  navigate('/dashboard/visitors');
                }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-cyan/10 border border-cyan/20 text-left active:scale-98 transition-all hover:bg-cyan/20"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan text-navy flex items-center justify-center shrink-0 shadow-sm">
                  <Package size={22} />
                </div>
                <div>
                  <span className="text-sm font-bold text-navy block">Delivery</span>
                  <span className="text-[11px] text-secondary">Amazon, Swiggy, etc.</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setQuickActionOpen(false);
                  navigate('/dashboard/vehicles');
                }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-left active:scale-98 transition-all hover:bg-indigo-100/50"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CarFront size={22} />
                </div>
                <div>
                  <span className="text-sm font-bold text-navy block">Vehicle Log</span>
                  <span className="text-[11px] text-secondary">Number plate entry</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setQuickActionOpen(false);
                  navigate('/dashboard');
                }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-left active:scale-98 transition-all hover:bg-emerald-100/50"
              >
                <div className="w-11 h-11 rounded-xl bg-success text-white flex items-center justify-center shrink-0 shadow-sm">
                  <QrCode size={22} />
                </div>
                <div>
                  <span className="text-sm font-bold text-navy block">Scan QR</span>
                  <span className="text-[11px] text-secondary">Digital pre-invite</span>
                </div>
              </button>
            </div>

            <button
              onClick={() => setQuickActionOpen(false)}
              className="w-full py-3 rounded-xl bg-page text-secondary text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          EMERGENCY SOS MODAL (Accessible on both Mobile & Desktop)
         ========================================================================= */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-navy/70 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => !sosTriggered && setSosModalOpen(false)}
          />

          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-error/20 z-10 animate-in zoom-in-95 duration-200">
            {sosTriggered ? (
              <div className="text-center py-6">
                <div className="w-20 h-20 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <ShieldAlert size={44} />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-1">SOS Alert Dispatched!</h3>
                <p className="text-sm text-secondary mb-4">
                  Supervisor, Security Operations Center, and Main Control Room have been alerted with live GPS.
                </p>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-error text-white text-xs font-bold animate-pulse">
                  ALARM ACTIVE • MAIN GATE
                </span>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-error/10 text-error flex items-center justify-center shrink-0">
                    <AlertTriangle size={26} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy">Emergency SOS Trigger</h3>
                    <p className="text-xs text-secondary">Instant Gate Alarm & Supervisor Dispatch</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-error/5 border border-error/20 mb-5 text-xs text-error leading-relaxed">
                  Pressing the button below broadcasts an immediate security alert to all on-duty supervisors, gate intercoms, and property administration.
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-page text-xs font-medium text-navy">
                    <span>Gate Post:</span>
                    <span className="font-bold">Main Gate (Post #01)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-page text-xs font-medium text-navy">
                    <span>Guard on Duty:</span>
                    <span className="font-bold">Officer #1042</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-page text-xs font-medium text-navy">
                    <span>Supervisor Hotline:</span>
                    <span className="font-bold text-electric flex items-center gap-1">
                      <PhoneCall size={12} /> +1 (800) 555-GATE
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setSosModalOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-border text-secondary font-semibold text-sm hover:bg-page transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSosTrigger}
                    className="flex-1 py-3 px-4 rounded-xl bg-error text-white font-bold text-sm shadow-lg shadow-error/30 hover:bg-red-600 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <AlertTriangle size={18} />
                    <span>BROADCAST SOS</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
