import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  MoreVertical, 
  LogOut, 
  ShieldCheck, 
  CarFront,
  Home,
  User,
  Plus
} from 'lucide-react';

const INITIAL_VEHICLES = [
  { id: '1', plate: 'KA01-AB-1234', type: 'Resident', owner: 'John Smith', block: 'A', apt: '104', timeIn: 'Resident Slot', timeOut: null, status: 'Parked', duration: null },
  { id: '2', plate: 'MH04-CD-5678', type: 'Delivery', owner: 'Amazon Express', block: 'B', apt: '302', timeIn: '09:45 AM', timeOut: null, status: 'Inside', duration: null },
  { id: '3', plate: 'DL01-EF-9012', type: 'Guest', owner: 'Sarah Connor', block: 'C', apt: '505', timeIn: '08:30 AM', timeOut: '11:20 AM', status: 'Exited', duration: '2h 50m' },
  { id: '4', plate: 'TS09-GH-3456', type: 'Service', owner: 'Urban Company Plumber', block: 'A', apt: '201', timeIn: '10:05 AM', timeOut: null, status: 'Inside', duration: null },
];

export const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'inside' | 'resident' | 'delivery'>('all');
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleMode, setVehicleMode] = useState<'in' | 'out'>('in');
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    plate: '',
    owner: '',
    block: '',
    apt: ''
  });

  const handleCheckout = (id: string) => {
    setVehicles(prev => prev.map(vehicle => {
      if (vehicle.id === id) {
        const now = new Date();
        const timeOutStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const mockHrs = Math.floor(Math.random() * 2);
        const mockMins = Math.floor(Math.random() * 59) + 1;
        const durationStr = mockHrs > 0 ? `${mockHrs}h ${mockMins}m` : `${mockMins}m`;

        return {
          ...vehicle,
          status: 'Exited',
          timeOut: timeOutStr,
          duration: durationStr
        };
      }
      return vehicle;
    }));
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    
    setTimeout(() => {
      if (vehicleMode === 'in') {
        const now = new Date();
        const timeInStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        let type = 'Guest';
        if (formData.owner.toLowerCase().includes('amazon') || formData.owner.toLowerCase().includes('delivery')) type = 'Delivery';
        if (formData.owner.toLowerCase().includes('plumber') || formData.owner.toLowerCase().includes('service')) type = 'Service';

        const newVehicle = {
          id: Math.random().toString(),
          plate: formData.plate.toUpperCase(),
          type: type,
          owner: formData.owner || 'Unknown',
          block: formData.block || 'A',
          apt: formData.apt || '101',
          timeIn: timeInStr,
          timeOut: null,
          status: 'Inside',
          duration: null
        };
        
        setVehicles(prev => [newVehicle, ...prev]);
      } else {
        const existingVehicle = vehicles.find(v => v.plate.toLowerCase() === formData.plate.toLowerCase() && v.status !== 'Exited');
        if (existingVehicle) {
          handleCheckout(existingVehicle.id);
        }
      }

      setIsModalOpen(false);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ plate: '', owner: '', block: '', apt: '' });
      }, 300);
    }, 1200);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Parked':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-success px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-200">
            <CheckCircle2 size={12}/> Parked
          </span>
        );
      case 'Inside':
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-warning px-2.5 py-1 rounded-full text-xs font-bold border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse"></span>
            Inside
          </span>
        );
      case 'Exited':
        return (
          <span className="inline-flex items-center gap-1 bg-gray-100 text-secondary px-2.5 py-1 rounded-full text-xs font-medium border border-border">
            <LogOut size={12}/> Exited
          </span>
        );
      default:
        return <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-semibold">{status}</span>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Resident':
        return <span className="bg-blue-50 text-electric px-2.5 py-0.5 rounded-full text-xs font-bold border border-blue-100">Resident</span>;
      case 'Delivery':
        return <span className="bg-purple-50 text-purple-600 px-2.5 py-0.5 rounded-full text-xs font-bold border border-purple-100">Delivery</span>;
      case 'Guest':
        return <span className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-100">Guest</span>;
      case 'Service':
        return <span className="bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded-full text-xs font-bold border border-orange-100">Service</span>;
      default:
        return <span>{type}</span>;
    }
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = 
      v.plate.toLowerCase().includes(searchTerm.toLowerCase()) || 
      v.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.block.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === 'inside') return v.status === 'Inside' || v.status === 'Parked';
    if (activeFilter === 'resident') return v.type === 'Resident';
    if (activeFilter === 'delivery') return v.type === 'Delivery';
    return true;
  });

  const insideCount = vehicles.filter(v => v.status === 'Inside' || v.status === 'Parked').length;

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-navy">Vehicle Log</h1>
            <span className="bg-blue-50 text-electric border border-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {insideCount} On Campus
            </span>
          </div>
          <p className="text-secondary text-xs sm:text-sm mt-0.5">Track licensed vehicle entries, exits, and resident slots</p>
        </div>

        <Button 
          className="w-full sm:w-auto px-5 py-3 shadow-md shadow-electric/20 flex items-center justify-center gap-2" 
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} />
          <span>Log Vehicle In / Out</span>
        </Button>
      </div>

      {/* Search & Filter Chips for Mobile View */}
      <div className="space-y-3">
        <div className="relative w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
          <input 
            type="text" 
            placeholder="Search by license plate (e.g. KA01), driver..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/15 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-navy text-white shadow-sm'
                : 'bg-white text-secondary border border-border hover:bg-gray-50'
            }`}
          >
            All Vehicles ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveFilter('inside')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'inside'
                ? 'bg-electric text-white shadow-sm'
                : 'bg-white text-secondary border border-border hover:bg-gray-50'
            }`}
          >
            Parked / Inside ({insideCount})
          </button>
          <button
            onClick={() => setActiveFilter('resident')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'resident'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-secondary border border-border hover:bg-gray-50'
            }`}
          >
            Residents
          </button>
          <button
            onClick={() => setActiveFilter('delivery')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'delivery'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white text-secondary border border-border hover:bg-gray-50'
            }`}
          >
            Deliveries
          </button>
        </div>
      </div>

      {/* =========================================================================
          MOBILE VIEW: TOUCH-FRIENDLY VEHICLE CARDS
         ========================================================================= */}
      <div className="block md:hidden space-y-3">
        {filteredVehicles.map((vehicle) => (
          <div 
            key={vehicle.id} 
            className="bg-white rounded-2xl p-4 border border-border shadow-sm space-y-3 transition-all active:scale-[0.99]"
          >
            {/* Top row: Number Plate Badge + Status Badge */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-navy shrink-0">
                  <CarFront size={22} className="text-electric" />
                </div>
                <div>
                  <div className="inline-block border-2 border-navy rounded-lg bg-yellow-50 px-2.5 py-0.5 font-mono font-extrabold text-xs text-navy tracking-wider shadow-xs">
                    {vehicle.plate}
                  </div>
                  <div className="mt-1">
                    {getTypeBadge(vehicle.type)}
                  </div>
                </div>
              </div>

              {getStatusBadge(vehicle.status)}
            </div>

            {/* Middle Info */}
            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-page text-xs">
              <div className="flex items-center gap-1.5 text-navy font-semibold truncate">
                <User size={13} className="text-secondary shrink-0" />
                <span className="truncate">{vehicle.owner}</span>
              </div>
              <div className="flex items-center gap-1.5 text-secondary justify-end">
                <Home size={13} className="shrink-0" />
                <span>Blk {vehicle.block} • Apt {vehicle.apt}</span>
              </div>
            </div>

            {/* Time entry & Action Button */}
            <div className="flex items-center justify-between pt-1 border-t border-border/60">
              <div className="text-xs text-secondary flex items-center gap-1">
                <Clock size={13} />
                <span>In: {vehicle.timeIn}</span>
              </div>

              {(vehicle.status === 'Inside' || vehicle.status === 'Parked') ? (
                <button
                  onClick={() => handleCheckout(vehicle.id)}
                  className="py-2 px-4 rounded-xl bg-navy hover:bg-slate-800 text-white font-bold text-xs shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <LogOut size={13} />
                  <span>Mark Exit</span>
                </button>
              ) : (
                <span className="text-xs text-secondary font-medium">Exited {vehicle.timeOut}</span>
              )}
            </div>
          </div>
        ))}

        {filteredVehicles.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center text-secondary border border-border">
            <p className="font-semibold text-navy mb-1">No vehicles found</p>
            <p className="text-xs">Try clearing search filters or log a new vehicle</p>
          </div>
        )}
      </div>

      {/* =========================================================================
          DESKTOP VIEW: CLEAN DATA TABLE
         ========================================================================= */}
      <Card className="hidden md:block p-0 overflow-hidden shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-page text-secondary font-semibold border-b border-border">
              <tr>
                <th className="px-6 py-4">License Plate</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Driver / Owner</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Time Entry</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="inline-block border-2 border-gray-800 rounded-lg bg-yellow-50 px-3 py-1 font-mono font-bold text-gray-800 shadow-sm text-xs tracking-wider">
                      {vehicle.plate}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getTypeBadge(vehicle.type)}</td>
                  <td className="px-6 py-4 font-semibold text-navy">{vehicle.owner}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-navy">Block {vehicle.block}</p>
                    <p className="text-xs text-secondary mt-0.5">Apt {vehicle.apt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-navy">In: {vehicle.timeIn}</span>
                      {vehicle.timeOut && <span className="text-xs text-secondary">Out: {vehicle.timeOut}</span>}
                      {vehicle.duration && <span className="text-xs font-semibold text-electric mt-1 bg-blue-50 px-2 py-0.5 rounded w-fit">{vehicle.duration}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(vehicle.status)}</td>
                  <td className="px-6 py-4 text-right">
                    {(vehicle.status === 'Inside' || vehicle.status === 'Parked') ? (
                      <button 
                        onClick={() => handleCheckout(vehicle.id)}
                        className="px-4 py-2 bg-navy hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95"
                      >
                        Check Out
                      </button>
                    ) : (
                      <span className="text-xs text-secondary">Exited</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile-Friendly Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Vehicle">
        {isSuccess ? (
          <div className="flex flex-col items-center py-8 animate-in zoom-in-50">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle2 size={32} className="text-success" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-1">Gate Pass Updated!</h3>
            <p className="text-xs text-secondary text-center">Vehicle successfully logged {vehicleMode === 'in' ? 'Check In' : 'Exit'}. Barrier triggered.</p>
          </div>
        ) : (
          <div>
            <div className="flex bg-page p-1 rounded-xl mb-5">
              <button 
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${vehicleMode === 'in' ? 'bg-white shadow-sm text-navy' : 'text-secondary'}`}
                onClick={() => setVehicleMode('in')}
              >
                Vehicle Entry (In)
              </button>
              <button 
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${vehicleMode === 'out' ? 'bg-white shadow-sm text-navy' : 'text-secondary'}`}
                onClick={() => setVehicleMode('out')}
              >
                Vehicle Exit (Out)
              </button>
            </div>
            <form onSubmit={handleAddVehicle} className="animate-in fade-in">
              <Input 
                label="License Plate Number" 
                placeholder="e.g. KA01-AB-1234" 
                value={formData.plate}
                onChange={(e) => setFormData({...formData, plate: e.target.value.toUpperCase()})}
                required 
              />
              {vehicleMode === 'in' && (
                <>
                  <Input 
                    label="Driver Name / Company" 
                    placeholder="e.g. John Doe, Amazon, Uber" 
                    value={formData.owner}
                    onChange={(e) => setFormData({...formData, owner: e.target.value})}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-[13px] font-medium text-navy mb-1.5">Block</label>
                      <select 
                        className="w-full bg-page border border-border rounded-xl px-4 py-3 text-[14px] text-text focus:outline-none focus:border-electric transition-all" 
                        required 
                        value={formData.block}
                        onChange={(e) => setFormData({...formData, block: e.target.value})}
                      >
                        <option value="" disabled>Select Block</option>
                        <option value="A">Block A</option>
                        <option value="B">Block B</option>
                        <option value="C">Block C</option>
                        <option value="D">Block D</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-navy mb-1.5">Apartment</label>
                      <select 
                        className="w-full bg-page border border-border rounded-xl px-4 py-3 text-[14px] text-text focus:outline-none focus:border-electric transition-all" 
                        required 
                        value={formData.apt}
                        onChange={(e) => setFormData({...formData, apt: e.target.value})}
                      >
                        <option value="" disabled>Select Flat</option>
                        <option value="101">101</option>
                        <option value="104">104</option>
                        <option value="201">201</option>
                        <option value="202">202</option>
                        <option value="301">301</option>
                        <option value="302">302</option>
                        <option value="405">405</option>
                        <option value="505">505</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              <Button type="submit" className="mt-4 w-full py-3.5 text-base shadow-lg shadow-electric/25">
                {vehicleMode === 'in' ? 'Log Vehicle Check In' : 'Confirm Vehicle Exit'}
              </Button>
            </form>
          </div>
        )}
      </Modal>

    </div>
  );
};
