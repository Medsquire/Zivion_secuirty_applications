import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { QrCode, AlertTriangle, UserPlus, FileText, ArrowLeft, Camera, CheckCircle2, Car, Clock, ShieldCheck, KeyRound } from 'lucide-react';

export const GuardDashboard = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<'qr' | 'visitor' | 'log' | 'sos' | 'vehicle' | null>(null);
  
  // States for sub-flows
  const [isSuccess, setIsSuccess] = useState(false);
  const [qrMode, setQrMode] = useState<'scan' | 'passcode'>('scan');
  
  const [visitorStatus, setVisitorStatus] = useState<'form' | 'waiting' | 'approved'>('form');
  const [visitorType, setVisitorType] = useState<'guest' | 'delivery'>('guest');
  
  const [vehicleMode, setVehicleMode] = useState<'in' | 'out'>('in');

  // Reset states when modal changes
  useEffect(() => {
    setIsSuccess(false);
    setVisitorStatus('form');
  }, [activeModal]);

  const handleSimulateAction = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setActiveModal(null);
    }, 2000);
  };

  const handleVisitorRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitorStatus('waiting');
    
    // Simulate resident approval taking 3.5 seconds
    setTimeout(() => {
      if (activeModal === 'visitor') {
        setVisitorStatus('approved');
        setTimeout(() => setActiveModal(null), 3000);
      }
    }, 3500);
  };

  const renderSuccessState = (message: string) => (
    <div className="flex flex-col items-center py-6 animate-in fade-in zoom-in-50 duration-300">
      <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
        <CheckCircle2 size={32} className="text-success" />
      </div>
      <h3 className="text-lg font-bold text-navy mb-1">Success</h3>
      <p className="text-sm text-secondary text-center">{message}</p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-full bg-page relative">
      <div className="bg-navy pt-12 pb-6 px-6 rounded-b-[24px] text-white shadow-lg relative z-0">
        <button onClick={() => navigate('/')} className="absolute top-6 left-6 text-white/70 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[24px] font-bold mt-4">Guard Console</h1>
        <p className="text-cyan text-[14px] mt-1">Post: Main Gate • Status: Active</p>
      </div>

      <div className="p-5 flex-1 overflow-y-auto pb-8">
        <h2 className="text-[18px] font-semibold text-navy mb-3">Quick Actions</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card 
            className="flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-shadow active:scale-95"
            onClick={() => setActiveModal('qr')}
          >
            <div className="w-14 h-14 rounded-full bg-electric/10 flex items-center justify-center mb-3">
              <QrCode size={28} className="text-electric" />
            </div>
            <span className="text-[14px] font-medium text-text">Scan & Pass</span>
          </Card>
          
          <Card 
            className="flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-shadow active:scale-95"
            onClick={() => setActiveModal('visitor')}
          >
            <div className="w-14 h-14 rounded-full bg-cyan/10 flex items-center justify-center mb-3">
              <UserPlus size={28} className="text-cyan" />
            </div>
            <span className="text-[14px] font-medium text-text">New Visitor</span>
          </Card>

          <Card 
            className="flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-shadow active:scale-95"
            onClick={() => setActiveModal('vehicle')}
          >
            <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mb-3">
              <Car size={28} className="text-success" />
            </div>
            <span className="text-[14px] font-medium text-text">Vehicle Entry</span>
          </Card>

          <Card 
            className="flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-shadow active:scale-95"
            onClick={() => setActiveModal('log')}
          >
            <div className="w-14 h-14 rounded-full bg-warning/10 flex items-center justify-center mb-3">
              <FileText size={28} className="text-warning" />
            </div>
            <span className="text-[14px] font-medium text-text">Log Entry</span>
          </Card>
        </div>

        <h2 className="text-[18px] font-semibold text-navy mb-3 mt-2">Recent Activity</h2>
        <Card>
          <div className="flex items-center mb-4 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-full bg-success/20 mr-3 shrink-0"></div>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-text leading-tight">Amazon Delivery</p>
              <p className="text-[13px] text-secondary mt-0.5">Apt 402 • 10:23 AM</p>
            </div>
            <span className="text-success text-[12px] font-semibold">Cleared</span>
          </div>

          <div className="flex items-center mb-4 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-full bg-success/20 mr-3 shrink-0"></div>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-text leading-tight">Vehicle KA01-4432</p>
              <p className="text-[13px] text-secondary mt-0.5">Check In • 10:35 AM</p>
            </div>
            <span className="text-success text-[12px] font-semibold">Logged</span>
          </div>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-warning/20 mr-3 shrink-0"></div>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-text leading-tight">Guest: Sarah Connor</p>
              <p className="text-[13px] text-secondary mt-0.5">Apt 105 • 10:45 AM</p>
            </div>
            <span className="text-warning text-[12px] font-semibold">Pending</span>
          </div>
        </Card>

        <div className="mt-6 mb-4">
           <Button 
             variant="outline" 
             className="border-error/30 text-error hover:bg-error/10 w-full"
             onClick={() => setActiveModal('sos')}
           >
             <AlertTriangle size={18} className="mr-2" /> Trigger SOS Emergency
           </Button>
        </div>
      </div>

      {/* Modals */}

      {/* 1. Scan QR / Passcode Modal */}
      <Modal isOpen={activeModal === 'qr'} onClose={() => setActiveModal(null)} title="Access Verification">
        {isSuccess ? renderSuccessState("Verification successful. Access granted.") : (
          <div>
            <div className="flex bg-page p-1 rounded-xl mb-6">
              <button 
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${qrMode === 'scan' ? 'bg-white shadow-sm text-navy' : 'text-secondary'}`}
                onClick={() => setQrMode('scan')}
              >
                Scan QR
              </button>
              <button 
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${qrMode === 'passcode' ? 'bg-white shadow-sm text-navy' : 'text-secondary'}`}
                onClick={() => setQrMode('passcode')}
              >
                Passcode
              </button>
            </div>

            {qrMode === 'scan' ? (
              <div className="flex flex-col items-center animate-in fade-in">
                <div className="w-full aspect-square bg-navy/5 rounded-2xl border-2 border-dashed border-electric/50 flex flex-col items-center justify-center mb-6 relative overflow-hidden">
                  <Camera size={48} className="text-electric/50 mb-2" />
                  <p className="text-sm text-secondary">Position QR code within frame</p>
                  <div className="absolute top-0 left-0 w-full h-1 bg-electric shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                </div>
                <Button onClick={handleSimulateAction}>Simulate Successful Scan</Button>
              </div>
            ) : (
              <form onSubmit={handleSimulateAction} className="animate-in fade-in">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-electric/10 flex items-center justify-center mb-4">
                    <KeyRound size={32} className="text-electric" />
                  </div>
                  <p className="text-sm text-secondary text-center px-4">Enter the 6-digit access code provided to the visitor.</p>
                </div>
                <Input label="Access Passcode" placeholder="e.g. 123456" type="number" required maxLength={6} />
                <Button type="submit" className="mt-2">Verify Passcode</Button>
              </form>
            )}
          </div>
        )}
      </Modal>

      {/* 2. New Visitor Modal with Request Flow */}
      <Modal isOpen={activeModal === 'visitor'} onClose={() => setActiveModal(null)} title="Visitor Registration">
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
                  className="w-20 h-20 bg-page border-2 border-dashed border-border rounded-full flex flex-col items-center justify-center text-secondary hover:text-electric hover:border-electric hover:bg-electric/5 transition-colors relative overflow-hidden"
                >
                  <Camera size={24} className="mb-1" />
                  <span className="text-[10px] font-medium">Add Photo</span>
                </button>
              </div>

              <Input label="Full Name" placeholder={visitorType === 'guest' ? "e.g. John Smith" : "e.g. Amazon Rider"} required />
              <Input label="Phone Number" placeholder="e.g. +1 234 567 8900" type="tel" required />
              
              <div className="grid grid-cols-2 gap-3">
                <Input label="Block" placeholder="e.g. A" required />
                <Input label="Apartment No" placeholder="e.g. 104" required />
              </div>
              
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
              Request sent to resident. Please wait for them to approve or deny entry.
            </p>
          </div>
        )}

        {visitorStatus === 'approved' && (
          <div className="flex flex-col items-center py-10 animate-in zoom-in-50">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4 border border-success/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <ShieldCheck size={40} className="text-success" />
            </div>
            <h3 className="text-[22px] font-bold text-success mb-2">Request Approved!</h3>
            <p className="text-sm text-secondary text-center">
              Resident has approved the request. You may allow entry now.
            </p>
          </div>
        )}
      </Modal>

      {/* 3. Vehicle Entry Modal (NEW) */}
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
              <Input label="Vehicle Number (License Plate)" placeholder="e.g. KA01-AB-1234" required />
              
              {vehicleMode === 'in' && (
                <>
                  <Input label="Driver Name (Optional)" placeholder="e.g. John Doe" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Dest. Block" placeholder="e.g. A" required />
                    <Input label="Dest. Apt" placeholder="e.g. 104" required />
                  </div>
                </>
              )}
              
              <Button type="submit" className="mt-4">
                {vehicleMode === 'in' ? 'Log Vehicle Check In' : 'Log Vehicle Check Out'}
              </Button>
            </form>
          </div>
        )}
      </Modal>

      {/* 4. Log Entry Modal */}
      <Modal isOpen={activeModal === 'log'} onClose={() => setActiveModal(null)} title="Create Log Entry">
        {isSuccess ? renderSuccessState("Log entry has been saved successfully.") : (
          <form onSubmit={handleSimulateAction}>
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-navy mb-1.5">Category</label>
              <select className="w-full bg-page border border-border rounded-xl px-4 py-3 text-[14px] text-text focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all">
                <option>Routine Patrol</option>
                <option>Maintenance Issue</option>
                <option>Suspicious Activity</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-navy mb-1.5">Description</label>
              <textarea 
                className="w-full bg-page border border-border rounded-xl px-4 py-3 text-[14px] text-text focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all min-h-[100px] resize-none"
                placeholder="Enter details here..."
                required
              />
            </div>
            <Button className="mt-2" type="submit">Submit Log</Button>
          </form>
        )}
      </Modal>

      {/* 5. SOS Alert Modal */}
      <Modal isOpen={activeModal === 'sos'} onClose={() => setActiveModal(null)} title="Trigger SOS Alert">
        {isSuccess ? renderSuccessState("Emergency alert broadcasted to all supervisors.") : (
          <div className="flex flex-col items-center py-2">
            <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mb-4">
              <AlertTriangle size={40} className="text-error animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Emergency Alert</h3>
            <p className="text-sm text-secondary text-center mb-6 px-4">
              This will immediately notify all supervisors and admins. Use only in actual emergencies.
            </p>
            <div className="w-full space-y-3">
              <button 
                onClick={(e) => handleSimulateAction(e as any)}
                className="w-full py-3.5 px-6 rounded-full font-semibold text-[16px] transition-all flex items-center justify-center bg-error text-white hover:opacity-90 shadow-[0_4px_12px_rgba(239,68,68,0.3)]"
              >
                CONFIRM SOS
              </button>
              <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
