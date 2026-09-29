import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { ShieldAlert, Users, ClipboardList, Settings, ArrowLeft } from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full bg-page">
      {/* Header */}
      <div className="bg-navy pt-12 pb-6 px-6 rounded-b-[24px] text-white relative shadow-lg">
        <button onClick={() => navigate('/')} className="absolute top-6 left-6 text-white/70 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[24px] font-bold mt-4">Admin Dashboard</h1>
        <p className="text-cyan text-[14px] mt-1">System Overview</p>
      </div>

      <div className="p-5 -mt-6 z-10 flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="flex flex-col items-center py-6">
            <Users size={28} className="text-electric mb-2" />
            <span className="text-[28px] font-bold text-navy leading-none">24</span>
            <span className="text-[13px] text-secondary mt-1">Active Guards</span>
          </Card>
          <Card className="flex flex-col items-center py-6">
            <ShieldAlert size={28} className="text-warning mb-2" />
            <span className="text-[28px] font-bold text-navy leading-none">3</span>
            <span className="text-[13px] text-secondary mt-1">Incidents</span>
          </Card>
        </div>

        <h2 className="text-[18px] font-semibold text-navy mb-3">Recent Activity</h2>
        <Card className="mb-6">
          <div className="flex items-start mb-4 pb-4 border-b border-border">
            <div className="w-2.5 h-2.5 rounded-full bg-success mt-1.5 mr-3 shrink-0"></div>
            <div>
              <p className="text-[14px] font-medium text-text">Shift Change Completed</p>
              <p className="text-[12px] text-secondary mt-0.5">Gate A • 10 mins ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2.5 h-2.5 rounded-full bg-warning mt-1.5 mr-3 shrink-0"></div>
            <div>
              <p className="text-[14px] font-medium text-text">Visitor Overstay Alert</p>
              <p className="text-[12px] text-secondary mt-0.5">Block B • 25 mins ago</p>
            </div>
          </div>
        </Card>

        <h2 className="text-[18px] font-semibold text-navy mb-3">Quick Actions</h2>
        <Card className="flex justify-around items-center py-6">
          <div className="flex flex-col items-center cursor-pointer hover:opacity-80">
            <ClipboardList size={28} className="text-electric mb-2" />
            <span className="text-[13px] font-medium text-text">Reports</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:opacity-80">
            <Users size={28} className="text-cyan mb-2" />
            <span className="text-[13px] font-medium text-text">Staff</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:opacity-80">
            <Settings size={28} className="text-secondary mb-2" />
            <span className="text-[13px] font-medium text-text">Settings</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
