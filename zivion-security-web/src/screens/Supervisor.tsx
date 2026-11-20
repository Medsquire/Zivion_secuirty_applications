import React, { useState, useMemo } from 'react';
import { Card } from '../components/Card';
import { 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  Radio, 
  Search, 
  LayoutGrid, 
  Table as TableIcon, 
  Car, 
  ShieldCheck, 
  ShieldAlert, 
  KeyRound, 
  Laptop, 
  Smartphone, 
  Eye, 
  X, 
  Activity,
  Truck,
  UserCheck
} from 'lucide-react';

type TabType = 'logins' | 'vehicles' | 'employees';
type ViewMode = 'cards' | 'table';

interface LoginRecord {
  id: string;
  guardName: string;
  staffId: string;
  role: string;
  postName: string;
  loginTime: string;
  sessionDuration: string;
  status: 'active' | 'break' | 'logged_out';
  device: string;
  deviceType: 'tablet' | 'desktop' | 'mobile';
  ipAddress: string;
  battery: string;
  phone: string;
  radioChannel: string;
  lastActivity: string;
}

interface VehicleRecord {
  id: string;
  plateNumber: string;
  vehicleType: string;
  category: 'Resident' | 'Visitor' | 'Delivery' | 'Cab' | 'Commercial' | 'Staff';
  driverOrResident: string;
  unitOrDestination: string;
  entryGate: string;
  exitGate: string;
  entryTime: string;
  exitTime: string;
  durationInside: string;
  parkingSlot: string;
  status: 'inside' | 'overstay' | 'exited';
  passNumber: string;
  guardOnDuty: string;
  phone: string;
}

interface EmployeeRecord {
  id: string;
  name: string;
  staffId: string;
  role: string;
  assignedZone: string;
  phone: string;
  shift: string;
  radioChannel: string;
  status: 'on_duty' | 'patrolling' | 'break' | 'off_duty';
  attendance: string;
  bodyCam: string;
  emergencyContact: string;
}

const LOGIN_RECORDS: LoginRecord[] = [
  {
    id: 'LOG-01',
    guardName: 'Officer John Doe',
    staffId: 'SEC-881',
    role: 'Senior Gate Officer',
    postName: 'Main Gate (Post #01)',
    loginTime: '06:00 AM',
    sessionDuration: '5h 45m',
    status: 'active',
    device: 'Samsung Galaxy Tab S9 - T01',
    deviceType: 'tablet',
    ipAddress: '192.168.1.104',
    battery: '94%',
    phone: '+91 98450 12345',
    radioChannel: 'CH-01',
    lastActivity: 'Just now'
  },
  {
    id: 'LOG-02',
    guardName: 'Officer Mike Smith',
    staffId: 'SEC-882',
    role: 'Roving Patrol Lead',
    postName: 'Block A Basement Patrol',
    loginTime: '06:15 AM',
    sessionDuration: '5h 30m',
    status: 'active',
    device: 'Zebra TC57 Handheld',
    deviceType: 'mobile',
    ipAddress: '192.168.1.112',
    battery: '82%',
    phone: '+91 98450 67890',
    radioChannel: 'CH-02',
    lastActivity: '3 mins ago'
  },
  {
    id: 'LOG-03',
    guardName: 'Officer Rajesh Kumar',
    staffId: 'SEC-883',
    role: 'Commercial Bay Marshal',
    postName: 'Gate #03 (Commercial)',
    loginTime: '07:00 AM',
    sessionDuration: '4h 45m',
    status: 'active',
    device: 'Dell OptiPlex Terminal #03',
    deviceType: 'desktop',
    ipAddress: '192.168.1.108',
    battery: '100% (AC)',
    phone: '+91 98450 23456',
    radioChannel: 'CH-03',
    lastActivity: '1 min ago'
  },
  {
    id: 'LOG-04',
    guardName: 'Officer Priya Sharma',
    staffId: 'SEC-884',
    role: 'Visitor Verification Specialist',
    postName: 'Clubhouse & Visitor Desk',
    loginTime: '07:30 AM',
    sessionDuration: '4h 15m',
    status: 'break',
    device: 'Lenovo ThinkPad Terminal #01',
    deviceType: 'desktop',
    ipAddress: '192.168.1.115',
    battery: '100% (AC)',
    phone: '+91 98450 34567',
    radioChannel: 'CH-01',
    lastActivity: '12 mins ago'
  },
  {
    id: 'LOG-05',
    guardName: 'Officer Alex Wong',
    staffId: 'SEC-885',
    role: 'Perimeter Response Lead',
    postName: 'South Boundary Gate #02',
    loginTime: '05:50 AM',
    sessionDuration: '5h 55m',
    status: 'active',
    device: 'Samsung Galaxy Tab Active 4',
    deviceType: 'tablet',
    ipAddress: '192.168.1.106',
    battery: '78%',
    phone: '+91 98450 45678',
    radioChannel: 'CH-04',
    lastActivity: '4 mins ago'
  },
  {
    id: 'LOG-06',
    guardName: 'Officer David Brown',
    staffId: 'SEC-886',
    role: 'CCTV Surveillance Operator',
    postName: 'Central Command Center',
    loginTime: '06:00 AM',
    sessionDuration: '5h 45m',
    status: 'active',
    device: 'Command Workstation WS-01',
    deviceType: 'desktop',
    ipAddress: '192.168.1.100',
    battery: 'UPS Online',
    phone: '+91 98450 56789',
    radioChannel: 'CH-05',
    lastActivity: 'Active'
  }
];

