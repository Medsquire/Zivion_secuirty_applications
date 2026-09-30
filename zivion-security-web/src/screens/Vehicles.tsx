import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Search, Filter, Clock, CheckCircle2, MoreVertical, LogOut } from 'lucide-react';

const INITIAL_VEHICLES = [
  { id: '1', plate: 'KA01-AB-1234', type: 'Resident', owner: 'John Smith', block: 'A', apt: '104', timeIn: 'Resident', timeOut: null, status: 'Parked', duration: null },
  { id: '2', plate: 'MH04-CD-5678', type: 'Delivery', owner: 'Amazon', block: 'B', apt: '302', timeIn: '09:45 AM', timeOut: null, status: 'Inside', duration: null },
  { id: '3', plate: 'DL01-EF-9012', type: 'Guest', owner: 'Sarah Connor', block: 'C', apt: '505', timeIn: '08:30 AM', timeOut: '11:20 AM', status: 'Exited', duration: '2h 50m' },
  { id: '4', plate: 'TS09-GH-3456', type: 'Service', owner: 'Plumber', block: 'A', apt: '201', timeIn: '10:05 AM', timeOut: null, status: 'Inside', duration: null },
];

export const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Parked':
        return <span className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit"><CheckCircle2 size={12}/> Parked</span>;
      case 'Inside':
        return <span className="bg-warning/10 text-warning px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit"><Clock size={12}/> Inside</span>;
      case 'Exited':
        return <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit"><LogOut size={12}/> Exited</span>;
      default:
        return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold w-fit">{status}</span>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Resident':
        return <span className="bg-blue-50 text-[#1D4ED8] px-2 py-1 rounded text-xs font-medium border border-blue-100 w-fit">{type}</span>;
      case 'Delivery':
        return <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded text-xs font-medium border border-purple-100 w-fit">{type}</span>;
      case 'Guest':
        return <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-xs font-medium border border-emerald-100 w-fit">{type}</span>;
      case 'Service':
        return <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded text-xs font-medium border border-orange-100 w-fit">{type}</span>;
      default:
        return <span>{type}</span>;
    }
  };

  const filteredVehicles = vehicles.filter(v => 
    v.plate.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Vehicle Log</h1>
          <p className="text-secondary text-sm mt-1">Track all vehicles entering and exiting the premises</p>
        </div>
        <Button className="w-auto px-6 whitespace-nowrap">Log New Vehicle</Button>
      </div>

      <Card className="p-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by license plate or driver..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-[#1D4ED8] transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium text-navy hover:bg-gray-50 transition-colors">
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto scroll-smooth pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
            <thead className="bg-page text-secondary font-semibold border-b border-border">
              <tr>
                <th className="px-6 py-4">License Plate</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Owner / Driver</th>
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
                    <div className="inline-block border-2 border-gray-800 rounded bg-white px-3 py-1 font-mono font-bold text-gray-800 shadow-sm">
                      {vehicle.plate}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getTypeBadge(vehicle.type)}</td>
                  <td className="px-6 py-4 font-medium text-navy">{vehicle.owner}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-navy">Block {vehicle.block}</p>
                    <p className="text-xs text-secondary mt-0.5">Apt {vehicle.apt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-navy">In: {vehicle.timeIn}</span>
                      {vehicle.timeOut && <span className="text-xs text-secondary">Out: {vehicle.timeOut}</span>}
                      {vehicle.duration && <span className="text-xs font-semibold text-[#1D4ED8] mt-1 bg-blue-50 px-2 py-0.5 rounded w-fit">{vehicle.duration}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(vehicle.status)}</td>
                  <td className="px-6 py-4 text-right">
                    {(vehicle.status === 'Inside' || vehicle.status === 'Parked') ? (
                      <button 
                        onClick={() => handleCheckout(vehicle.id)}
                        className="px-4 py-2 bg-white border border-border text-navy hover:border-[#1D4ED8] hover:text-[#1D4ED8] text-xs font-semibold rounded-lg transition-colors shadow-sm"
                      >
                        Check Out
                      </button>
                    ) : (
                      <button className="p-2 text-secondary hover:text-navy rounded-lg hover:bg-page transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredVehicles.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-secondary">No vehicles found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-border flex justify-between items-center text-sm text-secondary bg-gray-50/50">
          <span>Showing 1 to {filteredVehicles.length} of 42 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border rounded hover:bg-gray-100 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-border rounded hover:bg-gray-100">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
};
