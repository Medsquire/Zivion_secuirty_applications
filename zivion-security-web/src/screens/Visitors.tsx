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
  LogOut, 
  MoreVertical, 
  Camera, 
  ShieldCheck,
  User,
  Package,
  Phone,
  Home,
  ArrowRight,
  Plus
} from 'lucide-react';

const INITIAL_VISITORS = [
  { id: '1', name: 'John Smith', type: 'Guest', block: 'A', apt: '104', timeIn: '09:15 AM', timeOut: null, status: 'Inside', phone: '+1 234-567-8900', duration: null },
  { id: '2', name: 'Amazon Delivery', type: 'Delivery', block: 'B', apt: '302', timeIn: '09:45 AM', timeOut: null, status: 'Inside', phone: '+1 800-444-3322', duration: null },
  { id: '3', name: 'Sarah Connor', type: 'Guest', block: 'C', apt: '505', timeIn: '08:30 AM', timeOut: '10:45 AM', status: 'Checked Out', phone: '+1 987-654-3210', duration: '2h 15m' },
  { id: '4', name: 'Mike Ross', type: 'Guest', block: 'A', apt: '201', timeIn: '10:05 AM', timeOut: null, status: 'Pending Approval', phone: '+1 555-123-4567', duration: null },
  { id: '5', name: 'FedEx Express', type: 'Delivery', block: 'D', apt: '112', timeIn: '10:15 AM', timeOut: null, status: 'Inside', phone: '+1 800-333-2211', duration: null },
];

