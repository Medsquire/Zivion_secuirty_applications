import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { UserCheck, Clock, MapPin, ArrowLeft } from 'lucide-react';

export const SupervisorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full bg-page">
      <div className="bg-navy pt-12 pb-6 px-6 rounded-b-[24px] text-white shadow-lg relative">
        <button onClick={() => navigate('/')} className="absolute top-6 left-6 text-white/70 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[24px] font-bold mt-4">Supervisor View</h1>
        <p className="text-cyan text-[14px] mt-1">Shift: Morning (08:00 - 16:00)</p>
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        <h2 className="text-[18px] font-semibold text-navy mb-3">Active Patrols</h2>
        
        <Card className="mb-6">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center mr-3 border border-border">
                <UserCheck size={20} className="text-electric" />
              </div>
              <div>
                <p className="text-[15px] font-semibold text-text leading-tight">John Doe</p>
                <p className="text-[12px] text-secondary mt-1 flex items-center">
                  <MapPin size={12} className="mr-1" /> Main Gate
                </p>
              </div>
            </div>
            <span className="bg-success/10 text-success text-[12px] font-semibold px-2.5 py-1 rounded-full">
              Active
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center mr-3 border border-border">
                <UserCheck size={20} className="text-electric" />
              </div>
              <div>
                <p className="text-[15px] font-semibold text-text leading-tight">Mike Smith</p>
                <p className="text-[12px] text-secondary mt-1 flex items-center">
                  <MapPin size={12} className="mr-1" /> Block A Basement
                </p>
              </div>
            </div>
            <span className="bg-warning/10 text-warning text-[12px] font-semibold px-2.5 py-1 rounded-full">
              Patrolling
            </span>
          </div>
        </Card>

        <h2 className="text-[18px] font-semibold text-navy mb-3">Schedule</h2>
        <Card className="mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center mr-3">
              <Clock size={20} className="text-cyan" />
            </div>
            <div>
              <p className="text-[15px] font-medium text-text">Shift Handover</p>
              <p className="text-[13px] text-secondary mt-0.5">Today, 15:45 PM</p>
            </div>
          </div>
        </Card>

        <Button>Assign Patrol Route</Button>
      </div>
    </div>
  );
};
