import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Users, QrCode, ClipboardEdit, AlertTriangle, Camera, ShieldCheck, Clock, CheckCircle2, CarFront } from 'lucide-react';

export const GuardDashboard = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [visitorType, setVisitorType] = useState<'guest' | 'delivery'>('guest');
  const [vehicleMode, setVehicleMode] = useState<'in' | 'out'>('in');
  
  const [visitorStatus, setVisitorStatus] = useState<'form' | 'waiting' | 'approved'>('form');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleVisitorRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitorStatus('waiting');
    setTimeout(() => {
      setVisitorStatus('approved');
      setTimeout(() => {
        setActiveModal(null);
        setTimeout(() => setVisitorStatus('form'), 300);
      }, 2000);
    }, 3000);
  };

  const handleSimulateAction = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setActiveModal(null);
      setTimeout(() => setIsSuccess(false), 300);
    }, 2000);
  };

  const renderSuccessState = (message: string) => (
    <div className="flex flex-col items-center py-8 animate-in zoom-in-50">
      <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
        <CheckCircle2 size={32} className="text-success" />
      </div>
      <h3 className="text-xl font-bold text-navy mb-2">Success!</h3>
      <p className="text-sm text-secondary text-center">{message}</p>
    </div>
  );

  const renderDropdowns = () => (
    <div className="grid grid-cols-2 gap-3 mb-4">
      <div>
        <label className="block text-[13px] font-medium text-navy mb-1.5">Block</label>
        <select className="w-full bg-page border border-border rounded-xl px-4 py-3 text-[14px] text-text focus:outline-none focus:border-[#1D4ED8] transition-all" required defaultValue="">
          <option value="" disabled>Select Block</option>
          <option value="A">Block A</option>
          <option value="B">Block B</option>
          <option value="C">Block C</option>
          <option value="D">Block D</option>
        </select>
      </div>
      <div>
        <label className="block text-[13px] font-medium text-navy mb-1.5">Apartment / Flat</label>
        <select className="w-full bg-page border border-border rounded-xl px-4 py-3 text-[14px] text-text focus:outline-none focus:border-[#1D4ED8] transition-all" required defaultValue="">
          <option value="" disabled>Select Flat</option>
          <option value="101">101</option>
          <option value="102">102</option>
          <option value="103">103</option>
          <option value="104">104</option>
          <option value="201">201</option>
          <option value="202">202</option>
          <option value="203">203</option>
          <option value="301">301</option>
          <option value="302">302</option>
          <option value="405">405</option>
          <option value="505">505</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-navy">Overview</h1>
        <p className="text-secondary text-sm mt-1">Main Gate • Current Shift: Morning (08:00 - 16:00)</p>
      </div>

      {/* Primary Actions Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          className="flex flex-col items-center justify-center py-8 cursor-pointer hover:shadow-lg transition-all group"
          onClick={() => setActiveModal('scan')}
        >
          <div className="bg-blue-50 p-4 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
             <QrCode size={36} className="text-[#1D4ED8]" />
          </div>
          <span className="text-lg font-bold text-navy text-center leading-tight">Scan Pass</span>
        </Card>
        
        <Card 
          className="flex flex-col items-center justify-center py-8 cursor-pointer hover:shadow-lg transition-all group"
          onClick={() => {
            setVisitorStatus('form');
            setActiveModal('visitor');
          }}
        >
          <div className="bg-blue-50 p-4 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
            <Users size={36} className="text-[#1D4ED8]" />
          </div>
          <span className="text-lg font-bold text-navy text-center leading-tight">New Visitor</span>
        </Card>

        <Card 
          className="flex flex-col items-center justify-center py-8 cursor-pointer hover:shadow-lg transition-all group"
          onClick={() => setActiveModal('vehicle')}
        >
          <div className="bg-blue-50 p-4 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
            <CarFront size={36} className="text-[#1D4ED8]" />
          </div>
          <span className="text-lg font-bold text-navy text-center leading-tight">Vehicle Log</span>
        </Card>

        <Card 
          className="flex flex-col items-center justify-center py-8 cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all group border-error/20 bg-error/5"
          onClick={() => setActiveModal('sos')}
        >
          <div className="bg-error/10 p-4 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
            <AlertTriangle size={36} className="text-error" />
          </div>
          <span className="text-lg font-bold text-error text-center leading-tight">SOS Alert</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Pending Approvals Section */}
         <section>
           <h2 className="text-lg font-semibold text-navy mb-4">Pending Approvals</h2>
           <Card className="p-0 overflow-hidden">
             <div className="p-5 border-b border-border flex flex-col gap-3">
               <div className="flex justify-between items-start">
                 <div>
                   <p className="text-sm font-semibold text-navy">Swiggy Delivery</p>
                   <p className="text-xs text-secondary mt-0.5">Block B • Apt 302</p>
                 </div>
                 <span className="bg-warning/10 text-warning text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1"><Clock size={10}/> Waiting</span>
               </div>
               <div className="flex gap-2 mt-1">
                 <button className="flex-1 py-1.5 bg-page border border-border hover:bg-gray-100 text-xs font-semibold rounded-lg transition-colors text-navy">Resend Ping</button>
               </div>
             </div>
             
             <div className="p-5 flex flex-col gap-3">
               <div className="flex justify-between items-start">
                 <div>
                   <p className="text-sm font-semibold text-navy">Mike Ross (Guest)</p>
                   <p className="text-xs text-secondary mt-0.5">Block A • Apt 201</p>
                 </div>
                 <span className="bg-warning/10 text-warning text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1"><Clock size={10}/> Waiting</span>
               </div>
               <div className="flex gap-2 mt-1">
                 <button className="flex-1 py-1.5 bg-page border border-border hover:bg-gray-100 text-xs font-semibold rounded-lg transition-colors text-navy">Resend Ping</button>
               </div>
             </div>
           </Card>
         </section>

         {/* Shift Schedule Section */}
         <section>
           <h2 className="text-lg font-semibold text-navy mb-4">My Schedule</h2>
           <Card className="p-0 overflow-hidden h-[calc(100%-2rem)] flex flex-col">
             <div className="p-6 border-b border-border hover:bg-slate-50 transition-colors flex justify-between items-center">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center">
                   <ClipboardEdit size={24} className="text-[#1D4ED8]" />
                 </div>
                 <div>
                   <p className="text-base font-semibold text-navy">Night Patrol</p>
                   <p className="text-sm text-secondary">20:00 - 04:00</p>
                 </div>
               </div>
               <span className="text-sm font-medium text-secondary">Upcoming</span>
             </div>
             
             <div className="p-6 bg-page flex-1 flex items-center justify-center border-t border-border mt-auto">
               <Button variant="outline" className="w-auto px-6" onClick={() => setActiveModal('log')}>
                 Add Log Entry
               </Button>
             </div>
           </Card>
         </section>

         {/* Recent Activity Section */}
         <section>
           <h2 className="text-lg font-semibold text-navy mb-4">Recent Activity</h2>
           <Card className="p-0 overflow-hidden">
             <div className="p-5 border-b border-border flex items-start gap-4">
               <div className="w-2 h-2 rounded-full bg-success mt-1.5 shrink-0"></div>
               <div>
                 <p className="text-sm font-semibold text-navy">Visitor Approved: John Smith</p>
                 <p className="text-xs text-secondary mt-0.5">Apt 104 • 10 mins ago</p>
               </div>
             </div>
             <div className="p-5 border-b border-border flex items-start gap-4">
               <div className="w-2 h-2 rounded-full bg-[#1D4ED8] mt-1.5 shrink-0"></div>
               <div>
                 <p className="text-sm font-semibold text-navy">Vehicle Entry: KA01-AB-1234</p>
                 <p className="text-xs text-secondary mt-0.5">Amazon Delivery • 25 mins ago</p>
               </div>
             </div>
             <div className="p-5 bg-page text-center">
                <button className="text-sm font-medium text-[#1D4ED8] hover:underline">View All Logs</button>
             </div>
           </Card>
         </section>
      </div>

      {/* Modals */}
      <Modal isOpen={activeModal === 'scan'} onClose={() => setActiveModal(null)} title="Scan Visitor Pass">
        {isSuccess ? renderSuccessState("Pass verified. Access granted.") : (
           <div className="flex flex-col items-center justify-center py-8">
             <div className="w-48 h-48 border-2 border-dashed border-[#1D4ED8]/50 rounded-3xl mb-6 relative flex items-center justify-center bg-[#1D4ED8]/5 overflow-hidden group cursor-pointer hover:border-[#1D4ED8] transition-colors" onClick={(e) => handleSimulateAction(e as any)}>
               <QrCode size={64} className="text-[#1D4ED8]/40 group-hover:text-[#1D4ED8] transition-colors" />
               <div className="absolute top-0 left-0 w-full h-1 bg-[#1D4ED8]/50 animate-scan"></div>
               <span className="absolute bottom-4 text-sm font-medium text-[#1D4ED8]">Click to simulate scan</span>
             </div>
             <p className="text-secondary text-sm text-center">
               Align the QR code within the frame to scan.
             </p>
           </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'visitor'} onClose={() => setActiveModal(null)} title="New Visitor Entry">
        {visitorStatus === 'form' && (
          <div className="animate-in fade-in">
            <div className="flex bg-page p-1 rounded-xl mb-6">
              <button 
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${visitorType === 'guest' ? 'bg-white shadow-sm text-navy' : 'text-secondary'}`}
                onClick={() => setVisitorType('guest')}
              >
                Guest / People
              </button>
              <button 
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${visitorType === 'delivery' ? 'bg-white shadow-sm text-navy' : 'text-secondary'}`}
                onClick={() => setVisitorType('delivery')}
              >
                Delivery
              </button>
            </div>
            
            <form onSubmit={handleVisitorRequest}>
              <div className="flex flex-col items-center mb-5">
                <button 
                  type="button" 
                  className="w-20 h-20 bg-page border-2 border-dashed border-border rounded-full flex flex-col items-center justify-center text-secondary hover:text-[#1D4ED8] hover:border-[#1D4ED8] hover:bg-[#1D4ED8]/5 transition-colors relative overflow-hidden"
                >
                  <Camera size={24} className="mb-1" />
                  <span className="text-[10px] font-medium">Add Photo</span>
                </button>
              </div>
              <Input label="Full Name" placeholder={visitorType === 'guest' ? "e.g. John Smith" : "e.g. Amazon Rider"} required />
              <Input label="Phone Number" placeholder="e.g. +1 234 567 8900" type="tel" required />
              
              {/* Dropdowns for Block and Apt */}
              {renderDropdowns()}

              {visitorType === 'delivery' && (
                <Input label="Company / Service" placeholder="e.g. Amazon, Swiggy, Uber" required />
              )}
              <Button type="submit" className="mt-4">Send Approval Request</Button>
            </form>
          </div>
        )}

        {visitorStatus === 'waiting' && (
          <div className="flex flex-col items-center py-10 animate-in fade-in">
            <Clock size={48} className="text-warning animate-spin mb-4" />
            <h3 className="text-lg font-bold text-navy mb-2">Waiting for Approval</h3>
            <p className="text-sm text-secondary text-center px-6">
              Request sent to resident. Please wait.
            </p>
          </div>
        )}

        {visitorStatus === 'approved' && (
          <div className="flex flex-col items-center py-10 animate-in zoom-in-50">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4 border border-success/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <ShieldCheck size={40} className="text-success" />
            </div>
            <h3 className="text-[22px] font-bold text-success mb-2">Request Approved!</h3>
          </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'vehicle'} onClose={() => setActiveModal(null)} title="Vehicle Log">
        {isSuccess ? renderSuccessState(`Vehicle successfully checked ${vehicleMode}.`) : (
          <div>
             <div className="flex bg-page p-1 rounded-xl mb-6">
              <button 
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${vehicleMode === 'in' ? 'bg-white shadow-sm text-navy' : 'text-secondary'}`}
                onClick={() => setVehicleMode('in')}
              >
                Check In
              </button>
              <button 
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${vehicleMode === 'out' ? 'bg-white shadow-sm text-navy' : 'text-secondary'}`}
                onClick={() => setVehicleMode('out')}
              >
                Check Out
              </button>
            </div>
            <form onSubmit={handleSimulateAction} className="animate-in fade-in">
              <Input label="Vehicle Number" placeholder="e.g. KA01-AB-1234" required />
              {vehicleMode === 'in' && (
                <>
                  <Input label="Driver Name" placeholder="e.g. John Doe" />
                  
                  {/* Dropdowns for Block and Apt */}
                  {renderDropdowns()}

                </>
              )}
              <Button type="submit" className="mt-4">
                {vehicleMode === 'in' ? 'Log Vehicle Check In' : 'Log Vehicle Check Out'}
              </Button>
            </form>
          </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'log'} onClose={() => setActiveModal(null)} title="Create Log Entry">
        {isSuccess ? renderSuccessState("Log entry has been saved successfully.") : (
          <form onSubmit={handleSimulateAction}>
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-navy mb-1.5">Category</label>
              <select className="w-full bg-page border border-border rounded-xl px-4 py-3 text-[14px] text-text focus:outline-none focus:border-[#1D4ED8] transition-all">
                <option>Routine Patrol</option>
                <option>Maintenance Issue</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-navy mb-1.5">Description</label>
              <textarea 
                className="w-full bg-page border border-border rounded-xl px-4 py-3 text-[14px] text-text min-h-[100px] resize-none focus:outline-none focus:border-[#1D4ED8] transition-all"
                placeholder="Enter details..." required
              />
            </div>
            <Button className="mt-2" type="submit">Submit Log</Button>
          </form>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'sos'} onClose={() => setActiveModal(null)} title="Trigger SOS Alert">
        {isSuccess ? renderSuccessState("Emergency alert broadcasted.") : (
          <div className="flex flex-col items-center py-2">
            <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mb-4">
              <AlertTriangle size={40} className="text-error animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Emergency Alert</h3>
            <p className="text-sm text-secondary text-center mb-6 px-4">
              Use only in actual emergencies.
            </p>
            <div className="w-full space-y-3">
              <button onClick={(e) => handleSimulateAction(e as any)} className="w-full py-3.5 px-6 rounded-full font-semibold bg-error text-white shadow-lg">CONFIRM SOS</button>
              <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