export const Visitors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'inside' | 'guest' | 'delivery'>('all');
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
        const mockHrs = Math.floor(Math.random() * 2);
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
    
    setTimeout(() => {
      setVisitorStatus('approved');
      
      const now = new Date();
      const timeInStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newVisitor = {
        id: Math.random().toString(),
        name: formData.name || (visitorType === 'Delivery' ? formData.company : 'Unknown'),
        type: visitorType,
        block: formData.block || 'A',
        apt: formData.apt || '101',
        timeIn: timeInStr,
        timeOut: null,
        status: 'Inside',
        phone: formData.phone || '-',
        duration: null
      };

      setVisitors(prev => [newVisitor, ...prev]);

      setTimeout(() => {
        setIsModalOpen(false);
        setTimeout(() => {
          setVisitorStatus('form');
          setFormData({ name: '', phone: '', block: '', apt: '', company: '' });
        }, 300);
      }, 1500);
    }, 2000);
  };

  const getTypeBadge = (type: string) => {
    if (type === 'Guest') {
      return (
        <span className="inline-flex items-center gap-1 bg-blue-50 text-electric px-2.5 py-1 rounded-full text-xs font-semibold border border-blue-100">
          <User size={12} /> {type}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-600 px-2.5 py-1 rounded-full text-xs font-semibold border border-purple-100">
        <Package size={12} /> {type}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Inside':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-success px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
            Inside
          </span>
        );
      case 'Checked Out':
        return (
          <span className="inline-flex items-center gap-1 bg-gray-100 text-secondary px-2.5 py-1 rounded-full text-xs font-medium border border-border">
            Checked Out
          </span>
        );
      case 'Pending Approval':
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-warning px-2.5 py-1 rounded-full text-xs font-bold border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-warning animate-ping"></span>
            Pending
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  const filteredVisitors = visitors.filter(v => {
    const matchesSearch = 
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      v.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.apt.includes(searchTerm);

    if (!matchesSearch) return false;
    if (activeFilter === 'inside') return v.status === 'Inside';
    if (activeFilter === 'guest') return v.type === 'Guest';
    if (activeFilter === 'delivery') return v.type === 'Delivery';
    return true;
  });

  const insideCount = visitors.filter(v => v.status === 'Inside').length;

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Page Header with Stats Pill */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-navy">Visitor Log</h1>
            <span className="bg-emerald-50 text-success border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {insideCount} Inside
            </span>
          </div>
          <p className="text-secondary text-xs sm:text-sm mt-0.5">Real-time gate pass management and tracking</p>
        </div>

        <Button 
          className="w-full sm:w-auto px-5 py-3 shadow-md shadow-electric/20 flex items-center justify-center gap-2" 
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} />
          <span>New Visitor Entry</span>
        </Button>
      </div>

      {/* Mobile-Friendly Search and Filter Chips */}
      <div className="space-y-3">
        <div className="relative w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
          <input 
            type="text" 
            placeholder="Search by name, flat (e.g. 104) or block..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/15 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Scrollable Filter Chips (Thumb friendly) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-navy text-white shadow-sm'
                : 'bg-white text-secondary border border-border hover:bg-gray-50'
            }`}
          >
            All Visitors ({visitors.length})
          </button>
          <button
            onClick={() => setActiveFilter('inside')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'inside'
                ? 'bg-success text-white shadow-sm'
                : 'bg-white text-secondary border border-border hover:bg-gray-50'
            }`}
          >
            Inside Now ({insideCount})
          </button>
          <button
            onClick={() => setActiveFilter('guest')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'guest'
                ? 'bg-electric text-white shadow-sm'
                : 'bg-white text-secondary border border-border hover:bg-gray-50'
            }`}
          >
            Guests Only
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
          MOBILE VIEW: TOUCH-FRIENDLY VISITOR CARDS (for 98% Mobile Users)
         ========================================================================= */}
      <div className="block md:hidden space-y-3">
        {filteredVisitors.map((visitor) => (
          <div 
            key={visitor.id} 
            className="bg-white rounded-2xl p-4 border border-border shadow-sm space-y-3 transition-all active:scale-[0.99]"
          >
            {/* Top row: Avatar + Name + Status */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                  visitor.type === 'Delivery' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-blue-100 text-electric'
                }`}>
                  {visitor.type === 'Delivery' ? <Package size={20} /> : <User size={20} />}
                </div>
                <div>
                  <h3 className="font-bold text-navy text-sm leading-tight">{visitor.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getTypeBadge(visitor.type)}
                  </div>
                </div>
              </div>

              {getStatusBadge(visitor.status)}
            </div>

            {/* Info Badges */}
            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-page text-xs">
              <div className="flex items-center gap-1.5 text-navy font-semibold">
                <Home size={14} className="text-secondary shrink-0" />
                <span>Block {visitor.block} • Apt {visitor.apt}</span>
              </div>
              <div className="flex items-center gap-1.5 text-secondary justify-end">
                <Clock size={14} className="shrink-0" />
                <span>In: {visitor.timeIn}</span>
              </div>
            </div>

            {/* Phone & Check Out Action Buttons */}
            <div className="flex items-center gap-2 pt-1 border-t border-border/60">
              {visitor.phone && visitor.phone !== '-' && (
                <a
                  href={`tel:${visitor.phone}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-border text-navy text-xs font-semibold hover:bg-page transition-colors"
                >
                  <Phone size={14} className="text-electric" />
                  <span>Call</span>
                </a>
              )}

              {visitor.status === 'Inside' ? (
                <button
                  onClick={() => handleCheckout(visitor.id)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-navy hover:bg-slate-800 text-white font-bold text-xs shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <LogOut size={14} />
                  <span>Mark Check Out</span>
                </button>
              ) : (
                <div className="flex-1 text-right text-xs text-secondary font-medium py-1">
                  {visitor.duration ? `Duration: ${visitor.duration}` : `Exited at ${visitor.timeOut}`}
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredVisitors.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center text-secondary border border-border">
            <p className="font-semibold text-navy mb-1">No visitors found</p>
            <p className="text-xs">Try clearing search filters or create a new entry</p>
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
                      {visitor.duration && <span className="text-xs font-semibold text-electric mt-1 bg-blue-50 px-2 py-0.5 rounded w-fit">{visitor.duration}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(visitor.status)}</td>
                  <td className="px-6 py-4 text-right">
                    {visitor.status === 'Inside' ? (
                      <button 
                        onClick={() => handleCheckout(visitor.id)}
                        className="px-4 py-2 bg-navy hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95"
                      >
                        Check Out
                      </button>
                    ) : (
                      <span className="text-xs text-secondary">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile-Friendly Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Visitor Entry">
        {visitorStatus === 'form' && (
          <div className="animate-in fade-in">
            <div className="flex bg-page p-1 rounded-xl mb-5">
              <button 
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${visitorType === 'Guest' ? 'bg-white shadow-sm text-navy' : 'text-secondary'}`}
                onClick={() => setVisitorType('Guest')}
              >
                Guest / Visitor
              </button>
              <button 
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${visitorType === 'Delivery' ? 'bg-white shadow-sm text-navy' : 'text-secondary'}`}
                onClick={() => setVisitorType('Delivery')}
              >
                Delivery Rider
              </button>
            </div>
            
            <form onSubmit={handleAddVisitor}>
              <div className="flex flex-col items-center mb-5">
                <button 
                  type="button" 
                  className="w-20 h-20 bg-page border-2 border-dashed border-border rounded-full flex flex-col items-center justify-center text-secondary hover:text-electric hover:border-electric transition-colors"
                >
                  <Camera size={22} className="mb-1" />
                  <span className="text-[10px] font-semibold">Take Photo</span>
                </button>
              </div>

              <Input 
                label="Full Name / Rider Name" 
                placeholder={visitorType === 'Guest' ? "e.g. John Smith" : "e.g. Amazon / Rahul"} 
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

              {visitorType === 'Delivery' && (
                <Input 
                  label="Company / Service" 
                  placeholder="e.g. Amazon, FedEx, Swiggy" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  required 
                />
              )}
              <Button type="submit" className="mt-4 w-full py-3.5 text-base shadow-lg shadow-electric/25">
                Send Gate Approval Request
              </Button>
            </form>
          </div>
        )}

        {visitorStatus === 'waiting' && (
          <div className="flex flex-col items-center py-10 animate-in fade-in">
            <Clock size={48} className="text-warning animate-spin mb-4" />
            <h3 className="text-lg font-bold text-navy mb-2">Pinging Resident...</h3>
            <p className="text-sm text-secondary text-center px-6">
              Instant notification sent to the resident app. Awaiting gate approval response.
            </p>
          </div>
        )}

        {visitorStatus === 'approved' && (
          <div className="flex flex-col items-center py-10 animate-in zoom-in-50">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4 border border-success/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <ShieldCheck size={40} className="text-success" />
            </div>
            <h3 className="text-2xl font-bold text-success mb-1">Gate Pass Approved!</h3>
            <p className="text-xs text-secondary">Gate barrier opened • Visitor logged</p>
          </div>
        )}
      </Modal>

    </div>
  );
};
