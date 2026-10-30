import React, { useState } from 'react';
import { 
  KeyRound, 
  QrCode, 
  UserPlus, 
  CarFront, 
  Package, 
  Building2, 
  Layers, 
  Home, 
  Camera, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  Phone, 
  Search, 
  AlertTriangle, 
  Check, 
  X, 
  ChevronRight, 
  Sparkles, 
  RotateCcw,
  Bike,
  Shield,
  Send,
  User,
  SlidersHorizontal,
  Compass,
  Users,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

type MainAction = 'otp' | 'visitor' | 'vehicle';
type QueueFilter = 'pending' | 'in' | 'out';
type EntryType = 'visitor' | 'delivery';

interface VisitorEntry {
  id: string;
  name: string;
  phone?: string;
  type: EntryType;
  company?: string;
  apartmentName: string;
  block: string;
  floor: string;
  flat: string;
  residentName: string;
  vehicleNo?: string;
  photoUrl?: string;
  status: 'pending' | 'in' | 'out';
  requestedAt: string;
  entryTime?: string;
  exitTime?: string;
  residentApproved: boolean;
}

const APARTMENT_NAME = 'Bee Property';
const BLOCKS = ['Block A', 'Block B', 'Block C', 'Block D'];
const FLOORS = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor'];

const FLATS_MAP: Record<string, { resident: string; phone: string }> = {
  '101': { resident: 'Dr. Rajesh Sharma', phone: '+91 98765 00101' },
  '102': { resident: 'Priya Narang', phone: '+91 98765 00102' },
  '103': { resident: 'Amitabh Sengupta', phone: '+91 98765 00103' },
  '104': { resident: 'Kavita Sundaram', phone: '+91 98765 00104' },
  '201': { resident: 'Suresh Menon', phone: '+91 98765 00201' },
  '202': { resident: 'Neha & Rohit Kapoor', phone: '+91 98765 00202' },
  '203': { resident: 'Harish Bansal', phone: '+91 98765 00203' },
  '204': { resident: 'Farhan Zaidi', phone: '+91 98765 00204' },
  '301': { resident: 'Vikram & Pooja Mehta', phone: '+91 98765 00301' },
  '302': { resident: 'Ananya Roy', phone: '+91 98765 00302' },
  '303': { resident: 'Gurpreet Singh', phone: '+91 98765 00303' },
  '304': { resident: 'Sunil Rao', phone: '+91 98765 00304' },
  '401': { resident: 'Manish Chawla', phone: '+91 98765 00401' },
  '402': { resident: 'Deepika Kulkarni', phone: '+91 98765 00402' },
  '403': { resident: 'Tarun Varma', phone: '+91 98765 00403' },
  '404': { resident: 'Naveen Jindal', phone: '+91 98765 00404' },
  '501': { resident: 'Col. Sanjeev Bakshi', phone: '+91 98765 00501' },
  '502': { resident: 'Meera Deshmukh', phone: '+91 98765 00502' },
};

const DELIVERY_COMPANIES = [
  { name: 'Swiggy', color: '#FC8019', badgeBg: 'bg-orange-50 text-orange-700 border-orange-200' },
  { name: 'Zomato', color: '#CB202D', badgeBg: 'bg-red-50 text-red-700 border-red-200' },
  { name: 'Amazon', color: '#FF9900', badgeBg: 'bg-amber-50 text-amber-800 border-amber-200' },
  { name: 'Flipkart', color: '#2874F0', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Blinkit', color: '#F8CB46', badgeBg: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
  { name: 'Zepto', color: '#8B5CF6', badgeBg: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'Uber Eats', color: '#06C167', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Blue Dart', color: '#1E3A8A', badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { name: 'Other', color: '#64748B', badgeBg: 'bg-slate-50 text-slate-700 border-slate-200' },
];

let globalId = 7000;
const nextId = () => {
  globalId += 1;
  return `req_${globalId}`;
};

const INITIAL_RECORDS: VisitorEntry[] = [
  {
    id: '1',
    name: 'Suresh Kumar',
    phone: '+91 98765 43210',
    type: 'delivery',
    company: 'Swiggy',
    apartmentName: APARTMENT_NAME,
    block: 'Block A',
    floor: '1st Floor',
    flat: '104',
    residentName: 'Kavita Sundaram',
    vehicleNo: 'MH 02 CK 4567',
    status: 'pending',
    requestedAt: '11:42 AM',
    residentApproved: true, // Approved by Residence App!
  },
  {
    id: '2',
    name: 'Amazon Prime Logistics',
    phone: '+91 80000 11223',
    type: 'delivery',
    company: 'Amazon',
    apartmentName: APARTMENT_NAME,
    block: 'Block B',
    floor: '2nd Floor',
    flat: '202',
    residentName: 'Neha & Rohit Kapoor',
    vehicleNo: 'DL 01 TR 9812',
    status: 'pending',
    requestedAt: '11:48 AM',
    residentApproved: false, // Still waiting for resident approval
  },
  {
    id: '3',
    name: 'Anand Verma',
    phone: '+91 99887 66554',
    type: 'visitor',
    apartmentName: APARTMENT_NAME,
    block: 'Block C',
    floor: '3rd Floor',
    flat: '301',
    residentName: 'Vikram & Pooja Mehta',
    vehicleNo: 'DL 03 XY 1200',
    status: 'in',
    requestedAt: '11:15 AM',
    entryTime: '11:18 AM',
    residentApproved: true,
  },
  {
    id: '4',
    name: 'Flipkart Delivery Partner',
    phone: '+91 97711 22334',
    type: 'delivery',
    company: 'Flipkart',
    apartmentName: APARTMENT_NAME,
    block: 'Block A',
    floor: '1st Floor',
    flat: '101',
    residentName: 'Dr. Rajesh Sharma',
    status: 'in',
    requestedAt: '10:55 AM',
    entryTime: '10:58 AM',
    residentApproved: true,
  },
  {
    id: '5',
    name: 'Ramesh Taxi (Uber)',
    phone: '+91 91234 56789',
    type: 'visitor',
    company: 'Uber',
    apartmentName: APARTMENT_NAME,
    block: 'Block D',
    floor: '4th Floor',
    flat: '402',
    residentName: 'Deepika Kulkarni',
    vehicleNo: 'HR 26 DQ 7711',
    status: 'out',
    requestedAt: '09:30 AM',
    entryTime: '09:32 AM',
    exitTime: '10:45 AM',
    residentApproved: true,
  },
];

export const GuardDashboard = () => {
  const [currentScreen, setCurrentScreen] = useState<'otp' | 'visitors'>('otp');
  const [entries, setEntries] = useState<VisitorEntry[]>(INITIAL_RECORDS);
  const [activeQueue, setActiveQueue] = useState<QueueFilter>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals for the 3 Guard Actions
  const [visitorModalOpen, setVisitorModalOpen] = useState(false);
  const [entryKind, setEntryKind] = useState<EntryType>('visitor'); // 'visitor' or 'delivery'
  const [selectedCompany, setSelectedCompany] = useState('Swiggy');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('Block A');
  const [selectedFloor, setSelectedFloor] = useState('1st Floor');
  const [selectedFlat, setSelectedFlat] = useState('104');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  // OTP / Scanner Modal
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpValidatedEntry, setOtpValidatedEntry] = useState<{ code: string; flat: string; resident: string; guest: string } | null>(null);

  // Vehicle Log Modal
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [vehPlate, setVehPlate] = useState('');
  const [vehType, setVehType] = useState<'Resident' | 'Guest' | 'Cab' | 'Service'>('Guest');
  const [vehBlock, setVehBlock] = useState('Block A');
  const [vehFlat, setVehFlat] = useState('104');

  // Supervisor Shift Drawer
  const [supervisorDrawerOpen, setSupervisorDrawerOpen] = useState(false);

  // Open New Visitor Modal
  const openVisitorModal = (kind: EntryType) => {
    setEntryKind(kind);
    setVisitorName(kind === 'delivery' ? 'Swiggy Executive' : '');
    setVisitorPhone('');
    setVehicleNumber('');
    setCapturedPhoto(null);
    setVisitorModalOpen(true);
  };

  // Mock Photo Capture
  const handleSnapPhoto = () => {
    const sampleAvatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60',
    ];
    setCapturedPhoto(sampleAvatars[Math.floor(Math.random() * sampleAvatars.length)]);
  };

  // Submit Request -> Send to Residence App
  const handleSendRequestToResident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) return;

    const mapped = FLATS_MAP[selectedFlat] || { resident: 'Resident', phone: '' };
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newReq: VisitorEntry = {
      id: nextId(),
      name: entryKind === 'delivery' ? `${selectedCompany} Partner` : visitorName,
      phone: visitorPhone || undefined,
      type: entryKind,
      company: entryKind === 'delivery' ? selectedCompany : undefined,
      apartmentName: APARTMENT_NAME,
      block: selectedBlock,
      floor: selectedFloor,
      flat: selectedFlat,
      residentName: mapped.resident,
      vehicleNo: vehicleNumber.trim() ? vehicleNumber.toUpperCase() : undefined,
      photoUrl: capturedPhoto || undefined,
      status: 'pending',
      requestedAt: timeStr,
      residentApproved: false, // Simulates pending state on Residence App
    };

    setEntries(prev => [newReq, ...prev]);
    setVisitorModalOpen(false);
    setActiveQueue('pending');

    // Simulate resident positive approval arriving from Residence App in 3 seconds!
    setTimeout(() => {
      setEntries(prev => prev.map(item => item.id === newReq.id ? { ...item, residentApproved: true } : item));
    }, 3000);
  };

  // Guard Actions in Queues
  const handleAllowIn = (id: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setEntries(prev => prev.map(item => item.id === id ? { ...item, status: 'in', entryTime: timeStr, residentApproved: true } : item));
    setActiveQueue('in');
  };

  const handleMarkOut = (id: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setEntries(prev => prev.map(item => item.id === id ? { ...item, status: 'out', exitTime: timeStr } : item));
  };

  // OTP Keypad Handlers
  const handleOtpInput = (char: string) => {
    if (otpCode.length < 6) {
      const next = otpCode + char;
      setOtpCode(next);
      if (next.length === 6) {
        setTimeout(() => {
          setOtpValidatedEntry({
            code: next,
            flat: 'Block A • Floor 1 • Flat 104',
            resident: 'Dr. Rajesh Sharma',
            guest: 'Pre-Approved Guest Invite (Residence App Pass)'
          });
          setOtpCode('');
        }, 150);
      }
    }
  };

  const handleAllowOtpEntry = () => {
    if (!otpValidatedEntry) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newEntry: VisitorEntry = {
      id: nextId(),
      name: 'Pre-Approved Guest',
      type: 'visitor',
      apartmentName: APARTMENT_NAME,
      block: 'Block A',
      floor: '1st Floor',
      flat: '104',
      residentName: otpValidatedEntry.resident,
      status: 'in',
      requestedAt: timeStr,
      entryTime: timeStr,
      residentApproved: true,
    };

    setEntries(prev => [newEntry, ...prev]);
    setOtpValidatedEntry(null);
    setOtpModalOpen(false);
    setActiveQueue('in');
  };

  // Add Vehicle Entry
  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehPlate.trim()) return;

    const mapped = FLATS_MAP[vehFlat] || { resident: 'Resident', phone: '' };
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newVehicleEntry: VisitorEntry = {
      id: nextId(),
      name: `${vehType} Vehicle (${vehPlate.toUpperCase()})`,
      type: 'visitor',
      apartmentName: APARTMENT_NAME,
      block: vehBlock,
      floor: '1st Floor',
      flat: vehFlat,
      residentName: mapped.resident,
      vehicleNo: vehPlate.toUpperCase(),
      status: 'in',
      requestedAt: timeStr,
      entryTime: timeStr,
      residentApproved: true,
    };

    setEntries(prev => [newVehicleEntry, ...prev]);
    setVehicleModalOpen(false);
    setVehPlate('');
    setActiveQueue('in');
  };

  const pendingCount = entries.filter(e => e.status === 'pending').length;
  const inCount = entries.filter(e => e.status === 'in').length;
  const outCount = entries.filter(e => e.status === 'out').length;

  const currentResidentPreview = FLATS_MAP[selectedFlat]?.resident || 'Resident';

  // Filtered entries
  const filteredList = entries.filter(item => {
    if (item.status !== activeQueue) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.flat.toLowerCase().includes(q) ||
      item.block.toLowerCase().includes(q) ||
      (item.vehicleNo && item.vehicleNo.toLowerCase().includes(q)) ||
      (item.company && item.company.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 font-sans text-navy max-w-6xl mx-auto pb-16">
      
      {/* 2-Page Navigation Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentScreen('otp')}
            className={`flex items-center gap-2 py-2.5 px-5 rounded-xl text-xs font-black transition-all ${
              currentScreen === 'otp'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-secondary hover:text-navy hover:bg-slate-50'
            }`}
          >
            <KeyRound size={16} className="stroke-[1.75]" />
            <span>1. OTP / Scan</span>
          </button>

          <button
            onClick={() => setCurrentScreen('visitors')}
            className={`flex items-center gap-2 py-2.5 px-5 rounded-xl text-xs font-black transition-all ${
              currentScreen === 'visitors'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-secondary hover:text-navy hover:bg-slate-50'
            }`}
          >
            <Users size={16} className="stroke-[1.75]" />
            <span>2. Visitors & Vehicles</span>
          </button>
        </div>

        <button
          onClick={() => setSupervisorDrawerOpen(true)}
          className="flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-navy px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors self-end sm:self-auto"
        >
          <SlidersHorizontal size={14} className="stroke-[1.5]" />
          <span>Supervisor Log</span>
        </button>
      </div>

      {/* =========================================================================
          FIRST SCREEN: NO OVERVIEW • DIRECT OTP & SMALL SCAN & SUBMIT
         ========================================================================= */}
      {currentScreen === 'otp' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm max-w-lg mx-auto text-center space-y-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shadow-xs">
            <KeyRound size={26} className="stroke-[1.75]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-navy tracking-tight">Enter 6-Digit OTP</h2>
            <p className="text-xs text-secondary mt-1">Resident invite pass from Bee Property app</p>
          </div>

          {/* 6 Digit Display Boxes */}
          <div className="flex justify-center gap-2.5">
            {[0, 1, 2, 3, 4, 5].map(idx => (
              <div 
                key={idx}
                className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                  otpCode.length === idx 
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-2 ring-blue-600/20' 
                    : otpCode.length > idx 
                      ? 'border-blue-700 bg-white text-navy' 
                      : 'border-slate-200 bg-slate-50 text-secondary'
                }`}
              >
                {otpCode[idx] || ''}
              </div>
            ))}
          </div>

          {/* Small Scan Button & Submit Button Row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setOtpCode('849210');
                setOtpValidatedEntry({
                  code: '849210',
                  flat: 'Block A • 1st Floor • Flat 104',
                  resident: 'Dr. Rajesh Sharma',
                  guest: 'Pre-Approved Guest Invite (Bee Property Pass)'
                });
              }}
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 transition-colors shrink-0"
              title="Scan QR Code"
            >
              <QrCode size={16} className="stroke-[1.75]" />
              <span>Scan</span>
            </button>

            <button
              onClick={() => {
                if (!otpCode) {
                  alert('Please enter 6-digit OTP');
                  return;
                }
                setOtpValidatedEntry({
                  code: otpCode,
                  flat: 'Block A • 1st Floor • Flat 104',
                  resident: 'Dr. Rajesh Sharma',
                  guest: 'Pre-Approved Guest Invite (Bee Property Pass)'
                });
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-600/20 transition-all active:scale-[0.99]"
            >
              <Check size={18} className="stroke-[2.5]" />
              <span>Submit</span>
            </button>
          </div>

          {/* Validated Pass Card */}
          {otpValidatedEntry && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-xs">
                <CheckCircle2 size={18} className="stroke-[2.5]" />
                <span>PRE-APPROVED PASS VERIFIED</span>
              </div>
              <div>
                <p className="text-sm font-black text-navy">{otpValidatedEntry.flat}</p>
                <p className="text-xs text-secondary mt-0.5">Resident: {otpValidatedEntry.resident}</p>
              </div>
              <button
                onClick={handleAllowOtpEntry}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors"
              >
                <Check size={16} className="stroke-[2.5]" />
                <span>ALLOW ENTRY NOW</span>
              </button>
            </div>
          )}

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto pt-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
              <button
                key={num}
                onClick={() => handleOtpInput(num)}
                className="h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy font-bold text-lg active:scale-95 transition-all"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => {
                setOtpCode('849210');
                setOtpValidatedEntry({
                  code: '849210',
                  flat: 'Block A • 1st Floor • Flat 104',
                  resident: 'Dr. Rajesh Sharma',
                  guest: 'Pre-Approved Guest Invite (Bee Property Pass)'
                });
              }}
              className="h-12 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100"
            >
              Demo
            </button>
            <button
              onClick={() => handleOtpInput('0')}
              className="h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy font-bold text-lg active:scale-95 transition-all"
            >
              0
            </button>
            <button
              onClick={() => setOtpCode(prev => prev.slice(0, -1))}
              className="h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-rose-600 font-black text-lg active:scale-95 transition-all"
            >
              ⌫
            </button>
          </div>

          {/* Next Page Transition Button */}
          <button
            onClick={() => setCurrentScreen('visitors')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-navy transition-all"
          >
            <div className="flex items-center gap-3 text-left">
              <Users size={18} className="text-blue-600 stroke-[1.75]" />
              <div>
                <p className="text-xs font-black">Next: Visitors & Vehicles</p>
                <p className="text-[11px] text-secondary">Log guest, delivery rider or vehicle</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-blue-600" />
          </button>
        </div>
      )}

      {/* =========================================================================
          NEXT PAGE: VISITORS & VEHICLES (VERY SIMPLE UI)
         ========================================================================= */}
      {currentScreen === 'visitors' && (
        <div className="space-y-6">
          {/* Top 2 Simple Primary Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              onClick={() => openVisitorModal('visitor')}
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:brightness-105 active:scale-[0.99] transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <UserPlus size={24} className="text-white stroke-[1.75]" />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-black tracking-wide block leading-tight">+ Add Visitor / Delivery</span>
                <span className="text-[11px] text-white/80 font-medium">Guest, Swiggy, Zomato, Amazon...</span>
              </div>
            </button>

            <button
              onClick={() => setVehicleModalOpen(true)}
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-left transition-all active:scale-[0.99] shadow-xs group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs shrink-0 border border-emerald-100 group-hover:scale-105 transition-transform">
                <CarFront size={24} className="stroke-[1.75]" />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-black text-navy group-hover:text-emerald-700 transition-colors block leading-tight">+ Log Vehicle</span>
                <span className="text-[11px] text-secondary font-medium">Plate number & destination flat</span>
              </div>
            </button>
          </div>

          {/* SECTION 2: 3 CLEAR STATUS QUEUES (PENDING | IN | OUT) */}
          <div className="space-y-4">
        
        {/* Classified Queue Switcher & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* The 3 Status Tabs: PENDING | IN | OUT */}
          <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
            
            {/* 1. PENDING */}
            <button
              onClick={() => setActiveQueue('pending')}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                activeQueue === 'pending'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-secondary hover:text-navy hover:bg-slate-50'
              }`}
            >
              <Clock size={15} className="stroke-[1.75]" />
              <span>PENDING ({pendingCount})</span>
            </button>

            {/* 2. IN */}
            <button
              onClick={() => setActiveQueue('in')}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                activeQueue === 'in'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-secondary hover:text-navy hover:bg-slate-50'
              }`}
            >
              <CheckCircle2 size={15} className="stroke-[1.75]" />
              <span>INSIDE ({inCount})</span>
            </button>

            {/* 3. OUT */}
            <button
              onClick={() => setActiveQueue('out')}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                activeQueue === 'out'
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-secondary hover:text-navy hover:bg-slate-50'
              }`}
            >
              <LogOut size={15} className="stroke-[1.75]" />
              <span>OUT / EXITED ({outCount})</span>
            </button>

          </div>

          {/* Quick Search Field */}
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-3 text-secondary stroke-[1.75]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flat, name, plate..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-navy placeholder:text-secondary/60 focus:outline-none focus:border-electric transition-colors"
            />
          </div>

        </div>

        {/* FEED OF ENTRIES (Clean, Classified, No Clutter) */}
        <div className="space-y-3">
          {filteredList.map((entry) => {
            const isDelivery = entry.type === 'delivery';
            return (
              <div
                key={entry.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Avatar / Photo + Details */}
                <div className="flex items-center gap-3.5 min-w-0">
                  
                  {/* Photo or Initials */}
                  {entry.photoUrl ? (
                    <img 
                      src={entry.photoUrl} 
                      alt={entry.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 shadow-xs" 
                    />
                  ) : (
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                      isDelivery ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-electric border-blue-200'
                    }`}>
                      {isDelivery ? <Package size={20} className="stroke-[1.75]" /> : <User size={20} className="stroke-[1.75]" />}
                    </div>
                  )}

                  {/* Info Column */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-black text-navy leading-tight truncate">{entry.name}</h4>
                      
                      {/* Delivery Company Tag or Visitor Pill */}
                      {entry.company && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black border bg-slate-100 text-slate-800 border-slate-200">
                          {entry.company}
                        </span>
                      )}

                      {/* Apartment Destination Hierarchy Pill */}
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                        <Home size={11} className="stroke-[1.75]" />
                        <span>{entry.block} • Flat {entry.flat}</span>
                      </span>
                    </div>

                    {/* Resident Name & Vehicle Info */}
                    <div className="flex items-center gap-2 text-xs text-secondary mt-1 flex-wrap font-medium">
                      <span>Resident: <strong className="text-navy">{entry.residentName}</strong></span>
                      {entry.vehicleNo && (
                        <>
                          <span>•</span>
                          <span className="font-mono font-bold text-slate-700 bg-yellow-50 px-1.5 py-0.2 rounded border border-yellow-200 text-[11px]">
                            {entry.vehicleNo}
                          </span>
                        </>
                      )}
                      <span>•</span>
                      <span className="text-[11px] flex items-center gap-1 text-slate-500">
                        <Clock size={11} className="stroke-[1.5]" />
                        <span>Req at {entry.requestedAt}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Status Pill & Action Buttons */}
                <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  
                  {/* PENDING QUEUE */}
                  {entry.status === 'pending' && (
                    <>
                      {/* Resident Approval State */}
                      {entry.residentApproved ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black">
                          <CheckCircle2 size={14} className="text-emerald-600 stroke-[2]" />
                          <span>APPROVED BY RESIDENT</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black">
                          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                          <span>WAITING FOR RESIDENT...</span>
                        </div>
                      )}

                      {/* ALLOW IN BUTTON */}
                      <button
                        onClick={() => handleAllowIn(entry.id)}
                        className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-xs active:scale-95 transition-all"
                      >
                        <Check size={14} className="stroke-[2.5]" />
                        <span>ALLOW IN</span>
                      </button>
                    </>
                  )}

                  {/* INSIDE QUEUE */}
                  {entry.status === 'in' && (
                    <>
                      <div className="text-xs text-secondary font-medium">
                        Entry: <span className="text-navy font-bold">{entry.entryTime}</span>
                      </div>

                      {/* MARK OUT BUTTON */}
                      <button
                        onClick={() => handleMarkOut(entry.id)}
                        className="flex items-center gap-1.5 bg-navy hover:bg-slate-800 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-xs active:scale-95 transition-all"
                      >
                        <LogOut size={13} className="stroke-[2]" />
                        <span>MARK OUT</span>
                      </button>
                    </>
                  )}

                  {/* OUT QUEUE */}
                  {entry.status === 'out' && (
                    <div className="text-xs text-secondary font-medium">
                      Exited at <span className="text-navy font-bold">{entry.exitTime}</span>
                    </div>
                  )}

                </div>
              </div>
            );
          })}

          {filteredList.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center text-secondary border border-slate-200/80">
              <CheckCircle2 size={40} className="mx-auto text-electric/40 mb-2 stroke-[1.5]" />
              <p className="text-sm font-bold text-navy">
                {activeQueue === 'pending' ? 'No pending requests' : activeQueue === 'in' ? 'No visitors currently inside' : 'No checkout history today'}
              </p>
              <p className="text-xs text-secondary mt-1">Use "+ Add Visitor" or "+ Delivery" above to log a new entry</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )}

      {/* =========================================================================
          MODAL 1: ADD VISITOR / DELIVERY (With Apartment -> Block -> Floor -> Flat Hierarchy)
         ========================================================================= */}
      {visitorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${entryKind === 'delivery' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                  {entryKind === 'delivery' ? <Package size={18} className="stroke-[1.75]" /> : <UserPlus size={18} className="stroke-[1.75]" />}
                </div>
                <div>
                  <h3 className="text-base font-black text-navy uppercase tracking-tight">
                    {entryKind === 'delivery' ? 'New Delivery Entry' : 'New Visitor Gate Pass'}
                  </h3>
                  <p className="text-xs text-secondary font-medium">Request sent directly to Residence App</p>
                </div>
              </div>
              <button 
                onClick={() => setVisitorModalOpen(false)} 
                className="p-1.5 text-secondary hover:text-navy rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSendRequestToResident} className="space-y-4">
              
              {/* IF DELIVERY: SELECT DELIVERY COMPANY */}
              {entryKind === 'delivery' && (
                <div>
                  <label className="block text-xs font-black text-navy uppercase mb-2">
                    Select Delivery Partner
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {DELIVERY_COMPANIES.map(comp => (
                      <button
                        key={comp.name}
                        type="button"
                        onClick={() => {
                          setSelectedCompany(comp.name);
                          setVisitorName(`${comp.name} Partner`);
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                          selectedCompany === comp.name
                            ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                            : 'bg-slate-50 text-navy border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Bike size={14} className="stroke-[1.75]" />
                        <span>{comp.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PERSON NAME & PHONE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-navy uppercase mb-1">
                    {entryKind === 'delivery' ? 'Rider / Partner Name' : 'Visitor Name'}
                  </label>
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-navy focus:outline-none focus:border-electric"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-navy uppercase mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-navy focus:outline-none focus:border-electric"
                  />
                </div>
              </div>

              {/* PHOTO CAPTURE & VEHICLE PLATE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Photo Capture Box */}
                <div>
                  <label className="block text-xs font-black text-navy uppercase mb-1">
                    Visitor Photo (Audit Trail)
                  </label>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                    {capturedPhoto ? (
                      <img src={capturedPhoto} alt="Captured" className="w-10 h-10 rounded-lg object-cover border border-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-slate-200 text-secondary flex items-center justify-center shrink-0">
                        <Camera size={18} className="stroke-[1.5]" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={handleSnapPhoto}
                      className="flex-1 py-1.5 px-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-navy transition-colors flex items-center justify-center gap-1"
                    >
                      <Camera size={13} className="text-electric stroke-[1.75]" />
                      <span>{capturedPhoto ? 'Retake Photo' : 'Snap Photo'}</span>
                    </button>
                  </div>
                </div>

                {/* Vehicle Plate */}
                <div>
                  <label className="block text-xs font-black text-navy uppercase mb-1">
                    Vehicle Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. DL 01 AB 1234"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-navy focus:outline-none focus:border-electric"
                  />
                </div>

              </div>

              {/* =========================================================================
                  APARTMENT DESTINATION HIERARCHY: Apartment -> Block -> Floor -> Flat
                 ========================================================================= */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-navy uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 size={14} className="text-electric stroke-[1.75]" />
                    <span>Destination Hierarchy</span>
                  </span>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {APARTMENT_NAME}
                  </span>
                </div>

                {/* 1. SELECT BLOCK */}
                <div>
                  <span className="block text-[11px] font-bold text-secondary mb-1">1. Select Block</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {BLOCKS.map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBlock(b)}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-all border ${
                          selectedBlock === b 
                            ? 'bg-navy text-white border-navy shadow-xs' 
                            : 'bg-white text-navy border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. SELECT FLOOR */}
                <div>
                  <span className="block text-[11px] font-bold text-secondary mb-1">2. Select Floor</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {FLOORS.map(f => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setSelectedFloor(f)}
                        className={`py-1.5 rounded-lg text-[11px] font-bold transition-all border ${
                          selectedFloor === f 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                            : 'bg-white text-navy border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. SELECT FLAT */}
                <div>
                  <span className="block text-[11px] font-bold text-secondary mb-1">3. Select Flat Number</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['101', '102', '103', '104', '201', '202', '301', '402'].map(fl => (
                      <button
                        key={fl}
                        type="button"
                        onClick={() => setSelectedFlat(fl)}
                        className={`py-2 rounded-lg text-xs font-black transition-all border ${
                          selectedFlat === fl 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                            : 'bg-white text-navy border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Flat {fl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mapped Resident Confirmation */}
                <div className="p-2.5 rounded-xl bg-white border border-blue-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-navy">{selectedBlock} • {selectedFloor} • Flat {selectedFlat}</span>
                    <p className="text-[11px] text-blue-700 font-medium">Mapped Resident: <strong>{currentResidentPreview}</strong></p>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                    Residence App Sync
                  </span>
                </div>

              </div>

              {/* SEND REQUEST BUTTON */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-sm tracking-wide shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Send size={16} className="stroke-[2]" />
                <span>SEND APPROVAL REQUEST TO RESIDENCE APP</span>
              </button>

            </form>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: OTP / QR SCANNER (Instant Pre-Approved Passcode Entry)
         ========================================================================= */}
      {otpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-electric flex items-center justify-center">
                  <KeyRound size={18} className="stroke-[1.75]" />
                </div>
                <h3 className="text-sm font-black text-navy">Enter Resident OTP Code</h3>
              </div>
              <button onClick={() => setOtpModalOpen(false)} className="text-secondary hover:text-navy">
                <X size={20} />
              </button>
            </div>

            <p className="text-xs text-secondary">Visitor shows 6-digit invite passcode from Resident App</p>

            {/* OTP Boxes */}
            <div className="flex items-center justify-center gap-2">
              {[0, 1, 2, 3, 4, 5].map(idx => {
                const char = otpCode[idx];
                const isCurrent = otpCode.length === idx;
                return (
                  <div
                    key={idx}
                    className={`w-11 h-13 rounded-xl flex items-center justify-center text-xl font-black border-2 transition-all ${
                      isCurrent
                        ? 'border-electric bg-blue-50/50 scale-105'
                        : char
                        ? 'border-navy bg-white text-navy'
                        : 'border-slate-200 bg-slate-50 text-secondary/30'
                    }`}
                  >
                    {char || '•'}
                  </div>
                );
              })}
            </div>

            {/* Dialpad */}
            <div className="w-full max-w-xs mx-auto space-y-2">
              {[
                ['1', '2', '3'],
                ['4', '5', '6'],
                ['7', '8', '9'],
                ['SCAN', '0', 'DEL'],
              ].map((row, rIdx) => (
                <div key={rIdx} className="flex justify-between gap-2">
                  {row.map(k => {
                    if (k === 'DEL') {
                      return (
                        <button
                          key={k}
                          onClick={() => setOtpCode(prev => prev.slice(0, -1))}
                          className="w-18 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-secondary flex items-center justify-center border border-slate-200 transition-colors"
                        >
                          <LogOut size={16} className="rotate-180 stroke-[1.75]" />
                        </button>
                      );
                    }
                    if (k === 'SCAN') {
                      return (
                        <button
                          key={k}
                          onClick={() => alert('Starting QR scanner on Gate 1 optical loop...')}
                          className="w-18 h-12 rounded-xl bg-blue-50 hover:bg-blue-100 active:scale-95 text-electric flex flex-col items-center justify-center border border-blue-200 transition-colors"
                        >
                          <QrCode size={16} className="stroke-[1.75]" />
                        </button>
                      );
                    }
                    return (
                      <button
                        key={k}
                        onClick={() => handleOtpInput(k)}
                        className="w-18 h-12 rounded-xl bg-white hover:bg-slate-50 active:scale-95 text-xl font-black text-navy border border-slate-200 flex items-center justify-center shadow-xs transition-colors"
                      >
                        {k}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2.1: OTP VALIDATED CONFIRMATION */}
      {otpValidatedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white border-2 border-emerald-500 p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-600/30">
              <Check size={32} className="stroke-[2.5]" />
            </div>

            <div>
              <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                OTP VALIDATED (RESIDENCE APP INVITE)
              </span>
              <h3 className="text-base font-black text-navy mt-1.5">{otpValidatedEntry.flat}</h3>
              <p className="text-xs text-secondary mt-0.5">{otpValidatedEntry.resident}</p>
            </div>

            <button
              onClick={handleAllowOtpEntry}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm tracking-wide shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
            >
              ALLOW IN (OPEN GATE)
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: QUICK VEHICLE LOG
         ========================================================================= */}
      {vehicleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-5 sm:p-6 shadow-2xl animate-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <CarFront size={20} className="stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-navy uppercase">Log Vehicle Entry</h3>
                  <p className="text-xs text-secondary">Number plate record & destination</p>
                </div>
              </div>
              <button onClick={() => setVehicleModalOpen(false)} className="text-secondary hover:text-navy">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-4">
              
              <div>
                <label className="block text-xs font-black text-navy uppercase mb-1">
                  Vehicle Registration Number
                </label>
                <input
                  type="text"
                  value={vehPlate}
                  onChange={(e) => setVehPlate(e.target.value.toUpperCase())}
                  placeholder="e.g. DL 01 AB 1234"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-base font-mono font-black text-navy placeholder:text-secondary/60 focus:outline-none focus:border-electric"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-navy uppercase mb-1">
                  Vehicle Category
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Resident', 'Guest', 'Cab', 'Service'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setVehType(t)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        vehType === t 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                          : 'bg-slate-50 text-navy border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Destination */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-navy uppercase mb-1">Block</label>
                  <select
                    value={vehBlock}
                    onChange={(e) => setVehBlock(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-navy"
                  >
                    {BLOCKS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-navy uppercase mb-1">Flat</label>
                  <select
                    value={vehFlat}
                    onChange={(e) => setVehFlat(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-navy"
                  >
                    {['101', '102', '103', '104', '201', '202', '301', '402'].map(fl => <option key={fl} value={fl}>Flat {fl}</option>)}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm tracking-wide shadow-md shadow-emerald-600/20 active:scale-95 transition-all mt-2"
              >
                LOG VEHICLE ENTRY (IN)
              </button>

            </form>

          </div>
        </div>
      )}

      {/* =========================================================================
          DRAWER: SUPERVISOR DAILY LOG (Separated for 1% Supervisor)
         ========================================================================= */}
      {supervisorDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-navy/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-navy text-white flex items-center justify-center">
                    <SlidersHorizontal size={18} className="stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-navy">Supervisor Shift Log</h3>
                    <p className="text-xs text-secondary">Gate 1 Activity & Society Audit</p>
                  </div>
                </div>
                <button onClick={() => setSupervisorDrawerOpen(false)} className="text-secondary hover:text-navy">
                  <X size={20} />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-lg font-black text-navy">{entries.length}</span>
                  <span className="text-[10px] font-bold text-secondary block mt-0.5">Total Entries</span>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-lg font-black text-emerald-700">{inCount}</span>
                  <span className="text-[10px] font-bold text-emerald-700 block mt-0.5">Inside Now</span>
                </div>
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200">
                  <span className="text-lg font-black text-blue-700">100%</span>
                  <span className="text-[10px] font-bold text-blue-700 block mt-0.5">Barrier Loop</span>
                </div>
              </div>

              <h4 className="text-xs font-black text-navy uppercase tracking-wider mb-2">Shift Security Directives</h4>
              <div className="space-y-2 text-xs text-secondary leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <p>• All food delivery riders must have positive approval from Residence App before gate loop opens.</p>
                <p>• Commercial heavy vehicles must only enter through parcel loading dock at Gate 2.</p>
                <p>• Intercom lines verified active for all 4 residential towers.</p>
              </div>
            </div>

            <button
              onClick={() => setSupervisorDrawerOpen(false)}
              className="w-full py-3 rounded-xl bg-navy text-white text-xs font-black hover:bg-slate-800 transition-colors"
            >
              Close Supervisor Console
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