const VEHICLE_RECORDS: VehicleRecord[] = [
  {
    id: 'VEH-01',
    plateNumber: 'KA-01-MJ-4412',
    vehicleType: 'SUV (White Fortuner)',
    category: 'Resident',
    driverOrResident: 'Dr. R. Sundaram (Owner)',
    unitOrDestination: 'Tower B - 1204',
    entryGate: 'Gate 1 (North Main)',
    exitGate: '-',
    entryTime: '10:15 AM',
    exitTime: 'Inside',
    durationInside: '1h 35m',
    parkingSlot: 'B2 - Slot 44',
    status: 'inside',
    passNumber: 'RES-9904',
    guardOnDuty: 'Officer J. Doe',
    phone: '+91 98765 00112'
  },
  {
    id: 'VEH-02',
    plateNumber: 'DL-3C-AB-9921',
    vehicleType: 'Sedan (Honda City)',
    category: 'Visitor',
    driverOrResident: 'Karan Mehra (Guest)',
    unitOrDestination: 'Tower A - 402',
    entryGate: 'Gate 1 (North Main)',
    exitGate: '-',
    entryTime: '11:00 AM',
    exitTime: 'Inside',
    durationInside: '50m',
    parkingSlot: 'Visitor Bay P-08',
    status: 'inside',
    passNumber: 'VIS-3321',
    guardOnDuty: 'Officer J. Doe',
    phone: '+91 98111 22334'
  },
  {
    id: 'VEH-03',
    plateNumber: 'MH-02-EE-3210',
    vehicleType: 'Delivery Van (Amazon)',
    category: 'Delivery',
    driverOrResident: 'Ramesh Singh (Courier)',
    unitOrDestination: 'Tower C - 801 & Tower D',
    entryGate: 'Gate 3 (Commercial)',
    exitGate: '-',
    entryTime: '08:30 AM',
    exitTime: 'Inside (OVERSTAY)',
    durationInside: '3h 20m ⚠️',
    parkingSlot: 'Loading Dock #02',
    status: 'overstay',
    passNumber: 'DEL-5512',
    guardOnDuty: 'Officer R. Kumar',
    phone: '+91 98222 44556'
  },
  {
    id: 'VEH-04',
    plateNumber: 'KA-05-XY-7788',
    vehicleType: 'EV Cab (Tata Tigor)',
    category: 'Cab',
    driverOrResident: 'Salman Khan (Uber Driver)',
    unitOrDestination: 'Tower B - 203 (Pickup)',
    entryGate: 'Gate 2 (South Gate)',
    exitGate: '-',
    entryTime: '11:45 AM',
    exitTime: 'Inside',
    durationInside: '5m',
    parkingSlot: 'Drop-off Bay 01',
    status: 'inside',
    passNumber: 'CAB-1109',
    guardOnDuty: 'Officer A. Wong',
    phone: '+91 97444 88990'
  },
  {
    id: 'VEH-05',
    plateNumber: 'HR-26-BR-5544',
    vehicleType: 'Hatchback (Swift)',
    category: 'Commercial',
    driverOrResident: 'Deepak V. (Urban Company AC)',
    unitOrDestination: 'Tower D - 1102',
    entryGate: 'Gate 1 (North Main)',
    exitGate: 'Gate 1 (North Main)',
    entryTime: '11:15 AM',
    exitTime: '11:55 AM (Exited)',
    durationInside: '40m',
    parkingSlot: 'Visitor Bay P-03',
    status: 'exited',
    passNumber: 'SRV-8821',
    guardOnDuty: 'Officer J. Doe',
    phone: '+91 99111 55667'
  },
  {
    id: 'VEH-06',
    plateNumber: 'KA-03-NV-1290',
    vehicleType: 'Heavy Water Tanker',
    category: 'Commercial',
    driverOrResident: 'Shiva Kumar (Water Supply)',
    unitOrDestination: 'Central Reservoir Plant',
    entryGate: 'Gate 3 (Commercial)',
    exitGate: '-',
    entryTime: '09:00 AM',
    exitTime: 'Inside',
    durationInside: '2h 50m',
    parkingSlot: 'Utility Yard Bay 01',
    status: 'inside',
    passNumber: 'COM-7711',
    guardOnDuty: 'Officer R. Kumar',
    phone: '+91 98444 11223'
  },
  {
    id: 'VEH-07',
    plateNumber: 'KA-04-MM-9001',
    vehicleType: 'Motorcycle (Royal Enfield)',
    category: 'Resident',
    driverOrResident: 'Ananya Rao (Resident)',
    unitOrDestination: 'Tower A - 905',
    entryGate: 'Gate 1 (North Main)',
    exitGate: '-',
    entryTime: '07:15 AM',
    exitTime: 'Inside',
    durationInside: '4h 35m',
    parkingSlot: 'B1 - Two-Wheeler Slot 12',
    status: 'inside',
    passNumber: 'RES-4412',
    guardOnDuty: 'Officer J. Doe',
    phone: '+91 98888 33445'
  },
  {
    id: 'VEH-08',
    plateNumber: 'MH-12-PQ-4523',
    vehicleType: 'Electric Scooter (Ather)',
    category: 'Staff',
    driverOrResident: 'Officer Rajesh (Security Staff)',
    unitOrDestination: 'Gate 3 Guard Post',
    entryGate: 'Gate 2 (South Gate)',
    exitGate: '-',
    entryTime: '06:00 AM',
    exitTime: 'Inside',
    durationInside: '5h 50m',
    parkingSlot: 'Security Barracks Bay S-04',
    status: 'inside',
    passNumber: 'STF-0012',
    guardOnDuty: 'Officer A. Wong',
    phone: '+91 98450 23456'
  }
];

