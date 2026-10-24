import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, Lock, Eye, EyeOff, HeadphonesIcon, Users, Car, Package, Shield, ChevronDown } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { role: 'Admin', email: 'admin@zivion.com', password: 'password123', path: '/dashboard' },
  { role: 'Supervisor', email: 'supervisor@zivion.com', password: 'password123', path: '/dashboard' },
  { role: 'Security Guard', email: 'guard@zivion.com', password: 'password123', path: '/dashboard' },
];

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showDemoDropdown, setShowDemoDropdown] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const selectDemoAccount = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setShowDemoDropdown(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-page font-sans">
      {/* Left Panel - Branding & Image */}
      <div className="w-full md:w-1/2 relative flex flex-col justify-between p-8 md:p-16 text-white overflow-hidden min-h-[500px] md:min-h-screen">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80")' }}
        ></div>
        <div className="absolute inset-0 z-0 bg-navy/90 backdrop-blur-[2px]"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center gap-3 mb-16 cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-white/10 p-2 rounded-lg">
                <Building2 size={32} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-wide leading-none mb-1">ZIVION</span>
                <span className="text-xs font-medium text-white/80">Apartment Gate Security</span>
              </div>
            </div>

            <div className="max-w-md">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.15]">
                Secure Entrance.<br />Safer Community.
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                Helping security guards manage visitors, vehicles and access — all in one place.
              </p>
            </div>
          </div>

          {/* Feature Icons Grid */}
          <div className="grid grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-col items-center text-center">
              <Users size={28} className="mb-3 text-white/90" />
              <span className="text-[11px] font-medium text-white/80">Visitor<br/>Management</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Car size={28} className="mb-3 text-white/90" />
              <span className="text-[11px] font-medium text-white/80">Vehicle<br/>Entry</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Package size={28} className="mb-3 text-white/90" />
              <span className="text-[11px] font-medium text-white/80">Delivery<br/>Management</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield size={28} className="mb-3 text-white/90" />
              <span className="text-[11px] font-medium text-white/80">Real-time<br/>Security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 relative flex items-center justify-center p-6 md:p-12 bg-[#F8FAFC] overflow-hidden">
        {/* Subtle Background Shapes */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/50 mix-blend-multiply blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/50 mix-blend-multiply blur-3xl"></div>

        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 relative z-10">
          
          {/* Logo inside card (Visible primarily on mobile, but matches design) */}
          <div className="flex items-center gap-3 mb-10 justify-center">
            <Building2 size={36} className="text-[#1D4ED8]" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold tracking-wide leading-none text-navy mb-1">ZIVION</span>
              <span className="text-xs font-medium text-secondary">Apartment Gate Security</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-navy mb-2">Login</h2>
          <p className="text-sm text-secondary mb-8">Please enter your credentials to continue</p>

          {/* Demo Accounts Dropdown (Subtle Integration) */}
          <div className="relative mb-6">
            <button 
              type="button"
              onClick={() => setShowDemoDropdown(!showDemoDropdown)}
              className="w-full flex items-center justify-between bg-blue-50/50 border border-blue-100 text-[#1D4ED8] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              <span>Load Demo Credentials</span>
              <ChevronDown size={16} className={`transition-transform ${showDemoDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showDemoDropdown && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-border rounded-lg shadow-lg z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {DEMO_ACCOUNTS.map((acc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectDemoAccount(acc)}
                    className="w-full text-left px-4 py-3 hover:bg-page transition-colors border-b border-border last:border-b-0 flex justify-between items-center"
                  >
                    <span className="font-semibold text-navy text-sm">{acc.role}</span>
                    <span className="text-xs text-secondary">{acc.email}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-secondary" />
              </div>
              <input 
                type="text" 
                placeholder="Username / Guard ID" 
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-border rounded-lg text-sm text-text focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] transition-all placeholder:text-secondary/70"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-secondary" />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="Password" 
                className="w-full pl-11 pr-12 py-3.5 bg-white border border-border rounded-lg text-sm text-text focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] transition-all placeholder:text-secondary/70"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-secondary hover:text-navy transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    className="peer appearance-none w-4 h-4 border-2 border-[#1D4ED8] rounded-[4px] checked:bg-[#1D4ED8] transition-colors cursor-pointer"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm font-medium text-navy">Remember me</span>
              </label>
              
              <a href="#" className="text-sm font-medium text-[#1D4ED8] hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              className="w-full bg-[#1D4ED8] text-white py-3.5 rounded-lg text-[15px] font-semibold hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
            >
              Login <span className="text-xl leading-none">→</span>
            </button>
          </form>

          {/* Need Help */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-secondary">Need Help?</span>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <a href="#" className="flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:underline">
              <HeadphonesIcon size={18} /> Contact Support
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
