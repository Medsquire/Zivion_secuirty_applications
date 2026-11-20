import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity, 
  Alert, 
  Image, 
  TextInput, 
  useWindowDimensions, 
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../theme/colors';
import { Card } from '../components/Card';
import { 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  ArrowLeft, 
  LogOut, 
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
} from 'lucide-react-native';

interface SupervisorDashboardProps {
  navigation?: any;
}

type TabType = 'logins' | 'vehicles' | 'employees';
type ViewMode = 'cards' | 'table';

// --- DATA STRUCTURES ---

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

// --- MOCK DATASETS ---

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
    unitOrDestination: 'Tower A - 402 (Host: A. Kapoor)',
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

export const SupervisorDashboard: React.FC<SupervisorDashboardProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const isWide = width >= 1150;

  // State Management
  const [activeTab, setActiveTab] = useState<TabType>('logins');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Quick Action Alerts
  const handleCall = (name: string, phone: string) => {
    Alert.alert('Phone Call', `Dialing ${name} (${phone})...`);
  };

  const handleRadioPing = (name: string, channel: string) => {
    Alert.alert('Radio Intercom Call', `Broadcasting to ${name} on Radio ${channel}...`);
  };

  const handleViewDetails = (title: string, details: string) => {
    Alert.alert(title, details);
  };

  // Filtered Datasets
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

  // Status Styling Helpers
  const renderStatusBadge = (status: string, label?: string) => {
    let bg = colors.successBg;
    let text = colors.success;
    let displayText = label || status.toUpperCase();

    if (status === 'overstay' || status === 'danger') {
      bg = colors.dangerBg;
      text = colors.danger;
      displayText = label || 'OVERSTAY ⚠️';
    } else if (status === 'break' || status === 'patrolling' || status === 'warning') {
      bg = colors.warningBg;
      text = colors.warning;
      displayText = label || (status === 'break' ? 'ON BREAK' : 'PATROLLING');
    } else if (status === 'exited' || status === 'logged_out' || status === 'off_duty') {
      bg = 'rgba(100, 116, 139, 0.12)';
      text = '#475569';
      displayText = label || (status === 'exited' ? 'EXITED' : 'OFFLINE');
    }

    return (
      <View style={[styles.statusBadge, { backgroundColor: bg }]}>
        <Text style={[styles.statusBadgeText, { color: text }]}>{displayText}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={gradients.lightBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Floating Frosted Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.headerLeft}>
          {navigation && (
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login')}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <ArrowLeft size={18} color={colors.primaryNavy} />
            </TouchableOpacity>
          )}
          <View style={styles.logoBadge}>
            <Image 
              source={require('../assets/logo.jpg')} 
              style={styles.logoImage} 
              resizeMode="cover" 
            />
          </View>
          <View style={styles.headerTitleGroup}>
            <View style={styles.brandTitleRow}>
              <Text style={styles.brandTitle}>ZIVION</Text>
              <View style={styles.supervisorPill}>
                <Text style={styles.supervisorPillText}>SUPERVISOR</Text>
              </View>
            </View>
            <Text style={styles.subDutyText} numberOfLines={1} ellipsizeMode="tail">
              {isDesktop ? "Shift Command • Live Gate & Perimeter Surveillance" : "Live Gate & Patrol Command"}
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.livePulseBox}>
            <View style={styles.pulseDot} />
            <Text style={styles.livePulseText}>LIVE</Text>
          </View>

          {navigation && (
            <TouchableOpacity 
              onPress={() => navigation.navigate('GuardDashboard')}
              style={styles.switchGateBtn}
              activeOpacity={0.8}
            >
              <ShieldCheck size={14} color={colors.white} />
              {isDesktop && <Text style={styles.switchGateBtnText}>Guard View</Text>}
            </TouchableOpacity>
          )}

          {navigation && (
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login')}
              style={styles.exitBtn}
              activeOpacity={0.7}
            >
              <LogOut size={15} color={colors.secondaryText} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, isDesktop && styles.scrollContentDesktop]} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* Top KPI Metric Cards (Frosted Glass) */}
        <View style={styles.metricsGrid}>
          <Card style={[styles.metricCard, isDesktop && styles.metricCardDesktop]}>
            <View style={styles.metricCardHeader}>
              <View style={[styles.metricIconCircle, { backgroundColor: 'rgba(37, 99, 235, 0.12)' }]}>
                <KeyRound size={18} color={colors.electricBlue} />
              </View>
              <View style={styles.kpiTag}>
                <Text style={styles.kpiTagText}>100% ONLINE</Text>
              </View>
            </View>
            <Text style={styles.metricValue}>6 / 6</Text>
            <Text style={styles.metricLabel}>Active Gate Logins</Text>
            <Text style={styles.metricSub} numberOfLines={1}>All stations manned</Text>
          </Card>

          <Card style={[styles.metricCard, isDesktop && styles.metricCardDesktop]}>
            <View style={styles.metricCardHeader}>
              <View style={[styles.metricIconCircle, { backgroundColor: 'rgba(16, 185, 129, 0.12)' }]}>
                <Car size={18} color={colors.success} />
              </View>
              <View style={[styles.kpiTag, { backgroundColor: colors.dangerBg }]}>
                <Text style={[styles.kpiTagText, { color: colors.danger }]}>1 OVERSTAY</Text>
              </View>
            </View>
            <Text style={styles.metricValue}>7 Inside</Text>
            <Text style={styles.metricLabel}>Vehicles On-Site</Text>
            <Text style={styles.metricSub} numberOfLines={1}>1 past 3h window</Text>
          </Card>

          <Card style={[styles.metricCard, isDesktop && styles.metricCardDesktop]}>
            <View style={styles.metricCardHeader}>
              <View style={[styles.metricIconCircle, { backgroundColor: 'rgba(56, 164, 247, 0.15)' }]}>
                <Users size={18} color={colors.primaryNavy} />
              </View>
              <View style={styles.kpiTag}>
                <Text style={styles.kpiTagText}>7 ON DUTY</Text>
              </View>
            </View>
            <Text style={styles.metricValue}>7 Staff</Text>
            <Text style={styles.metricLabel}>Security Personnel</Text>
            <Text style={styles.metricSub} numberOfLines={1}>5 Gates • 1 Patrol • 1 Lead</Text>
          </Card>

          <Card style={[styles.metricCard, isDesktop && styles.metricCardDesktop]}>
            <View style={styles.metricCardHeader}>
              <View style={[styles.metricIconCircle, { backgroundColor: 'rgba(217, 119, 6, 0.12)' }]}>
                <Activity size={18} color={colors.warning} />
              </View>
              <View style={styles.kpiTag}>
                <Text style={styles.kpiTagText}>STABLE</Text>
              </View>
            </View>
            <Text style={styles.metricValue}>0 Critical</Text>
            <Text style={styles.metricLabel}>Security Alerts</Text>
            <Text style={styles.metricSub} numberOfLines={1}>All perimeters audited</Text>
          </Card>
        </View>

        {/* Floating Dock Control Bar */}
        <View style={[styles.controlDock, !isDesktop && styles.controlDockMobile]}>
          {/* Scrollable Entity Tabs on Mobile */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.entityTabsScrollContent}
            style={styles.entityTabsScroll}
          >
            <TouchableOpacity
              style={[styles.entityTab, activeTab === 'logins' && styles.activeEntityTab]}
              onPress={() => { setActiveTab('logins'); setStatusFilter('all'); }}
              activeOpacity={0.8}
            >
              <KeyRound size={15} color={activeTab === 'logins' ? colors.electricBlue : colors.secondaryText} />
              <Text style={[styles.entityTabText, activeTab === 'logins' && styles.activeEntityTabText]}>
                Guard Logins
              </Text>
              <View style={[styles.countBadge, activeTab === 'logins' && styles.activeCountBadge]}>
                <Text style={[styles.countBadgeText, activeTab === 'logins' && styles.activeCountBadgeText]}>
                  {LOGIN_RECORDS.length}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.entityTab, activeTab === 'vehicles' && styles.activeEntityTab]}
              onPress={() => { setActiveTab('vehicles'); setStatusFilter('all'); }}
              activeOpacity={0.8}
            >
              <Car size={15} color={activeTab === 'vehicles' ? colors.electricBlue : colors.secondaryText} />
              <Text style={[styles.entityTabText, activeTab === 'vehicles' && styles.activeEntityTabText]}>
                Vehicles
              </Text>
              <View style={[styles.countBadge, activeTab === 'vehicles' && styles.activeCountBadge]}>
                <Text style={[styles.countBadgeText, activeTab === 'vehicles' && styles.activeCountBadgeText]}>
                  {VEHICLE_RECORDS.length}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.entityTab, activeTab === 'employees' && styles.activeEntityTab]}
              onPress={() => { setActiveTab('employees'); setStatusFilter('all'); }}
              activeOpacity={0.8}
            >
              <Users size={15} color={activeTab === 'employees' ? colors.electricBlue : colors.secondaryText} />
              <Text style={[styles.entityTabText, activeTab === 'employees' && styles.activeEntityTabText]}>
                Employees
              </Text>
              <View style={[styles.countBadge, activeTab === 'employees' && styles.activeCountBadge]}>
                <Text style={[styles.countBadgeText, activeTab === 'employees' && styles.activeCountBadgeText]}>
                  {EMPLOYEE_RECORDS.length}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>

          {/* View Mode Switcher: Cards View vs Table View */}
          <View style={[styles.viewModeContainer, !isDesktop && styles.viewModeContainerMobile]}>
            <TouchableOpacity
              style={[styles.viewModeBtn, !isDesktop && styles.viewModeBtnMobile, viewMode === 'cards' && styles.activeViewModeBtn]}
              onPress={() => setViewMode('cards')}
              activeOpacity={0.8}
            >
              <LayoutGrid size={15} color={viewMode === 'cards' ? colors.white : colors.secondaryText} />
              <Text style={[styles.viewModeBtnText, viewMode === 'cards' && styles.activeViewModeBtnText]}>
                Cards View
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.viewModeBtn, !isDesktop && styles.viewModeBtnMobile, viewMode === 'table' && styles.activeViewModeBtn]}
              onPress={() => setViewMode('table')}
              activeOpacity={0.8}
            >
              <TableIcon size={15} color={viewMode === 'table' ? colors.white : colors.secondaryText} />
              <Text style={[styles.viewModeBtnText, viewMode === 'table' && styles.activeViewModeBtnText]}>
                Table View
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search & Filter Toolbar */}
        <View style={styles.toolbarRow}>
          <View style={styles.searchBarWrapper}>
            <Search size={16} color={colors.secondaryText} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={
                activeTab === 'logins' ? "Search officer, staff ID, post or device..." :
                activeTab === 'vehicles' ? "Search license plate, driver, unit or pass..." :
                "Search employee name, staff ID, role, zone..."
              }
              placeholderTextColor="rgba(0,0,0,0.4)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
                <X size={14} color={colors.secondaryText} />
              </TouchableOpacity>
            )}
          </View>

          {/* Quick Filter Pills */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.filterPillsContainer}
          >
            <TouchableOpacity
              style={[styles.filterPill, statusFilter === 'all' && styles.activeFilterPill]}
              onPress={() => setStatusFilter('all')}
            >
              <Text style={[styles.filterPillText, statusFilter === 'all' && styles.activeFilterPillText]}>
                All
              </Text>
            </TouchableOpacity>

            {activeTab === 'logins' && (
              <>
                <TouchableOpacity
                  style={[styles.filterPill, statusFilter === 'active' && styles.activeFilterPill]}
                  onPress={() => setStatusFilter('active')}
                >
                  <Text style={[styles.filterPillText, statusFilter === 'active' && styles.activeFilterPillText]}>
                    Active Now (5)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterPill, statusFilter === 'break' && styles.activeFilterPill]}
                  onPress={() => setStatusFilter('break')}
                >
                  <Text style={[styles.filterPillText, statusFilter === 'break' && styles.activeFilterPillText]}>
                    On Break (1)
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {activeTab === 'vehicles' && (
              <>
                <TouchableOpacity
                  style={[styles.filterPill, statusFilter === 'inside' && styles.activeFilterPill]}
                  onPress={() => setStatusFilter('inside')}
                >
                  <Text style={[styles.filterPillText, statusFilter === 'inside' && styles.activeFilterPillText]}>
                    Currently Inside (7)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterPill, statusFilter === 'overstay' && styles.activeFilterPill]}
                  onPress={() => setStatusFilter('overstay')}
                >
                  <Text style={[styles.filterPillText, statusFilter === 'overstay' && styles.activeFilterPillText]}>
                    ⚠️ Overstay (1)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterPill, statusFilter === 'exited' && styles.activeFilterPill]}
                  onPress={() => setStatusFilter('exited')}
                >
                  <Text style={[styles.filterPillText, statusFilter === 'exited' && styles.activeFilterPillText]}>
                    Exited (1)
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {activeTab === 'employees' && (
              <>
                <TouchableOpacity
                  style={[styles.filterPill, statusFilter === 'on_duty' && styles.activeFilterPill]}
                  onPress={() => setStatusFilter('on_duty')}
                >
                  <Text style={[styles.filterPillText, statusFilter === 'on_duty' && styles.activeFilterPillText]}>
                    On Duty (5)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterPill, statusFilter === 'patrolling' && styles.activeFilterPill]}
                  onPress={() => setStatusFilter('patrolling')}
                >
                  <Text style={[styles.filterPillText, statusFilter === 'patrolling' && styles.activeFilterPillText]}>
                    Patrolling (1)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterPill, statusFilter === 'break' && styles.activeFilterPill]}
                  onPress={() => setStatusFilter('break')}
                >
                  <Text style={[styles.filterPillText, statusFilter === 'break' && styles.activeFilterPillText]}>
                    On Break (1)
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>

        {/* MAIN CONTENT AREA */}
        
        {/* =============================================================== */}
        {/* 1. LOGINS TAB */}
        {/* =============================================================== */}
        {activeTab === 'logins' && (
          viewMode === 'cards' ? (
            /* Cards View for Logins */
            <View style={[styles.cardsGrid, isDesktop && styles.cardsGridDesktop]}>
              {filteredLogins.map(login => (
                <View 
                  key={login.id} 
                  style={[
                    styles.cardColumn, 
                    isWide ? styles.cardColWide : isDesktop ? styles.cardColDesktop : styles.cardColMobile
                  ]}
                >
                  <Card style={styles.dataCard}>
                    {/* Top Row */}
                    <View style={styles.cardHeaderRow}>
                      <View style={styles.cardAvatarBox}>
                        <UserCheck size={18} color={colors.electricBlue} />
                      </View>
                      <View style={styles.cardHeaderInfo}>
                        <Text style={styles.cardMainTitle} numberOfLines={1}>{login.guardName}</Text>
                        <Text style={styles.cardMonoBadge} numberOfLines={1}>{login.staffId} • {login.role}</Text>
                      </View>
                      <View style={styles.badgeWrapper}>
                        {renderStatusBadge(login.status)}
                      </View>
                    </View>

                    {/* Post & Gate */}
                    <View style={styles.detailHighlightRow}>
                      <MapPin size={14} color={colors.primaryNavy} />
                      <Text style={styles.detailHighlightText}>{login.postName}</Text>
                    </View>

                    {/* Metadata Grid */}
                    <View style={styles.microGrid}>
                      <View style={styles.microCell}>
                        <Text style={styles.microLabel}>DEVICE & TERMINAL</Text>
                        <View style={styles.microValRow}>
                          {login.deviceType === 'desktop' ? (
                            <Laptop size={12} color={colors.electricBlue} />
                          ) : (
                            <Smartphone size={12} color={colors.electricBlue} />
                          )}
                          <Text style={styles.microValue} numberOfLines={1}>{login.device}</Text>
                        </View>
                      </View>

                      <View style={styles.microCell}>
                        <Text style={styles.microLabel}>IP & BATTERY</Text>
                        <Text style={styles.microMonoValue}>{login.ipAddress} • {login.battery}</Text>
                      </View>

                      <View style={styles.microCell}>
                        <Text style={styles.microLabel}>LOGIN TIME</Text>
                        <View style={styles.microValRow}>
                          <Clock size={12} color={colors.secondaryText} />
                          <Text style={styles.microValue}>{login.loginTime} ({login.sessionDuration})</Text>
                        </View>
                      </View>

                      <View style={styles.microCell}>
                        <Text style={styles.microLabel}>RADIO INTERCOM</Text>
                        <View style={styles.microValRow}>
                          <Radio size={12} color={colors.primaryNavy} />
                          <Text style={styles.microMonoValue}>{login.radioChannel}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Card Actions */}
                    <View style={styles.cardActionsRow}>
                      <TouchableOpacity 
                        style={styles.actionCallBtn}
                        onPress={() => handleCall(login.guardName, login.phone)}
                      >
                        <Phone size={14} color={colors.primaryNavy} />
                        <Text style={styles.actionCallBtnText}>Call</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.actionRadioBtn}
                        onPress={() => handleRadioPing(login.guardName, login.radioChannel)}
                      >
                        <Radio size={14} color={colors.primaryNavy} />
                        <Text style={styles.actionRadioBtnText}>Radio Ping</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.actionDetailBtn}
                        onPress={() => handleViewDetails(
                          `Terminal Session: ${login.guardName}`,
                          `Staff ID: ${login.staffId}\nPost: ${login.postName}\nDevice: ${login.device}\nIP Address: ${login.ipAddress}\nLogin: ${login.loginTime} (Duration: ${login.sessionDuration})\nBattery: ${login.battery}\nRadio: ${login.radioChannel}`
                        )}
                      >
                        <Eye size={14} color={colors.electricBlue} />
                        <Text style={styles.actionDetailBtnText}>Audit</Text>
                      </TouchableOpacity>
                    </View>
                  </Card>
                </View>
              ))}
            </View>
          ) : (
            /* Table View for Logins */
            <Card style={styles.tableCardContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.tableHorizontalScroll}>
                <View style={[styles.tableWrapper, { minWidth: 960 }]}>
                  {/* Table Header Row */}
                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.thCell, { width: 220 }]}>GUARD / OFFICER</Text>
                    <Text style={[styles.thCell, { width: 170 }]}>ASSIGNED POST</Text>
                    <Text style={[styles.thCell, { width: 180 }]}>DEVICE & IP</Text>
                    <Text style={[styles.thCell, { width: 140 }]}>LOGIN TIME</Text>
                    <Text style={[styles.thCell, { width: 110 }]}>CHANNEL</Text>
                    <Text style={[styles.thCell, { width: 110 }]}>STATUS</Text>
                    <Text style={[styles.thCell, { width: 130, textAlign: 'right' }]}>ACTIONS</Text>
                  </View>

                  {/* Table Body Rows */}
                  {filteredLogins.map((login, idx) => (
                    <View 
                      key={login.id} 
                      style={[styles.tableRow, idx % 2 === 1 && styles.tableRowAlt]}
                    >
                      {/* Officer & ID */}
                      <View style={[styles.tbCell, { width: 220, flexDirection: 'row', alignItems: 'center' }]}>
                        <View style={styles.tbAvatar}>
                          <UserCheck size={16} color={colors.electricBlue} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.tbMainText}>{login.guardName}</Text>
                          <Text style={styles.tbSubMono}>{login.staffId} • {login.role}</Text>
                        </View>
                      </View>

                      {/* Post */}
                      <View style={[styles.tbCell, { width: 170 }]}>
                        <Text style={styles.tbMainText}>{login.postName}</Text>
                        <Text style={styles.tbSubText}>Shift Morning</Text>
                      </View>

                      {/* Device & IP */}
                      <View style={[styles.tbCell, { width: 180 }]}>
                        <Text style={styles.tbMainText} numberOfLines={1}>{login.device}</Text>
                        <Text style={styles.tbSubMono}>{login.ipAddress} • {login.battery}</Text>
                      </View>

                      {/* Login Time */}
                      <View style={[styles.tbCell, { width: 140 }]}>
                        <Text style={styles.tbMonoText}>{login.loginTime}</Text>
                        <Text style={styles.tbSubText}>{login.sessionDuration} active</Text>
                      </View>

                      {/* Channel */}
                      <View style={[styles.tbCell, { width: 110 }]}>
                        <Text style={styles.tbMonoText}>{login.radioChannel}</Text>
                        <Text style={styles.tbSubText}>Priority Band</Text>
                      </View>

                      {/* Status */}
                      <View style={[styles.tbCell, { width: 110 }]}>
                        {renderStatusBadge(login.status)}
                      </View>

                      {/* Action Buttons */}
                      <View style={[styles.tbCell, { width: 130, flexDirection: 'row', justifyContent: 'flex-end', gap: 6 }]}>
                        <TouchableOpacity 
                          style={styles.tbIconBtn} 
                          onPress={() => handleCall(login.guardName, login.phone)}
                        >
                          <Phone size={13} color={colors.primaryNavy} />
                        </TouchableOpacity>

                        <TouchableOpacity 
                          style={styles.tbIconBtn} 
                          onPress={() => handleRadioPing(login.guardName, login.radioChannel)}
                        >
                          <Radio size={13} color={colors.primaryNavy} />
                        </TouchableOpacity>

                        <TouchableOpacity 
                          style={[styles.tbIconBtn, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]} 
                          onPress={() => handleViewDetails(
                            `Officer Session: ${login.guardName}`,
                            `Staff ID: ${login.staffId}\nPost: ${login.postName}\nDevice: ${login.device}\nIP: ${login.ipAddress}\nLogin: ${login.loginTime}`
                          )}
                        >
                          <Eye size={13} color={colors.electricBlue} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </Card>
          )
        )}

        {/* =============================================================== */}
        {/* 2. VEHICLES TAB */}
        {/* =============================================================== */}
        {activeTab === 'vehicles' && (
          viewMode === 'cards' ? (
            /* Cards View for Vehicles */
            <View style={[styles.cardsGrid, isDesktop && styles.cardsGridDesktop]}>
              {filteredVehicles.map(vehicle => (
                <View 
                  key={vehicle.id} 
                  style={[
                    styles.cardColumn, 
                    isWide ? styles.cardColWide : isDesktop ? styles.cardColDesktop : styles.cardColMobile
                  ]}
                >
                  <Card style={[styles.dataCard, vehicle.status === 'overstay' && styles.overstayBorder]}>
                    {/* Header Row */}
                    <View style={styles.cardHeaderRow}>
                      <View style={[
                        styles.cardAvatarBox, 
                        { backgroundColor: vehicle.status === 'overstay' ? colors.dangerBg : 'rgba(37, 99, 235, 0.12)' }
                      ]}>
                        {vehicle.category === 'Delivery' ? (
                          <Truck size={20} color={vehicle.status === 'overstay' ? colors.danger : colors.electricBlue} />
                        ) : (
                          <Car size={20} color={vehicle.status === 'overstay' ? colors.danger : colors.electricBlue} />
                        )}
                      </View>
                      
                      <View style={styles.cardHeaderInfo}>
                        <View style={styles.plateRow}>
                          <Text style={styles.cardPlateNumber}>{vehicle.plateNumber}</Text>
                          <View style={styles.categoryBadge}>
                            <Text style={styles.categoryBadgeText}>{vehicle.category}</Text>
                          </View>
                        </View>
                        <Text style={styles.cardSubText} numberOfLines={1}>{vehicle.vehicleType}</Text>
                      </View>

                      <View style={styles.badgeWrapper}>
                        {renderStatusBadge(vehicle.status)}
                      </View>
                    </View>

                    {/* Destination & Host */}
                    <View style={styles.detailHighlightRow}>
                      <MapPin size={14} color={colors.primaryNavy} />
                      <Text style={styles.detailHighlightText}>{vehicle.unitOrDestination}</Text>
                      <Text style={styles.detailHighlightSub}>• {vehicle.driverOrResident}</Text>
                    </View>

                    {/* Micro Grid */}
                    <View style={styles.microGrid}>
                      <View style={styles.microCell}>
                        <Text style={styles.microLabel}>ENTRY GATE & TIME</Text>
                        <Text style={styles.microValue}>{vehicle.entryGate}</Text>
                        <Text style={styles.microMonoValue}>{vehicle.entryTime}</Text>
                      </View>

                      <View style={styles.microCell}>
                        <Text style={styles.microLabel}>DURATION & PARKING</Text>
                        <Text style={[styles.microValue, vehicle.status === 'overstay' && { color: colors.danger, fontWeight: '800' }]}>
                          {vehicle.durationInside}
                        </Text>
                        <Text style={styles.microMonoValue}>{vehicle.parkingSlot}</Text>
                      </View>

                      <View style={styles.microCell}>
                        <Text style={styles.microLabel}>GATE PASS NUMBER</Text>
                        <Text style={styles.microMonoValue}>{vehicle.passNumber}</Text>
                        <Text style={styles.microSubText}>Verified by {vehicle.guardOnDuty}</Text>
                      </View>

                      <View style={styles.microCell}>
                        <Text style={styles.microLabel}>EXIT GATE</Text>
                        <Text style={styles.microValue}>{vehicle.exitTime}</Text>
                        <Text style={styles.microSubText}>{vehicle.exitGate}</Text>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.cardActionsRow}>
                      <TouchableOpacity 
                        style={styles.actionCallBtn}
                        onPress={() => handleCall(vehicle.driverOrResident, vehicle.phone)}
                      >
                        <Phone size={14} color={colors.primaryNavy} />
                        <Text style={styles.actionCallBtnText}>Call Driver</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.actionDetailBtn}
                        onPress={() => handleViewDetails(
                          `Vehicle Pass: ${vehicle.plateNumber}`,
                          `Pass No: ${vehicle.passNumber}\nCategory: ${vehicle.category}\nType: ${vehicle.vehicleType}\nDriver: ${vehicle.driverOrResident}\nUnit: ${vehicle.unitOrDestination}\nEntry: ${vehicle.entryTime} at ${vehicle.entryGate}\nDuration: ${vehicle.durationInside}\nSlot: ${vehicle.parkingSlot}\nVerified By: ${vehicle.guardOnDuty}`
                        )}
                      >
                        <Eye size={14} color={colors.electricBlue} />
                        <Text style={styles.actionDetailBtnText}>Pass Slip</Text>
                      </TouchableOpacity>

                      {vehicle.status === 'overstay' && (
                        <TouchableOpacity 
                          style={styles.actionAlertBtn}
                          onPress={() => Alert.alert('Overstay Dispatch', `Alerting roving patrol to check ${vehicle.parkingSlot} for vehicle ${vehicle.plateNumber}.`)}
                        >
                          <ShieldAlert size={14} color={colors.white} />
                          <Text style={styles.actionAlertBtnText}>Overstay Alert</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </Card>
                </View>
              ))}
            </View>
          ) : (
            /* Table View for Vehicles */
            <Card style={styles.tableCardContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.tableHorizontalScroll}>
                <View style={[styles.tableWrapper, { minWidth: 1050 }]}>
                  {/* Table Header Row */}
                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.thCell, { width: 170 }]}>PLATE & PASS</Text>
                    <Text style={[styles.thCell, { width: 130 }]}>CATEGORY / TYPE</Text>
                    <Text style={[styles.thCell, { width: 210 }]}>DESTINATION & DRIVER</Text>
                    <Text style={[styles.thCell, { width: 140 }]}>ENTRY GATE & TIME</Text>
                    <Text style={[styles.thCell, { width: 130 }]}>DURATION INSIDE</Text>
                    <Text style={[styles.thCell, { width: 130 }]}>PARKING SLOT</Text>
                    <Text style={[styles.thCell, { width: 110 }]}>STATUS</Text>
                    <Text style={[styles.thCell, { width: 110, textAlign: 'right' }]}>ACTIONS</Text>
                  </View>

                  {/* Table Body Rows */}
                  {filteredVehicles.map((vehicle, idx) => (
                    <View 
                      key={vehicle.id} 
                      style={[
                        styles.tableRow, 
                        idx % 2 === 1 && styles.tableRowAlt,
                        vehicle.status === 'overstay' && { backgroundColor: 'rgba(225, 29, 72, 0.05)' }
                      ]}
                    >
                      {/* Plate & Pass */}
                      <View style={[styles.tbCell, { width: 170 }]}>
                        <Text style={styles.tbPlateMono}>{vehicle.plateNumber}</Text>
                        <Text style={styles.tbSubMono}>{vehicle.passNumber}</Text>
                      </View>

                      {/* Category & Type */}
                      <View style={[styles.tbCell, { width: 130 }]}>
                        <View style={styles.categoryBadge}>
                          <Text style={styles.categoryBadgeText}>{vehicle.category}</Text>
                        </View>
                        <Text style={styles.tbSubText} numberOfLines={1}>{vehicle.vehicleType}</Text>
                      </View>

                      {/* Destination & Driver */}
                      <View style={[styles.tbCell, { width: 210 }]}>
                        <Text style={styles.tbMainText}>{vehicle.unitOrDestination}</Text>
                        <Text style={styles.tbSubText} numberOfLines={1}>{vehicle.driverOrResident}</Text>
                      </View>

                      {/* Entry Gate & Time */}
                      <View style={[styles.tbCell, { width: 140 }]}>
                        <Text style={styles.tbMonoText}>{vehicle.entryTime}</Text>
                        <Text style={styles.tbSubText}>{vehicle.entryGate}</Text>
                      </View>

                      {/* Duration Inside */}
                      <View style={[styles.tbCell, { width: 130 }]}>
                        <Text style={[
                          styles.tbMonoText, 
                          vehicle.status === 'overstay' && { color: colors.danger, fontWeight: '800' }
                        ]}>
                          {vehicle.durationInside}
                        </Text>
                        <Text style={styles.tbSubText}>Exit: {vehicle.exitTime}</Text>
                      </View>

                      {/* Parking Slot */}
                      <View style={[styles.tbCell, { width: 130 }]}>
                        <Text style={styles.tbMainText}>{vehicle.parkingSlot}</Text>
                        <Text style={styles.tbSubText}>Guard: {vehicle.guardOnDuty}</Text>
                      </View>

                      {/* Status Badge */}
                      <View style={[styles.tbCell, { width: 110 }]}>
                        {renderStatusBadge(vehicle.status)}
                      </View>

                      {/* Action Buttons */}
                      <View style={[styles.tbCell, { width: 110, flexDirection: 'row', justifyContent: 'flex-end', gap: 6 }]}>
                        <TouchableOpacity 
                          style={styles.tbIconBtn} 
                          onPress={() => handleCall(vehicle.driverOrResident, vehicle.phone)}
                        >
                          <Phone size={13} color={colors.primaryNavy} />
                        </TouchableOpacity>

                        <TouchableOpacity 
                          style={[styles.tbIconBtn, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]} 
                          onPress={() => handleViewDetails(
                            `Vehicle Record: ${vehicle.plateNumber}`,
                            `Pass: ${vehicle.passNumber}\nUnit: ${vehicle.unitOrDestination}\nDriver: ${vehicle.driverOrResident} (${vehicle.phone})\nSlot: ${vehicle.parkingSlot}`
                          )}
                        >
                          <Eye size={13} color={colors.electricBlue} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </Card>
          )
        )}

        {/* =============================================================== */}
        {/* 3. EMPLOYEES TAB */}
        {/* =============================================================== */}
        {activeTab === 'employees' && (
          viewMode === 'cards' ? (
            /* Cards View for Employees */
            <View style={[styles.cardsGrid, isDesktop && styles.cardsGridDesktop]}>
              {filteredEmployees.map(emp => (
                <View 
                  key={emp.id} 
                  style={[
                    styles.cardColumn, 
                    isWide ? styles.cardColWide : isDesktop ? styles.cardColDesktop : styles.cardColMobile
                  ]}
                >
                  <Card style={styles.dataCard}>
                    {/* Header Row */}
                    <View style={styles.cardHeaderRow}>
                      <View style={[styles.cardAvatarBox, { backgroundColor: 'rgba(56, 164, 247, 0.15)' }]}>
                        <Users size={20} color={colors.primaryNavy} />
                      </View>
                      
                      <View style={styles.cardHeaderInfo}>
                        <Text style={styles.cardMainTitle} numberOfLines={1}>{emp.name}</Text>
                        <Text style={styles.cardMonoBadge} numberOfLines={1}>{emp.staffId} • {emp.role}</Text>
                      </View>

                      <View style={styles.badgeWrapper}>
                        {renderStatusBadge(emp.status)}
                      </View>
                    </View>

                    {/* Zone Highlight */}
                    <View style={styles.detailHighlightRow}>
                      <MapPin size={14} color={colors.primaryNavy} />
                      <Text style={styles.detailHighlightText}>{emp.assignedZone}</Text>
                    </View>

                    {/* Micro Grid */}
                    <View style={styles.microGrid}>
                      <View style={styles.microCell}>
                        <Text style={styles.microLabel}>SHIFT TIMINGS</Text>
                        <Text style={styles.microValue}>{emp.shift}</Text>
                        <Text style={styles.microSubText}>{emp.attendance}</Text>
                      </View>

                      <View style={styles.microCell}>
                        <Text style={styles.microLabel}>RADIO & BODYCAM</Text>
                        <Text style={styles.microMonoValue}>{emp.radioChannel}</Text>
                        <Text style={styles.microSubText}>{emp.bodyCam}</Text>
                      </View>

                      <View style={styles.microCell}>
                        <Text style={styles.microLabel}>CONTACT PHONE</Text>
                        <Text style={styles.microMonoValue}>{emp.phone}</Text>
                        <Text style={styles.microSubText}>ICE: {emp.emergencyContact}</Text>
                      </View>

                      <View style={styles.microCell}>
                        <Text style={styles.microLabel}>DUTY STATUS</Text>
                        <Text style={styles.microValue}>Active on Post</Text>
                        <Text style={styles.microSubText}>GPS verified</Text>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.cardActionsRow}>
                      <TouchableOpacity 
                        style={styles.actionCallBtn}
                        onPress={() => handleCall(emp.name, emp.phone)}
                      >
                        <Phone size={14} color={colors.primaryNavy} />
                        <Text style={styles.actionCallBtnText}>Call Guard</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.actionRadioBtn}
                        onPress={() => handleRadioPing(emp.name, emp.radioChannel)}
                      >
                        <Radio size={14} color={colors.primaryNavy} />
                        <Text style={styles.actionRadioBtnText}>Radio Intercom</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.actionDetailBtn}
                        onPress={() => handleViewDetails(
                          `Staff Profile: ${emp.name}`,
                          `Staff ID: ${emp.staffId}\nRole: ${emp.role}\nAssigned Zone: ${emp.assignedZone}\nShift: ${emp.shift}\nAttendance: ${emp.attendance}\nRadio: ${emp.radioChannel}\nBodyCam: ${emp.bodyCam}\nPhone: ${emp.phone}\nEmergency ICE: ${emp.emergencyContact}`
                        )}
                      >
                        <Eye size={14} color={colors.electricBlue} />
                        <Text style={styles.actionDetailBtnText}>Profile</Text>
                      </TouchableOpacity>
                    </View>
                  </Card>
                </View>
              ))}
            </View>
          ) : (
            /* Table View for Employees */
            <Card style={styles.tableCardContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.tableHorizontalScroll}>
                <View style={[styles.tableWrapper, { minWidth: 1000 }]}>
                  {/* Table Header Row */}
                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.thCell, { width: 220 }]}>OFFICER & STAFF ID</Text>
                    <Text style={[styles.thCell, { width: 170 }]}>ROLE & DESIGNATION</Text>
                    <Text style={[styles.thCell, { width: 200 }]}>ASSIGNED ZONE / POST</Text>
                    <Text style={[styles.thCell, { width: 160 }]}>SHIFT & ATTENDANCE</Text>
                    <Text style={[styles.thCell, { width: 120 }]}>RADIO & CAM</Text>
                    <Text style={[styles.thCell, { width: 110 }]}>STATUS</Text>
                    <Text style={[styles.thCell, { width: 120, textAlign: 'right' }]}>ACTIONS</Text>
                  </View>

                  {/* Table Body Rows */}
                  {filteredEmployees.map((emp, idx) => (
                    <View 
                      key={emp.id} 
                      style={[styles.tableRow, idx % 2 === 1 && styles.tableRowAlt]}
                    >
                      {/* Name & ID */}
                      <View style={[styles.tbCell, { width: 220, flexDirection: 'row', alignItems: 'center' }]}>
                        <View style={[styles.tbAvatar, { backgroundColor: 'rgba(56, 164, 247, 0.15)' }]}>
                          <Users size={16} color={colors.primaryNavy} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.tbMainText}>{emp.name}</Text>
                          <Text style={styles.tbSubMono}>{emp.staffId} • {emp.phone}</Text>
                        </View>
                      </View>

                      {/* Role */}
                      <View style={[styles.tbCell, { width: 170 }]}>
                        <Text style={styles.tbMainText}>{emp.role}</Text>
                        <Text style={styles.tbSubText}>Security Dept</Text>
                      </View>

                      {/* Zone */}
                      <View style={[styles.tbCell, { width: 200 }]}>
                        <Text style={styles.tbMainText}>{emp.assignedZone}</Text>
                        <Text style={styles.tbSubText}>Manning checkpoint</Text>
                      </View>

                      {/* Shift & Attendance */}
                      <View style={[styles.tbCell, { width: 160 }]}>
                        <Text style={styles.tbMainText}>{emp.shift}</Text>
                        <Text style={styles.tbSubText}>{emp.attendance}</Text>
                      </View>

                      {/* Radio & BodyCam */}
                      <View style={[styles.tbCell, { width: 120 }]}>
                        <Text style={styles.tbMonoText}>{emp.radioChannel}</Text>
                        <Text style={styles.tbSubText}>{emp.bodyCam}</Text>
                      </View>

                      {/* Status */}
                      <View style={[styles.tbCell, { width: 110 }]}>
                        {renderStatusBadge(emp.status)}
                      </View>

                      {/* Actions */}
                      <View style={[styles.tbCell, { width: 120, flexDirection: 'row', justifyContent: 'flex-end', gap: 6 }]}>
                        <TouchableOpacity 
                          style={styles.tbIconBtn} 
                          onPress={() => handleCall(emp.name, emp.phone)}
                        >
                          <Phone size={13} color={colors.primaryNavy} />
                        </TouchableOpacity>

                        <TouchableOpacity 
                          style={styles.tbIconBtn} 
                          onPress={() => handleRadioPing(emp.name, emp.radioChannel)}
                        >
                          <Radio size={13} color={colors.primaryNavy} />
                        </TouchableOpacity>

                        <TouchableOpacity 
                          style={[styles.tbIconBtn, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]} 
                          onPress={() => handleViewDetails(
                            `Staff Details: ${emp.name}`,
                            `Staff ID: ${emp.staffId}\nRole: ${emp.role}\nZone: ${emp.assignedZone}\nShift: ${emp.shift}\nAttendance: ${emp.attendance}\nPhone: ${emp.phone}`
                          )}
                        >
                          <Eye size={13} color={colors.electricBlue} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </Card>
          )
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Header
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.95)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 4px 20px -4px rgba(37, 99, 235, 0.08)',
      } as any,
    }),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    marginRight: 8,
  },
  backBtn: {
    padding: 6,
    marginRight: 4,
    flexShrink: 0,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    flexShrink: 0,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 9,
  },
  headerTitleGroup: {
    flex: 1,
    minWidth: 0,
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryNavy,
  },
  supervisorPill: {
    backgroundColor: 'rgba(37, 99, 235, 0.10)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.20)',
    flexShrink: 0,
  },
  supervisorPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.electricBlue,
    letterSpacing: 0.5,
  },
  subDutyText: {
    fontSize: 10,
    color: colors.secondaryText,
    marginTop: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  livePulseBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    flexShrink: 0,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  livePulseText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.success,
  },
  switchGateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.electricBlue,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 9,
    flexShrink: 0,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
      } as any,
    }),
  },
  switchGateBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
  },
  exitBtn: {
    padding: 7,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    flexShrink: 0,
  },

  // Main Scroll Content
  scrollContent: {
    padding: 12,
    paddingBottom: 40,
  },
  scrollContentDesktop: {
    padding: 24,
    maxWidth: 1440,
    alignSelf: 'center',
    width: '100%',
  },

  // KPI Metrics Grid
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  metricCard: {
    width: '48.6%',
    padding: 10,
    marginBottom: 0,
  },
  metricCardDesktop: {
    width: '23.8%',
    padding: 14,
  },
  metricCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiTag: {
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    flexShrink: 0,
  },
  kpiTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.electricBlue,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primaryNavy,
    marginBottom: 1,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryNavy,
  },
  metricSub: {
    fontSize: 10,
    color: colors.secondaryText,
    marginTop: 1,
  },

  // Control Dock Bar
  controlDock: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    padding: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 24px -6px rgba(37, 99, 235, 0.08)',
      } as any,
    }),
  },
  controlDockMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 8,
  },
  entityTabsScroll: {
    flexGrow: 0,
  },
  entityTabsScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 2,
  },
  entityTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: 'transparent',
    flexShrink: 0,
  },
  activeEntityTab: {
    backgroundColor: 'rgba(37, 99, 235, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.25)',
  },
  entityTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondaryText,
  },
  activeEntityTabText: {
    color: colors.electricBlue,
    fontWeight: '800',
  },
  countBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  activeCountBadge: {
    backgroundColor: colors.electricBlue,
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.secondaryText,
  },
  activeCountBadgeText: {
    color: colors.white,
  },
  viewModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(241, 245, 249, 0.8)',
    borderRadius: 11,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    flexShrink: 0,
  },
  viewModeContainerMobile: {
    width: '100%',
  },
  viewModeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9,
  },
  viewModeBtnMobile: {
    flex: 1,
  },
  activeViewModeBtn: {
    backgroundColor: colors.electricBlue,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
      } as any,
    }),
  },
  viewModeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondaryText,
  },
  activeViewModeBtnText: {
    color: colors.white,
    fontWeight: '700',
  },
  badgeWrapper: {
    flexShrink: 0,
  },

  // Toolbar (Search & Filter)
  toolbarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  searchBarWrapper: {
    flex: 1,
    minWidth: 260,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(37, 99, 235, 0.05)',
      } as any,
    }),
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.primaryNavy,
    paddingVertical: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      } as any,
    }),
  },
  clearBtn: {
    padding: 4,
  },
  filterPillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
  },
  activeFilterPill: {
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    borderColor: colors.electricBlue,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondaryText,
  },
  activeFilterPillText: {
    color: colors.electricBlue,
    fontWeight: '700',
  },

  // Cards View Layout
  cardsGrid: {
    flexDirection: 'column',
    gap: 14,
  },
  cardsGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  cardColumn: {
    width: '100%',
  },
  cardColMobile: {
    width: '100%',
  },
  cardColDesktop: {
    width: '48.8%',
  },
  cardColWide: {
    width: '32.1%',
  },
  dataCard: {
    padding: 16,
    marginBottom: 0,
  },
  overstayBorder: {
    borderColor: colors.danger,
    borderWidth: 1.5,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardAvatarBox: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
  },
  cardHeaderInfo: {
    flex: 1,
    minWidth: 0,
    marginRight: 8,
  },
  cardMainTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryNavy,
  },
  cardMonoBadge: {
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: colors.secondaryText,
    marginTop: 2,
  },
  cardPlateNumber: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: colors.primaryNavy,
    letterSpacing: 0.5,
  },
  plateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardSubText: {
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 2,
  },
  categoryBadge: {
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.electricBlue,
  },

  // Highlight Box
  detailHighlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 9,
    marginVertical: 10,
  },
  detailHighlightText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryNavy,
  },
  detailHighlightSub: {
    fontSize: 12,
    color: colors.secondaryText,
  },

  // Micro Grid in Cards
  microGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  microCell: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  microLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.secondaryText,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  microValRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  microValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryNavy,
  },
  microMonoValue: {
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: '600',
    color: colors.primaryNavy,
  },
  microSubText: {
    fontSize: 10,
    color: colors.secondaryText,
    marginTop: 1,
  },

  // Card Actions Footer
  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 232, 240, 0.6)',
    paddingTop: 12,
  },
  actionCallBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 7,
    borderRadius: 9,
  },
  actionCallBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryNavy,
  },
  actionRadioBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 7,
    borderRadius: 9,
  },
  actionRadioBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryNavy,
  },
  actionDetailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: 'rgba(37, 99, 235, 0.10)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.20)',
  },
  actionDetailBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.electricBlue,
  },
  actionAlertBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: colors.danger,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 9,
  },
  actionAlertBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
  },

  // Table View Layout
  tableCardContainer: {
    padding: 0,
    overflow: 'hidden',
  },
  tableHorizontalScroll: {
    width: '100%',
  },
  tableWrapper: {
    width: '100%',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(241, 245, 249, 0.85)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  thCell: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.secondaryText,
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.5)',
  },
  tableRowAlt: {
    backgroundColor: 'rgba(248, 250, 252, 0.4)',
  },
  tbCell: {
    justifyContent: 'center',
  },
  tbAvatar: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  tbMainText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryNavy,
  },
  tbSubText: {
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 1,
  },
  tbSubMono: {
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: colors.secondaryText,
    marginTop: 1,
  },
  tbMonoText: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: '700',
    color: colors.primaryNavy,
  },
  tbPlateMono: {
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: '800',
    color: colors.primaryNavy,
  },
  tbIconBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Status Badge
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});