const EMPLOYEE_RECORDS: EmployeeRecord[] = [
  {
    id: 'EMP-01',
    name: 'Officer John Doe',
    staffId: 'SEC-881',
    role: 'Senior Gate Marshal',
    assignedZone: 'Main Gate (Post #01)',
    phone: '+91 98450 12345',
    shift: 'Morning (06:00 - 14:00)',
    radioChannel: 'CH-01',
    status: 'on_duty',
    attendance: 'Present (Punch-in 05:48 AM)',
    bodyCam: 'BC-101 (Online • 84%)',
    emergencyContact: '+91 98450 99881'
  },
  {
    id: 'EMP-02',
    name: 'Officer Mike Smith',
    staffId: 'SEC-882',
    role: 'Roving Patrol Lead',
    assignedZone: 'Block A & B Basement / Lifts',
    phone: '+91 98450 67890',
    shift: 'Morning (06:00 - 14:00)',
    radioChannel: 'CH-02',
    status: 'patrolling',
    attendance: 'Present (Punch-in 05:55 AM)',
    bodyCam: 'BC-104 (Online • 79%)',
    emergencyContact: '+91 98450 99882'
  },
  {
    id: 'EMP-03',
    name: 'Officer Rajesh Kumar',
    staffId: 'SEC-883',
    role: 'Commercial Bay Marshal',
    assignedZone: 'Gate #03 Commercial Access',
    phone: '+91 98450 23456',
    shift: 'Morning (06:00 - 14:00)',
    radioChannel: 'CH-03',
    status: 'on_duty',
    attendance: 'Present (Punch-in 06:45 AM)',
    bodyCam: 'BC-108 (Online • 91%)',
    emergencyContact: '+91 98450 99883'
  },
  {
    id: 'EMP-04',
    name: 'Officer Priya Sharma',
    staffId: 'SEC-884',
    role: 'Visitor Verification Specialist',
    assignedZone: 'Clubhouse Front Desk',
    phone: '+91 98450 34567',
    shift: 'Morning (06:00 - 14:00)',
    radioChannel: 'CH-01',
    status: 'break',
    attendance: 'Present (Punch-in 07:15 AM)',
    bodyCam: 'BC-102 (Standby • 88%)',
    emergencyContact: '+91 98450 99884'
  },
  {
    id: 'EMP-05',
    name: 'Officer Alex Wong',
    staffId: 'SEC-885',
    role: 'Perimeter Response Lead',
    assignedZone: 'South Boundary & Fence Line',
    phone: '+91 98450 45678',
    shift: 'General (08:00 - 17:00)',
    radioChannel: 'CH-04',
    status: 'on_duty',
    attendance: 'Present (Punch-in 05:40 AM)',
    bodyCam: 'BC-112 (Online • 72%)',
    emergencyContact: '+91 98450 99885'
  },
  {
    id: 'EMP-06',
    name: 'Officer David Brown',
    staffId: 'SEC-886',
    role: 'CCTV Surveillance Lead',
    assignedZone: 'Central Command Center',
    phone: '+91 98450 56789',
    shift: 'Morning (06:00 - 14:00)',
    radioChannel: 'CH-05',
    status: 'on_duty',
    attendance: 'Present (Punch-in 05:50 AM)',
    bodyCam: 'Stationary CCTV Room',
    emergencyContact: '+91 98450 99886'
  },
  {
    id: 'EMP-07',
    name: 'Sgt. Vikram Singh',
    staffId: 'SEC-SUP-01',
    role: 'Shift Supervisor Lead',
    assignedZone: 'Campus Wide Command',
    phone: '+91 98450 00111',
    shift: 'Shift Lead (06:00 - 15:00)',
    radioChannel: 'CH-01 (Priority)',
    status: 'on_duty',
    attendance: 'Present (Punch-in 05:30 AM)',
    bodyCam: 'BC-SUP-01 (Online • 96%)',
    emergencyContact: '+91 98450 99800'
  }
];

