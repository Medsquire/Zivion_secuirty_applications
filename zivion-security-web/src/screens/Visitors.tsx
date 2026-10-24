import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Search, Filter, Clock, CheckCircle2, LogOut, MoreVertical, Camera, ShieldCheck } from 'lucide-react';

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
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitorType, setVisitorType] = useState<'Guest' | 'Delivery'>('Guest');
  const [visitorStatus, setVisitorStatus] = useState<'form' | 'waiting' | 'approved'>('form');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    block: '',
    apt: '',
    company: ''
  });

  const handleCheckout = (id: string) => {
    setVisitors(prev => prev.map(visitor => {
      if (visitor.id === id) {
        const now = new Date();
        const timeOutStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

  const handleAddVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitorStatus('waiting');
    
    // Simulate resident approval taking 2 seconds
    setTimeout(() => {
      setVisitorStatus('approved');
      
      // Add to table
      const now = new Date();
      const timeInStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newVisitor = {
        id: Math.random().toString(),
        name: formData.name || (visitorType === 'Delivery' ? formData.company : 'Unknown'),
        type: visitorType,
        block: formData.block,
        apt: formData.apt,
        timeIn: timeInStr,
        timeOut: null,
        status: 'Inside',
        phone: formData.phone || '-',
        duration: null
      };

      setVisitors(prev => [newVisitor, ...prev]);

      // Auto close after 1.5 seconds of approval
      setTimeout(() => {
        setIsModalOpen(false);
        setTimeout(() => {
          setVisitorStatus('form');
          setFormData({ name: '', phone: '', block: '', apt: '', company: '' }); // Reset form
        }, 300);
      }, 1500);
    }, 2000);
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
        <Button className="w-auto px-6 whitespace-nowrap" onClick={() => setIsModalOpen(true)}>
          New Visitor Entry
        </Button>
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
      </Card>

      {/* New Visitor Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Visitor Entry">
        {visitorStatus === 'form' && (
          <div className="animate-in fade-in">
            <div className="flex bg-page p-1 rounded-xl mb-6">
              <button 
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${visitorType === 'Guest' ? 'bg-white shadow-sm text-navy' : 'text-secondary'}`}
                onClick={() => setVisitorType('Guest')}
              >
                Guest / People
              </button>
              <button 
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${visitorType === 'Delivery' ? 'bg-white shadow-sm text-navy' : 'text-secondary'}`}
                onClick={() => setVisitorType('Delivery')}
              >
                Delivery
              </button>
            </div>
            
            <form onSubmit={handleAddVisitor}>
              <div className="flex flex-col items-center mb-5">
                <button 
                  type="button" 
                  className="w-20 h-20 bg-page border-2 border-dashed border-border rounded-full flex flex-col items-center justify-center text-secondary hover:text-[#1D4ED8] hover:border-[#1D4ED8] hover:bg-[#1D4ED8]/5 transition-colors relative overflow-hidden"
                >
                  <Camera size={24} className="mb-1" />
                  <span className="text-[10px] font-medium">Add Photo</span>
                </button>
              </div>
              <Input 
                label="Full Name" 
                placeholder={visitorType === 'Guest' ? "e.g. John Smith" : "e.g. Amazon Rider"} 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
              <Input 
                label="Phone Number" 
                placeholder="e.g. +1 234 567 8900" 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required={visitorType === 'Guest'} 
              />
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-[13px] font-medium text-navy mb-1.5">Block</label>
                  <select 
                    className="w-full bg-page border border-border rounded-xl px-4 py-3 text-[14px] text-text focus:outline-none focus:border-[#1D4ED8] transition-all" 
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
                    className="w-full bg-page border border-border rounded-xl px-4 py-3 text-[14px] text-text focus:outline-none focus:border-[#1D4ED8] transition-all" 
                    required 
                    value={formData.apt}
                    onChange={(e) => setFormData({...formData, apt: e.target.value})}
                  >
                    <option value="" disabled>Select Flat</option>
                    <option value="101">101</option>
                    <option value="102">102</option>
                    <option value="201">201</option>
                    <option value="202">202</option>
                    <option value="301">301</option>
                    <option value="302">302</option>
                    <option value="405">405</option>
                    <option value="505">505</option>
                  </select>
                </div>
              </div>

              {visitorType === 'Delivery' && (
                <Input 
                  label="Company / Service" 
                  placeholder="e.g. Amazon, Swiggy, Uber" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  required 
                />
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

    </div>
  );
};
