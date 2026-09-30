import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Search, Filter, Clock, CheckCircle2, LogOut, MoreVertical } from 'lucide-react';

const INITIAL_VISITORS = [
  { id: '1', name: 'John Smith', type: 'Guest', block: 'A', apt: '104', timeIn: '09:15 AM', timeOut: null, status: 'Inside', phone: '+1 234-567-8900', duration: null },
  { id: '2', name: 'Amazon Delivery', type: 'Delivery', block: 'B', apt: '302', timeIn: '09:45 AM', timeOut: null, status: 'Inside', phone: '-', duration: null },
  { id: '3', name: 'Sarah Connor', type: 'Guest', block: 'C', apt: '505', timeIn: '08:30 AM', timeOut: '10:45 AM', status: 'Checked Out', phone: '+1 987-654-3210', duration: '2h 15m' },
  { id: '4', name: 'Mike Ross', type: 'Guest', block: 'A', apt: '201', timeIn: '10:05 AM', timeOut: null, status: 'Pending Approval', phone: '+1 555-123-4567', duration: null },
  { id: '5', name: 'FedEx', type: 'Delivery', block: 'D', apt: '112', timeIn: '10:15 AM', timeOut: null, status: 'Inside', phone: '-', duration: null },
];

export const Visitors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visitors, setVisitors] = useState(INITIAL_VISITORS);

  const handleCheckout = (id: string) => {
    setVisitors(prev => prev.map(visitor => {
      if (visitor.id === id) {
        const now = new Date();
        const timeOutStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // Generate a random mock duration between 15m and 3h
        const mockHrs = Math.floor(Math.random() * 3);
        const mockMins = Math.floor(Math.random() * 45) + 15;
        const durationStr = mockHrs > 0 ? `${mockHrs}h ${mockMins}m` : `${mockMins}m`;

        return {
          ...visitor,
          status: 'Checked Out',
          timeOut: timeOutStr,
          duration: durationStr
        };
      }
      return visitor;
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Inside':
        return <span className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit"><CheckCircle2 size={12}/> Inside</span>;
      case 'Checked Out':
        return <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit"><LogOut size={12}/> Checked Out</span>;
      case 'Pending Approval':
        return <span className="bg-warning/10 text-warning px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit"><Clock size={12}/> Pending</span>;
      default:
        return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold w-fit">{status}</span>;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === 'Guest' 
      ? <span className="bg-blue-50 text-[#1D4ED8] px-2 py-1 rounded text-xs font-medium border border-blue-100 w-fit">{type}</span>
      : <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded text-xs font-medium border border-purple-100 w-fit">{type}</span>;
  };

  const filteredVisitors = visitors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.block.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Visitor Log</h1>
          <p className="text-secondary text-sm mt-1">Manage and track all guests and deliveries</p>
        </div>
        <Button className="w-auto px-6 whitespace-nowrap">New Visitor Entry</Button>
      </div>

      <Card className="p-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by name or block..." 
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
                <th className="px-6 py-4">Visitor Info</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Time Entry</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-navy">{visitor.name}</p>
                    <p className="text-xs text-secondary mt-0.5">{visitor.phone}</p>
                  </td>
                  <td className="px-6 py-4">{getTypeBadge(visitor.type)}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-navy">Block {visitor.block}</p>
                    <p className="text-xs text-secondary mt-0.5">Apt {visitor.apt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-navy">In: {visitor.timeIn}</span>
                      {visitor.timeOut && <span className="text-xs text-secondary">Out: {visitor.timeOut}</span>}
                      {visitor.duration && <span className="text-xs font-semibold text-[#1D4ED8] mt-1 bg-blue-50 px-2 py-0.5 rounded w-fit">{visitor.duration}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(visitor.status)}</td>
                  <td className="px-6 py-4 text-right">
                    {visitor.status === 'Inside' ? (
                      <button 
                        onClick={() => handleCheckout(visitor.id)}
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
              {filteredVisitors.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-secondary">No visitors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-border flex justify-between items-center text-sm text-secondary bg-gray-50/50">
          <span>Showing 1 to {filteredVisitors.length} of 24 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border rounded hover:bg-gray-100 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-border rounded hover:bg-gray-100">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
};