export const Supervisor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('logins');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredLogins = useMemo(() => {
    return LOGIN_RECORDS.filter(item => {
      const matchesSearch = 
        item.guardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.postName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = 
        statusFilter === 'all' || 
        (statusFilter === 'active' && item.status === 'active') ||
        (statusFilter === 'break' && item.status === 'break') ||
        (statusFilter === 'logged_out' && item.status === 'logged_out');

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, statusFilter]);

  const filteredVehicles = useMemo(() => {
    return VEHICLE_RECORDS.filter(item => {
      const matchesSearch = 
        item.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.driverOrResident.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.unitOrDestination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.entryGate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.passNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = 
        statusFilter === 'all' ||
        (statusFilter === 'inside' && item.status === 'inside') ||
        (statusFilter === 'overstay' && item.status === 'overstay') ||
        (statusFilter === 'exited' && item.status === 'exited');

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, statusFilter]);

  const filteredEmployees = useMemo(() => {
    return EMPLOYEE_RECORDS.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.assignedZone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.radioChannel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = 
        statusFilter === 'all' ||
        (statusFilter === 'on_duty' && item.status === 'on_duty') ||
        (statusFilter === 'patrolling' && item.status === 'patrolling') ||
        (statusFilter === 'break' && item.status === 'break');

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, statusFilter]);

  const renderStatusBadge = (status: string, label?: string) => {
    if (status === 'overstay' || status === 'danger') {
      return (
        <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-rose-500/10 text-rose-600 border border-rose-500/20">
          {label || 'OVERSTAY ⚠️'}
        </span>
      );
    }
    if (status === 'break' || status === 'patrolling' || status === 'warning') {
      return (
        <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20">
          {label || (status === 'break' ? 'ON BREAK' : 'PATROLLING')}
        </span>
      );
    }
    if (status === 'exited' || status === 'logged_out' || status === 'off_duty') {
      return (
        <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-500/10 text-slate-600 border border-slate-500/20">
          {label || (status === 'exited' ? 'EXITED' : 'OFFLINE')}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
        {label || status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Banner */}
      <div className="glass-stat-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-navy tracking-tight">Supervisor Command Center</h1>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/25 rounded-md uppercase">
              Shift Lead Console
            </span>
          </div>
          <p className="text-xs text-secondary mt-1">Live Gate Terminal Manning • Society Vehicles • Security Personnel</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/25 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE PULSE 30s
          </div>
        </div>
      </div>

      {/* 4 Frosted KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-stat-white">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
              <KeyRound size={20} />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
              100% ONLINE
            </span>
          </div>
          <p className="text-2xl font-extrabold text-navy">6 / 6</p>
          <p className="text-xs font-bold text-navy mt-1">Active Gate Logins</p>
          <p className="text-[11px] text-secondary">All terminal stations manned</p>
        </Card>

        <Card className="glass-stat-white">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Car size={20} />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-100">
              1 OVERSTAY
            </span>
          </div>
          <p className="text-2xl font-extrabold text-navy">7 Inside</p>
          <p className="text-xs font-bold text-navy mt-1">Vehicles On-Premises</p>
          <p className="text-[11px] text-secondary">1 delivery past 3h window</p>
        </Card>

        <Card className="glass-stat-white">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center text-blue-700">
              <Users size={20} />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
              7 ON DUTY
            </span>
          </div>
          <p className="text-2xl font-extrabold text-navy">7 Staff</p>
          <p className="text-xs font-bold text-navy mt-1">Security Personnel</p>
          <p className="text-[11px] text-secondary">5 Gates • 1 Patrol • 1 Lead</p>
        </Card>

        <Card className="glass-stat-white">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
              <Activity size={20} />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">
              STABLE
            </span>
          </div>
          <p className="text-2xl font-extrabold text-navy">0 Critical</p>
          <p className="text-xs font-bold text-navy mt-1">Security Alerts / SOS</p>
          <p className="text-[11px] text-secondary">All perimeter barriers secure</p>
        </Card>
      </div>

      {/* Control Dock: Tabs + View Mode Toggle */}
      <div className="glass-dock p-2.5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('logins'); setStatusFilter('all'); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'logins'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'text-secondary hover:text-navy hover:bg-white/60'
            }`}
          >
            <KeyRound size={15} />
            <span>Guard Logins</span>
            <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${activeTab === 'logins' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
              {LOGIN_RECORDS.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('vehicles'); setStatusFilter('all'); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'vehicles'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'text-secondary hover:text-navy hover:bg-white/60'
            }`}
          >
            <Car size={15} />
            <span>Vehicles</span>
            <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${activeTab === 'vehicles' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
              {VEHICLE_RECORDS.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('employees'); setStatusFilter('all'); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'employees'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'text-secondary hover:text-navy hover:bg-white/60'
            }`}
          >
            <Users size={15} />
            <span>Employees</span>
            <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${activeTab === 'employees' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
              {EMPLOYEE_RECORDS.length}
            </span>
          </button>
        </div>

        {/* View Mode Toggle: Cards vs Table */}
        <div className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-white/80 shrink-0">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'cards'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-secondary hover:text-navy'
            }`}
          >
            <LayoutGrid size={15} />
            <span>Cards View</span>
          </button>

          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-secondary hover:text-navy'
            }`}
          >
            <TableIcon size={15} />
            <span>Table View</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            className="w-full glass-input pl-10 pr-9 py-2.5 rounded-xl text-xs text-navy font-medium placeholder:text-secondary/60 focus:outline-none"
            placeholder={
              activeTab === 'logins' ? "Search officer, staff ID, gate post or device..." :
              activeTab === 'vehicles' ? "Search license plate, driver, unit or pass..." :
              "Search employee name, staff ID, role, zone..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-navy"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Quick Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto shrink-0 pb-1 md:pb-0">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              statusFilter === 'all'
                ? 'bg-blue-600/10 text-blue-700 border-blue-500/30 font-bold'
                : 'bg-white/60 text-secondary border-white/80 hover:bg-white'
            }`}
          >
            All
          </button>

          {activeTab === 'logins' && (
            <>
              <button
                onClick={() => setStatusFilter('active')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  statusFilter === 'active'
                    ? 'bg-blue-600/10 text-blue-700 border-blue-500/30 font-bold'
                    : 'bg-white/60 text-secondary border-white/80 hover:bg-white'
                }`}
              >
                Active (5)
              </button>
              <button
                onClick={() => setStatusFilter('break')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  statusFilter === 'break'
                    ? 'bg-blue-600/10 text-blue-700 border-blue-500/30 font-bold'
                    : 'bg-white/60 text-secondary border-white/80 hover:bg-white'
                }`}
              >
                On Break (1)
              </button>
            </>
          )}

          {activeTab === 'vehicles' && (
            <>
              <button
                onClick={() => setStatusFilter('inside')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  statusFilter === 'inside'
                    ? 'bg-blue-600/10 text-blue-700 border-blue-500/30 font-bold'
                    : 'bg-white/60 text-secondary border-white/80 hover:bg-white'
                }`}
              >
                Inside (7)
              </button>
              <button
                onClick={() => setStatusFilter('overstay')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  statusFilter === 'overstay'
                    ? 'bg-rose-500/10 text-rose-700 border-rose-500/30 font-bold'
                    : 'bg-white/60 text-secondary border-white/80 hover:bg-white'
                }`}
              >
                ⚠️ Overstay (1)
              </button>
              <button
                onClick={() => setStatusFilter('exited')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  statusFilter === 'exited'
                    ? 'bg-slate-500/10 text-slate-700 border-slate-500/30 font-bold'
                    : 'bg-white/60 text-secondary border-white/80 hover:bg-white'
                }`}
              >
                Exited (1)
              </button>
            </>
          )}

          {activeTab === 'employees' && (
            <>
              <button
                onClick={() => setStatusFilter('on_duty')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  statusFilter === 'on_duty'
                    ? 'bg-blue-600/10 text-blue-700 border-blue-500/30 font-bold'
                    : 'bg-white/60 text-secondary border-white/80 hover:bg-white'
                }`}
              >
                On Duty (5)
              </button>
              <button
                onClick={() => setStatusFilter('patrolling')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  statusFilter === 'patrolling'
                    ? 'bg-blue-600/10 text-blue-700 border-blue-500/30 font-bold'
                    : 'bg-white/60 text-secondary border-white/80 hover:bg-white'
                }`}
              >
                Patrolling (1)
              </button>
              <button
                onClick={() => setStatusFilter('break')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  statusFilter === 'break'
                    ? 'bg-blue-600/10 text-blue-700 border-blue-500/30 font-bold'
                    : 'bg-white/60 text-secondary border-white/80 hover:bg-white'
                }`}
              >
                On Break (1)
              </button>
            </>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. LOGINS TAB CONTENT */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'logins' && (
        viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLogins.map(login => (
              <div key={login.id} className="glass-stat-white p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                        <UserCheck size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-navy">{login.guardName}</h3>
                        <p className="text-[11px] font-mono text-secondary mt-0.5">{login.staffId} • {login.role}</p>
                      </div>
                    </div>
                    {renderStatusBadge(login.status)}
                  </div>

                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-blue-500/5 text-navy text-xs font-semibold mb-3">
                    <MapPin size={14} className="text-blue-600 shrink-0" />
                    <span>{login.postName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="p-2 rounded-lg bg-white/60 border border-white">
                      <p className="text-[10px] font-bold text-secondary uppercase">DEVICE & TERMINAL</p>
                      <p className="font-semibold text-navy truncate mt-0.5">{login.device}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/60 border border-white">
                      <p className="text-[10px] font-bold text-secondary uppercase">IP & BATTERY</p>
                      <p className="font-mono text-navy font-semibold mt-0.5">{login.ipAddress} • {login.battery}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/60 border border-white">
                      <p className="text-[10px] font-bold text-secondary uppercase">LOGIN TIME</p>
                      <p className="font-medium text-navy mt-0.5">{login.loginTime} ({login.sessionDuration})</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/60 border border-white">
                      <p className="text-[10px] font-bold text-secondary uppercase">RADIO CHANNEL</p>
                      <p className="font-mono text-navy font-bold mt-0.5">{login.radioChannel}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button 
                    onClick={() => alert(`Calling ${login.guardName} (${login.phone})`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-navy transition-all"
                  >
                    <Phone size={13} />
                    <span>Call</span>
                  </button>
                  <button 
                    onClick={() => alert(`Broadcasting to ${login.guardName} on ${login.radioChannel}`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-navy transition-all"
                  >
                    <Radio size={13} />
                    <span>Radio</span>
                  </button>
                  <button 
                    onClick={() => alert(`Session Audit: ${login.guardName}\nIP: ${login.ipAddress}\nDevice: ${login.device}\nLogin: ${login.loginTime}`)}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 text-xs font-bold transition-all"
                  >
                    <Eye size={13} />
                    <span>Audit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View for Logins */
          <div className="glass-stat-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200/80 text-secondary uppercase tracking-wider font-extrabold text-[10px]">
                    <th className="py-3 px-4">Guard / Officer</th>
                    <th className="py-3 px-4">Assigned Post</th>
                    <th className="py-3 px-4">Terminal & IP</th>
                    <th className="py-3 px-4">Login Time</th>
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLogins.map(login => (
                    <tr key={login.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                            <UserCheck size={16} />
                          </div>
                          <div>
                            <p className="font-bold text-navy">{login.guardName}</p>
                            <p className="font-mono text-secondary text-[11px]">{login.staffId} • {login.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-navy">{login.postName}</td>
                      <td className="py-3.5 px-4">
                        <p className="font-medium text-navy">{login.device}</p>
                        <p className="font-mono text-secondary text-[11px]">{login.ipAddress} • {login.battery}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold font-mono text-navy">{login.loginTime}</p>
                        <p className="text-secondary text-[11px]">{login.sessionDuration} active</p>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-navy">{login.radioChannel}</td>
                      <td className="py-3.5 px-4">{renderStatusBadge(login.status)}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => alert(`Calling ${login.guardName} (${login.phone})`)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-navy hover:bg-slate-50"
                            title="Call"
                          >
                            <Phone size={13} />
                          </button>
                          <button 
                            onClick={() => alert(`Radio calling ${login.guardName} on ${login.radioChannel}`)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-navy hover:bg-slate-50"
                            title="Radio Intercom"
                          >
                            <Radio size={13} />
                          </button>
                          <button 
                            onClick={() => alert(`Terminal details for ${login.guardName}\nIP: ${login.ipAddress}\nDevice: ${login.device}`)}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                            title="Audit"
                          >
                            <Eye size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. VEHICLES TAB CONTENT */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'vehicles' && (
        viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVehicles.map(vehicle => (
              <div 
                key={vehicle.id} 
                className={`glass-stat-white p-5 flex flex-col justify-between ${
                  vehicle.status === 'overstay' ? 'ring-2 ring-rose-500/40 bg-rose-50/10' : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        vehicle.status === 'overstay' ? 'bg-rose-500/10 text-rose-600' : 'bg-blue-500/10 text-blue-600'
                      }`}>
                        {vehicle.category === 'Delivery' ? <Truck size={20} /> : <Car size={20} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-extrabold text-navy tracking-wide">{vehicle.plateNumber}</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                            {vehicle.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-secondary mt-0.5">{vehicle.vehicleType}</p>
                      </div>
                    </div>
                    {renderStatusBadge(vehicle.status)}
                  </div>

                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-blue-500/5 text-navy text-xs font-semibold mb-3">
                    <MapPin size={14} className="text-blue-600 shrink-0" />
                    <span className="font-bold">{vehicle.unitOrDestination}</span>
                    <span className="text-secondary">• {vehicle.driverOrResident}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="p-2 rounded-lg bg-white/60 border border-white">
                      <p className="text-[10px] font-bold text-secondary uppercase">ENTRY GATE & TIME</p>
                      <p className="font-semibold text-navy mt-0.5">{vehicle.entryGate}</p>
                      <p className="font-mono text-secondary text-[11px]">{vehicle.entryTime}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/60 border border-white">
                      <p className="text-[10px] font-bold text-secondary uppercase">DURATION & PARKING</p>
                      <p className={`font-bold mt-0.5 ${vehicle.status === 'overstay' ? 'text-rose-600' : 'text-navy'}`}>
                        {vehicle.durationInside}
                      </p>
                      <p className="font-mono text-secondary text-[11px]">{vehicle.parkingSlot}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/60 border border-white">
                      <p className="text-[10px] font-bold text-secondary uppercase">PASS NUMBER</p>
                      <p className="font-mono font-bold text-navy mt-0.5">{vehicle.passNumber}</p>
                      <p className="text-secondary text-[10px]">By {vehicle.guardOnDuty}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/60 border border-white">
                      <p className="text-[10px] font-bold text-secondary uppercase">EXIT GATE</p>
                      <p className="font-semibold text-navy mt-0.5">{vehicle.exitTime}</p>
                      <p className="text-secondary text-[10px]">{vehicle.exitGate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button 
                    onClick={() => alert(`Calling driver/resident: ${vehicle.driverOrResident} (${vehicle.phone})`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-navy transition-all"
                  >
                    <Phone size={13} />
                    <span>Call Driver</span>
                  </button>
                  <button 
                    onClick={() => alert(`Vehicle Pass Slip: ${vehicle.plateNumber}\nPass No: ${vehicle.passNumber}\nUnit: ${vehicle.unitOrDestination}\nDriver: ${vehicle.driverOrResident}`)}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 text-xs font-bold transition-all"
                  >
                    <Eye size={13} />
                    <span>Pass</span>
                  </button>
                  {vehicle.status === 'overstay' && (
                    <button 
                      onClick={() => alert(`Dispatched patrol alert for overstay vehicle ${vehicle.plateNumber} at ${vehicle.parkingSlot}`)}
                      className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all"
                    >
                      <ShieldAlert size={13} />
                      <span>Alert</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View for Vehicles */
          <div className="glass-stat-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200/80 text-secondary uppercase tracking-wider font-extrabold text-[10px]">
                    <th className="py-3 px-4">Plate & Pass</th>
                    <th className="py-3 px-4">Category / Type</th>
                    <th className="py-3 px-4">Destination & Person</th>
                    <th className="py-3 px-4">Entry Gate & Time</th>
                    <th className="py-3 px-4">Duration Inside</th>
                    <th className="py-3 px-4">Parking Slot</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredVehicles.map(vehicle => (
                    <tr 
                      key={vehicle.id} 
                      className={`hover:bg-blue-50/30 transition-colors ${
                        vehicle.status === 'overstay' ? 'bg-rose-50/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <p className="font-mono font-extrabold text-navy text-sm">{vehicle.plateNumber}</p>
                        <p className="font-mono text-secondary text-[11px]">{vehicle.passNumber}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                          {vehicle.category}
                        </span>
                        <p className="text-secondary text-[11px] mt-0.5">{vehicle.vehicleType}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-navy">{vehicle.unitOrDestination}</p>
                        <p className="text-secondary text-[11px]">{vehicle.driverOrResident}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-mono font-bold text-navy">{vehicle.entryTime}</p>
                        <p className="text-secondary text-[11px]">{vehicle.entryGate}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className={`font-mono font-bold ${vehicle.status === 'overstay' ? 'text-rose-600' : 'text-navy'}`}>
                          {vehicle.durationInside}
                        </p>
                        <p className="text-secondary text-[11px]">Exit: {vehicle.exitTime}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-navy">{vehicle.parkingSlot}</p>
                        <p className="text-secondary text-[10px]">Guard: {vehicle.guardOnDuty}</p>
                      </td>
                      <td className="py-3.5 px-4">{renderStatusBadge(vehicle.status)}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => alert(`Calling driver ${vehicle.driverOrResident} (${vehicle.phone})`)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-navy hover:bg-slate-50"
                            title="Call"
                          >
                            <Phone size={13} />
                          </button>
                          <button 
                            onClick={() => alert(`Pass details for ${vehicle.plateNumber}\nPass: ${vehicle.passNumber}\nDestination: ${vehicle.unitOrDestination}`)}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                            title="View Pass"
                          >
                            <Eye size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. EMPLOYEES TAB CONTENT */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'employees' && (
        viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployees.map(emp => (
              <div key={emp.id} className="glass-stat-white p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-blue-700 shrink-0">
                        <Users size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-navy">{emp.name}</h3>
                        <p className="text-[11px] font-mono text-secondary mt-0.5">{emp.staffId} • {emp.role}</p>
                      </div>
                    </div>
                    {renderStatusBadge(emp.status)}
                  </div>

                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-blue-500/5 text-navy text-xs font-semibold mb-3">
                    <MapPin size={14} className="text-blue-600 shrink-0" />
                    <span>{emp.assignedZone}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="p-2 rounded-lg bg-white/60 border border-white">
                      <p className="text-[10px] font-bold text-secondary uppercase">SHIFT TIMINGS</p>
                      <p className="font-semibold text-navy mt-0.5">{emp.shift}</p>
                      <p className="text-secondary text-[10px]">{emp.attendance}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/60 border border-white">
                      <p className="text-[10px] font-bold text-secondary uppercase">RADIO & BODYCAM</p>
                      <p className="font-mono font-bold text-navy mt-0.5">{emp.radioChannel}</p>
                      <p className="text-secondary text-[10px]">{emp.bodyCam}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/60 border border-white">
                      <p className="text-[10px] font-bold text-secondary uppercase">CONTACT PHONE</p>
                      <p className="font-mono text-navy font-semibold mt-0.5">{emp.phone}</p>
                      <p className="text-secondary text-[10px]">ICE: {emp.emergencyContact}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/60 border border-white">
                      <p className="text-[10px] font-bold text-secondary uppercase">DUTY STATUS</p>
                      <p className="font-semibold text-navy mt-0.5">Active on Post</p>
                      <p className="text-secondary text-[10px]">GPS Verified</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button 
                    onClick={() => alert(`Calling ${emp.name} (${emp.phone})`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-navy transition-all"
                  >
                    <Phone size={13} />
                    <span>Call Guard</span>
                  </button>
                  <button 
                    onClick={() => alert(`Radio calling ${emp.name} on ${emp.radioChannel}`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-navy transition-all"
                  >
                    <Radio size={13} />
                    <span>Radio</span>
                  </button>
                  <button 
                    onClick={() => alert(`Profile for ${emp.name}\nStaff ID: ${emp.staffId}\nZone: ${emp.assignedZone}\nShift: ${emp.shift}`)}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 text-xs font-bold transition-all"
                  >
                    <Eye size={13} />
                    <span>Profile</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View for Employees */
          <div className="glass-stat-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200/80 text-secondary uppercase tracking-wider font-extrabold text-[10px]">
                    <th className="py-3 px-4">Officer & Staff ID</th>
                    <th className="py-3 px-4">Role & Designation</th>
                    <th className="py-3 px-4">Assigned Zone / Post</th>
                    <th className="py-3 px-4">Shift & Attendance</th>
                    <th className="py-3 px-4">Radio & BodyCam</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEmployees.map(emp => (
                    <tr key={emp.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-blue-700 shrink-0">
                            <Users size={16} />
                          </div>
                          <div>
                            <p className="font-bold text-navy">{emp.name}</p>
                            <p className="font-mono text-secondary text-[11px]">{emp.staffId} • {emp.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-navy">{emp.role}</td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-navy">{emp.assignedZone}</p>
                        <p className="text-secondary text-[10px]">Manning checkpoint</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-navy">{emp.shift}</p>
                        <p className="text-secondary text-[11px]">{emp.attendance}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-mono font-bold text-navy">{emp.radioChannel}</p>
                        <p className="text-secondary text-[10px]">{emp.bodyCam}</p>
                      </td>
                      <td className="py-3.5 px-4">{renderStatusBadge(emp.status)}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => alert(`Calling ${emp.name} (${emp.phone})`)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-navy hover:bg-slate-50"
                            title="Call"
                          >
                            <Phone size={13} />
                          </button>
                          <button 
                            onClick={() => alert(`Radio calling ${emp.name} on ${emp.radioChannel}`)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-navy hover:bg-slate-50"
                            title="Radio"
                          >
                            <Radio size={13} />
                          </button>
                          <button 
                            onClick={() => alert(`Profile for ${emp.name}\nZone: ${emp.assignedZone}\nRole: ${emp.role}`)}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                            title="View Profile"
                          >
                            <Eye size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  );
};
