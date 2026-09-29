import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Shield } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full p-6 justify-center bg-page relative">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-electric/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      
      <div className="flex flex-col items-center mb-12 relative z-10">
        <Shield size={64} className="text-electric mb-4" />
        <h1 className="text-[32px] font-bold text-navy">ZIVION</h1>
        <p className="text-secondary text-[16px] text-center mt-2">Smarter Communities.<br/>Better Living.</p>
      </div>

      <div className="w-full space-y-4 relative z-10">
        <p className="text-sm text-secondary text-center mb-2">Select your role to continue</p>
        
        <Button onClick={() => navigate('/guard')}>
          Login as Security Guard
        </Button>
        
        <Button variant="secondary" onClick={() => navigate('/supervisor')}>
          Login as Supervisor
        </Button>
        
        <Button variant="outline" onClick={() => navigate('/admin')}>
          Login as Admin
        </Button>
      </div>
    </div>
  );
};
