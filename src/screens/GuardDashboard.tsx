import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Modal, 
  TextInput, 
  Alert,
  Image,
  StatusBar
} from 'react-native';
import { 
  Shield, 
  KeyRound, 
  QrCode, 
  UserPlus, 
  Car, 
  Package, 
  CircleCheck, 
  TriangleAlert, 
  Clock, 
  LogOut, 
  Search, 
  X, 
  Check, 
  Send, 
  SlidersHorizontal, 
  Camera, 
  Building, 
  User, 
  ChevronLeft, 
  Users, 
  ScanLine 
} from 'lucide-react-native';

type ScreenTab = 'otp' | 'visitors';
type EntryType = 'visitor' | 'delivery';
type QueueFilter = 'pending' | 'in' | 'out';

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
  { name: 'Swiggy', color: '#FC8019', bg: '#FFF7ED', border: '#FDBA74' },
  { name: 'Zomato', color: '#E23744', bg: '#FEF2F2', border: '#FCA5A5' },
  { name: 'Amazon', color: '#D97706', bg: '#FEF3C7', border: '#FCD34D' },
  { name: 'Flipkart', color: '#2563EB', bg: '#EFF6FF', border: '#93C5FD' },
  { name: 'Blinkit', color: '#CA8A04', bg: '#FEF9C3', border: '#FDE047' },
  { name: 'Zepto', color: '#7C3AED', bg: '#F5F3FF', border: '#C4B5FD' },
  { name: 'Uber Eats', color: '#059669', bg: '#ECFDF5', border: '#6EE7B7' },
  { name: 'Blue Dart', color: '#1E40AF', bg: '#EEF2FF', border: '#A5B4FC' },
  { name: 'Other', color: '#475569', bg: '#F1F5F9', border: '#CBD5E1' },
];

let globalId = 8000;
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
    residentApproved: true,
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
    residentApproved: false,
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

export const GuardDashboard: React.FC<{ navigation?: any }> = ({ navigation }) => {
  // Navigation: 1st Screen = OTP, Next Screen = Visitors & Vehicles
  const [currentScreen, setCurrentScreen] = useState<ScreenTab>('otp');

  // Guard Shift / Duty Login & Live Duration State
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [shiftStartTime, setShiftStartTime] = useState<Date>(() => {
    const d = new Date();
    d.setHours(d.getHours() - 2);
    d.setMinutes(d.getMinutes() - 45);
    return d;
  });
  const [shiftDurationSeconds, setShiftDurationSeconds] = useState(2 * 3600 + 45 * 60);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Live duration ticker
  useEffect(() => {
    if (!isOnDuty) return;
    const timer = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, Math.floor((now.getTime() - shiftStartTime.getTime()) / 1000));
      setShiftDurationSeconds(diff);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOnDuty, shiftStartTime]);

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  };

  const handleStartDuty = () => {
    const now = new Date();
    setShiftStartTime(now);
    setShiftDurationSeconds(0);
    setIsOnDuty(true);
    Alert.alert('Shift Logged In', 'Guard is now ON DUTY. Live shift duration timer is running.');
  };

  const handleConfirmLogout = () => {
    setLogoutModalOpen(false);
    setIsOnDuty(false);
    if (navigation?.navigate) {
      navigation.navigate('Login');
    }
  };

  // Shared Entry Records & Queue Filter for Screen 2
  const [entries, setEntries] = useState<VisitorEntry[]>(INITIAL_RECORDS);
  const [activeQueue, setActiveQueue] = useState<QueueFilter>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // ---------------------------------------------------------------------------
  // FIRST SCREEN: OTP STATE & ACTIONS
  // ---------------------------------------------------------------------------
  const [otpDigits, setOtpDigits] = useState('');
  const [validatedPass, setValidatedPass] = useState<{
    code: string;
    flat: string;
    resident: string;
    guest: string;
  } | null>(null);
  const [scanModalOpen, setScanModalOpen] = useState(false);

  // Dialpad input for OTP
  const handleKeypadPress = (val: string) => {
    if (otpDigits.length < 6) {
      const next = otpDigits + val;
      setOtpDigits(next);
      if (next.length === 6) {
        // Auto-validate once 6 digits are typed
        triggerValidation(next);
      }
    }
  };

  const handleBackspace = () => {
    setOtpDigits(prev => prev.slice(0, -1));
    setValidatedPass(null);
  };

  const triggerValidation = (code: string) => {
    setValidatedPass({
      code,
      flat: 'Block A • 1st Floor • Flat 104',
      resident: 'Dr. Rajesh Sharma',
      guest: 'Pre-Approved Guest Invite (Bee Property Pass)'
    });
  };

  const handleOtpSubmit = () => {
    if (!otpDigits.trim()) {
      Alert.alert('Required', 'Please enter 6-digit resident OTP.');
      return;
    }
    if (otpDigits.length < 6) {
      Alert.alert('Incomplete Code', 'Please enter all 6 digits of the OTP.');
      return;
    }
    triggerValidation(otpDigits);
  };

  const handleAllowOtpEntry = () => {
    if (!validatedPass) return;
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
      residentName: validatedPass.resident,
      status: 'in',
      requestedAt: timeStr,
      entryTime: timeStr,
      residentApproved: true,
    };

    setEntries(prev => [newEntry, ...prev]);
    setValidatedPass(null);
    setOtpDigits('');
    Alert.alert('Entry Permitted', 'Guest has been allowed entry inside Bee Property.', [
      { text: 'View Inside Log', onPress: () => { setCurrentScreen('visitors'); setActiveQueue('in'); } },
      { text: 'OK' }
    ]);
  };

  // ---------------------------------------------------------------------------
  // NEXT PAGE: VISITOR & VEHICLE MODALS
  // ---------------------------------------------------------------------------
  const [visitorModalOpen, setVisitorModalOpen] = useState(false);
  const [entryKind, setEntryKind] = useState<EntryType>('visitor');
  const [selectedCompany, setSelectedCompany] = useState('Swiggy');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('Block A');
  const [selectedFloor, setSelectedFloor] = useState('1st Floor');
  const [selectedFlat, setSelectedFlat] = useState('104');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [vehPlate, setVehPlate] = useState('');
  const [serviceOption, setServiceOption] = useState<'RWA' | 'Admin'>('RWA');
  const [vehLocation, setVehLocation] = useState('');

  // Supervisor Shift Drawer & SOS
  const [supervisorModalOpen, setSupervisorModalOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const openVisitorModal = (kind: EntryType) => {
    setEntryKind(kind);
    setVisitorName(kind === 'delivery' ? 'Swiggy Executive' : '');
    setVisitorPhone('');
    setVehicleNumber('');
    setCapturedPhoto(null);
    setVisitorModalOpen(true);
  };

  const handleSnapPhoto = () => {
    const sampleAvatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60',
    ];
    setCapturedPhoto(sampleAvatars[Math.floor(Math.random() * sampleAvatars.length)]);
  };

  const handleSendRequestToResident = () => {
    if (!visitorName.trim()) {
      Alert.alert('Required', 'Please enter person or rider name.');
      return;
    }

    const mapped = FLATS_MAP[selectedFlat] || { resident: 'Resident', phone: '' };
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newReqId = nextId();
    const newReq: VisitorEntry = {
      id: newReqId,
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
      residentApproved: false,
    };

    setEntries(prev => [newReq, ...prev]);
    setVisitorModalOpen(false);
    setActiveQueue('pending');

    setTimeout(() => {
      setEntries(prev => prev.map(item => item.id === newReqId ? { ...item, residentApproved: true } : item));
    }, 2800);
  };

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

  const handleAddVehicle = () => {
    if (!vehPlate.trim()) {
      Alert.alert('Required', 'Please enter vehicle registration number.');
      return;
    }
    if (!vehLocation.trim()) {
      Alert.alert('Required', 'Please enter service location.');
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newVehicleEntry: VisitorEntry = {
      id: nextId(),
      name: `Service Vehicle (${vehPlate.toUpperCase()})`,
      type: 'visitor',
      company: serviceOption,
      apartmentName: APARTMENT_NAME,
      block: `${serviceOption} Service`,
      floor: 'Society Ground',
      flat: vehLocation.trim(),
      residentName: `${serviceOption} Authority`,
      vehicleNo: vehPlate.toUpperCase(),
      status: 'in',
      requestedAt: timeStr,
      entryTime: timeStr,
      residentApproved: true,
    };

    setEntries(prev => [newVehicleEntry, ...prev]);
    setVehicleModalOpen(false);
    setVehPlate('');
    setVehLocation('');
    setActiveQueue('in');
  };

  const pendingCount = entries.filter(e => e.status === 'pending').length;
  const inCount = entries.filter(e => e.status === 'in').length;
  const outCount = entries.filter(e => e.status === 'out').length;

  const filteredList = entries.filter(item => {
    if (item.status !== activeQueue) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.flat.toLowerCase().includes(q) ||
      (item.vehicleNo && item.vehicleNo.toLowerCase().includes(q)) ||
      (item.company && item.company.toLowerCase().includes(q))
    );
  });

  const selectedResident = FLATS_MAP[selectedFlat] || { resident: 'Resident', phone: '' };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* =========================================================================
          CLASSIC CLEAR HEADER: ONLY BEE PROPERTY & RIGHT SIDE ICONS
         ========================================================================= */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {currentScreen === 'visitors' && (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setCurrentScreen('otp')}
              activeOpacity={0.7}
            >
              <ChevronLeft size={22} color="#1E3A8A" strokeWidth={2} />
            </TouchableOpacity>
          )}
          <View style={styles.logoBadge}>
            <Shield size={20} color="#2563EB" strokeWidth={1.75} />
          </View>
          <Text style={styles.headerTitle}>Bee Property</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.classicIconButton} 
            onPress={() => setSosModalOpen(true)}
            activeOpacity={0.7}
            accessibilityLabel="Emergency SOS"
          >
            <TriangleAlert size={19} color="#DC2626" strokeWidth={1.75} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.classicIconButton} 
            onPress={() => setSupervisorModalOpen(true)}
            activeOpacity={0.7}
            accessibilityLabel="Supervisor Logs"
          >
            <SlidersHorizontal size={19} color="#1E3A8A" strokeWidth={1.75} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.classicIconButton, styles.logoutHeaderBtn]} 
            onPress={() => setLogoutModalOpen(true)}
            activeOpacity={0.7}
            accessibilityLabel="Log Out"
          >
            <LogOut size={18} color="#EF4444" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>



      {/* =========================================================================
          FIRST SCREEN: NO OVERVIEW • DIRECT OTP & SMALL SCAN & SUBMIT
         ========================================================================= */}
      {currentScreen === 'otp' && (
        <ScrollView 
          style={styles.mainScrollView} 
          contentContainerStyle={styles.otpScreenContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Main OTP Input Card */}
          <View style={styles.otpMainCard}>
            <View style={styles.otpHeaderBox}>
              <View style={styles.keyIconBadge}>
                <KeyRound size={22} color="#2563EB" strokeWidth={1.75} />
              </View>
              <Text style={styles.otpHeading}>Enter 6-Digit OTP</Text>
              <Text style={styles.otpSubtitle}>Resident invite pass from Bee Property app</Text>
            </View>

            {/* 6 Digit Display Boxes */}
            <View style={styles.otpBoxRow}>
              {[0, 1, 2, 3, 4, 5].map(idx => (
                <View 
                  key={idx} 
                  style={[
                    styles.otpBoxCell,
                    otpDigits.length === idx && styles.otpBoxCellActive,
                    otpDigits.length > idx && styles.otpBoxCellFilled
                  ]}
                >
                  <Text style={styles.otpBoxCellText}>
                    {otpDigits[idx] ? otpDigits[idx] : ''}
                  </Text>
                </View>
              ))}
            </View>

            {/* Small Scan Button & Submit Button Row */}
            <View style={styles.otpActionControlsRow}>
              {/* Small Scan Button */}
              <TouchableOpacity 
                style={styles.smallScanButton}
                onPress={() => setScanModalOpen(true)}
                activeOpacity={0.8}
              >
                <QrCode size={16} color="#2563EB" strokeWidth={1.75} />
                <Text style={styles.smallScanButtonText}>Scan</Text>
              </TouchableOpacity>

              {/* Submit Button */}
              <TouchableOpacity 
                style={styles.submitOtpButton}
                onPress={handleOtpSubmit}
                activeOpacity={0.85}
              >
                <Check size={18} color="#FFFFFF" strokeWidth={2.4} />
                <Text style={styles.submitOtpButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>

            {/* Validated Pass Card (If verified) */}
            {validatedPass && (
              <View style={styles.verifiedPassCard}>
                <View style={styles.verifiedPassHeader}>
                  <CircleCheck size={20} color="#059669" strokeWidth={2} />
                  <Text style={styles.verifiedPassTitle}>PRE-APPROVED PASS VERIFIED</Text>
                </View>
                <Text style={styles.verifiedPassFlat}>{validatedPass.flat}</Text>
                <Text style={styles.verifiedPassResident}>Resident: {validatedPass.resident}</Text>
                
                <TouchableOpacity 
                  style={styles.allowVerifiedBtn}
                  onPress={handleAllowOtpEntry}
                  activeOpacity={0.85}
                >
                  <Check size={18} color="#FFFFFF" strokeWidth={2.4} />
                  <Text style={styles.allowVerifiedBtnText}>ALLOW ENTRY NOW</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Direct Touch Keypad (Single-handed rapid touch for guards) */}
            <View style={styles.dialpadGrid}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                <TouchableOpacity 
                  key={num} 
                  style={styles.dialKey} 
                  onPress={() => handleKeypadPress(num)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dialKeyText}>{num}</Text>
                </TouchableOpacity>
              ))}
              
              {/* Demo Auto-fill Key */}
              <TouchableOpacity 
                style={[styles.dialKey, styles.dialKeySpecial]} 
                onPress={() => {
                  setOtpDigits('849210');
                  triggerValidation('849210');
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.dialKeySpecialText}>Demo</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.dialKey} 
                onPress={() => handleKeypadPress('0')}
                activeOpacity={0.7}
              >
                <Text style={styles.dialKeyText}>0</Text>
              </TouchableOpacity>

              {/* Backspace Delete Key */}
              <TouchableOpacity 
                style={[styles.dialKey, styles.dialKeySpecial]} 
                onPress={handleBackspace}
                activeOpacity={0.7}
              >
                <Text style={styles.dialKeyDeleteText}>⌫</Text>
              </TouchableOpacity>
            </View>
          </View>


        </ScrollView>
      )}

      {/* =========================================================================
          NEXT PAGE: VISITORS & VEHICLES (VERY SIMPLE UI)
         ========================================================================= */}
      {currentScreen === 'visitors' && (
        <ScrollView 
          style={styles.mainScrollView} 
          contentContainerStyle={styles.visitorsScreenContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Top 2 Simple Primary Action Buttons */}
          <View style={styles.simpleActionRow}>
            {/* 1. Add Visitor / Delivery */}
            <TouchableOpacity 
              style={styles.primaryVisitorCard} 
              onPress={() => openVisitorModal('visitor')}
              activeOpacity={0.85}
            >
              <View style={styles.primaryVisitorIconWrap}>
                <UserPlus size={22} color="#FFFFFF" strokeWidth={1.75} />
              </View>
              <Text style={styles.primaryVisitorTitle}>+ Add Visitor</Text>
              <Text style={styles.primaryVisitorSub}>Guest & Delivery</Text>
            </TouchableOpacity>

            {/* 2. Add Vehicle */}
            <TouchableOpacity 
              style={styles.secondaryVehicleCard} 
              onPress={() => { setVehPlate(''); setVehLocation(''); setServiceOption('RWA'); setVehicleModalOpen(true); }}
              activeOpacity={0.85}
            >
              <View style={styles.secondaryVehicleIconWrap}>
                <Car size={22} color="#059669" strokeWidth={1.75} />
              </View>
              <Text style={styles.secondaryVehicleTitle}>+ Log Vehicle</Text>
              <Text style={styles.secondaryVehicleSub}>Service (RWA / Admin)</Text>
            </TouchableOpacity>
          </View>

          {/* 3 Simple Queues (Pending, In, Out) */}
          <View style={styles.queuesSection}>
            <View style={styles.queueTabsBar}>
              {/* PENDING Tab */}
              <TouchableOpacity 
                style={[styles.queueTab, activeQueue === 'pending' && styles.queueTabActive]}
                onPress={() => setActiveQueue('pending')}
                activeOpacity={0.8}
              >
                <Clock size={15} color={activeQueue === 'pending' ? '#FFFFFF' : '#D97706'} strokeWidth={1.75} />
                <Text style={[styles.queueTabText, activeQueue === 'pending' && styles.queueTabTextActive]}>
                  PENDING
                </Text>
                <View style={[styles.queueBadge, activeQueue === 'pending' ? styles.queueBadgeActive : styles.queueBadgePending]}>
                  <Text style={[styles.queueBadgeText, activeQueue === 'pending' ? styles.queueBadgeTextActive : { color: '#B45309' }]}>
                    {pendingCount}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* IN Tab */}
              <TouchableOpacity 
                style={[styles.queueTab, activeQueue === 'in' && styles.queueTabActive]}
                onPress={() => setActiveQueue('in')}
                activeOpacity={0.8}
              >
                <CircleCheck size={15} color={activeQueue === 'in' ? '#FFFFFF' : '#059669'} strokeWidth={1.75} />
                <Text style={[styles.queueTabText, activeQueue === 'in' && styles.queueTabTextActive]}>
                  IN
                </Text>
                <View style={[styles.queueBadge, activeQueue === 'in' ? styles.queueBadgeActive : styles.queueBadgeIn]}>
                  <Text style={[styles.queueBadgeText, activeQueue === 'in' ? styles.queueBadgeTextActive : { color: '#047857' }]}>
                    {inCount}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* OUT Tab */}
              <TouchableOpacity 
                style={[styles.queueTab, activeQueue === 'out' && styles.queueTabActive]}
                onPress={() => setActiveQueue('out')}
                activeOpacity={0.8}
              >
                <LogOut size={15} color={activeQueue === 'out' ? '#FFFFFF' : '#64748B'} strokeWidth={1.75} />
                <Text style={[styles.queueTabText, activeQueue === 'out' && styles.queueTabTextActive]}>
                  OUT
                </Text>
                <View style={[styles.queueBadge, activeQueue === 'out' ? styles.queueBadgeActive : styles.queueBadgeOut]}>
                  <Text style={[styles.queueBadgeText, activeQueue === 'out' ? styles.queueBadgeTextActive : { color: '#475569' }]}>
                    {outCount}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Simple Search Filter */}
            <View style={styles.searchBox}>
              <Search size={16} color="#64748B" strokeWidth={1.75} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search visitor name or flat (e.g. 104)..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <X size={16} color="#94A3B8" strokeWidth={1.75} />
                </TouchableOpacity>
              )}
            </View>

            {/* Entries List */}
            {filteredList.length === 0 ? (
              <View style={styles.emptyState}>
                <Shield size={36} color="#CBD5E1" strokeWidth={1.5} />
                <Text style={styles.emptyStateTitle}>No {activeQueue.toUpperCase()} records</Text>
                <Text style={styles.emptyStateSub}>Entries will appear here automatically</Text>
              </View>
            ) : (
              filteredList.map((item) => (
                <View key={item.id} style={styles.entryCard}>
                  <View style={styles.entryCardTop}>
                    <View style={styles.entryAvatar}>
                      {item.photoUrl ? (
                        <Image source={{ uri: item.photoUrl }} style={styles.avatarImg} />
                      ) : item.type === 'delivery' ? (
                        <Package size={20} color="#2563EB" strokeWidth={1.75} />
                      ) : item.vehicleNo ? (
                        <Car size={20} color="#059669" strokeWidth={1.75} />
                      ) : (
                        <User size={20} color="#2563EB" strokeWidth={1.75} />
                      )}
                    </View>

                    <View style={styles.entryHeaderDetails}>
                      <View style={styles.entryNameRow}>
                        <Text style={styles.entryNameText}>{item.name}</Text>
                        {item.company && (
                          <View style={styles.companyBadge}>
                            <Text style={styles.companyBadgeText}>{item.company}</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.entrySubTime}>Requested at {item.requestedAt}</Text>
                    </View>
                  </View>

                  {/* Destination Flat & Resident Card */}
                  <View style={styles.entryDestBox}>
                    <View style={styles.destRow}>
                      <Building size={14} color="#2563EB" strokeWidth={1.75} />
                      <Text style={styles.destText}>
                        {item.company === 'RWA' || item.company === 'Admin' || item.block.includes('Service')
                          ? `${item.block} • Location: ${item.flat}`
                          : `${item.block} • ${item.floor} • Flat ${item.flat}`}
                      </Text>
                    </View>
                    <View style={styles.residentRow}>
                      <User size={13} color="#475569" strokeWidth={1.75} />
                      <Text style={styles.residentText}>
                        {item.company === 'RWA' || item.company === 'Admin' || item.block.includes('Service')
                          ? `Authority: ${item.residentName}`
                          : `Resident: ${item.residentName}`}
                      </Text>
                    </View>
                    {item.vehicleNo && (
                      <View style={styles.plateRow}>
                        <Car size={13} color="#059669" strokeWidth={1.75} />
                        <Text style={styles.plateText}>Plate: {item.vehicleNo}</Text>
                      </View>
                    )}
                  </View>

                  {/* Action Row */}
                  {activeQueue === 'pending' && (
                    <View style={styles.queueActionArea}>
                      {item.residentApproved ? (
                        <View style={styles.positiveApprovalBox}>
                          <View style={styles.approvalHeader}>
                            <CircleCheck size={16} color="#059669" strokeWidth={2} />
                            <Text style={styles.approvalSuccessText}>APPROVED BY RESIDENT</Text>
                          </View>
                          <TouchableOpacity 
                            style={styles.allowEntryBtn}
                            onPress={() => handleAllowIn(item.id)}
                            activeOpacity={0.8}
                          >
                            <Check size={18} color="#FFFFFF" strokeWidth={2.2} />
                            <Text style={styles.allowEntryBtnText}>ALLOW IN</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={styles.waitingApprovalBox}>
                          <View style={styles.waitingHeader}>
                            <Clock size={15} color="#D97706" strokeWidth={1.75} />
                            <Text style={styles.waitingText}>Waiting for resident approval...</Text>
                          </View>
                          <TouchableOpacity 
                            style={styles.manualAllowBtn}
                            onPress={() => handleAllowIn(item.id)}
                            activeOpacity={0.8}
                          >
                            <Text style={styles.manualAllowBtnText}>Allow</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}

                  {activeQueue === 'in' && (
                    <View style={styles.inActionArea}>
                      <View style={styles.inStatusBadge}>
                        <View style={styles.inDot} />
                        <Text style={styles.inStatusText}>Inside since {item.entryTime || 'Just Now'}</Text>
                      </View>
                      <TouchableOpacity 
                        style={styles.markOutBtn}
                        onPress={() => handleMarkOut(item.id)}
                        activeOpacity={0.8}
                      >
                        <LogOut size={16} color="#DC2626" strokeWidth={1.75} />
                        <Text style={styles.markOutBtnText}>MARK OUT</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {activeQueue === 'out' && (
                    <View style={styles.outActionArea}>
                      <Text style={styles.outHistoryText}>
                        In: {item.entryTime || '—'}  •  Out: {item.exitTime || 'Just now'}
                      </Text>
                      <View style={styles.outPill}>
                        <Text style={styles.outPillText}>EXITED</Text>
                      </View>
                    </View>
                  )}
                </View>
              ))
            )}
          </View>
        </ScrollView>
      )}

      {/* =========================================================================
          BOTTOM 2-PAGE SWITCHER BAR
         ========================================================================= */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity 
          style={[styles.bottomTabItem, currentScreen === 'otp' && styles.bottomTabItemActive]}
          onPress={() => setCurrentScreen('otp')}
          activeOpacity={0.8}
        >
          <KeyRound size={20} color={currentScreen === 'otp' ? '#2563EB' : '#64748B'} strokeWidth={1.75} />
          <Text style={[styles.bottomTabLabel, currentScreen === 'otp' && styles.bottomTabLabelActive]}>
            1. OTP / Scan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.bottomTabItem, currentScreen === 'visitors' && styles.bottomTabItemActive]}
          onPress={() => setCurrentScreen('visitors')}
          activeOpacity={0.8}
        >
          <Users size={20} color={currentScreen === 'visitors' ? '#2563EB' : '#64748B'} strokeWidth={1.75} />
          <Text style={[styles.bottomTabLabel, currentScreen === 'visitors' && styles.bottomTabLabelActive]}>
            2. Visitors & Vehicles
          </Text>
        </TouchableOpacity>
      </View>

      {/* =========================================================================
          QR SCANNER SIMULATION MODAL
         ========================================================================= */}
      <Modal visible={scanModalOpen} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.scannerCard}>
            <View style={styles.sheetHeader}>
              <View>
                <Text style={styles.sheetTitle}>Scan QR Code</Text>
                <Text style={styles.sheetSub}>Align resident guest QR code within frame</Text>
              </View>
              <TouchableOpacity onPress={() => setScanModalOpen(false)} style={styles.closeBtn}>
                <X size={20} color="#475569" strokeWidth={1.75} />
              </TouchableOpacity>
            </View>

            <View style={styles.scannerViewfinder}>
              <ScanLine size={48} color="#2563EB" strokeWidth={1.5} />
              <Text style={styles.scannerPrompt}>Camera Scanning Active...</Text>
            </View>

            <TouchableOpacity 
              style={styles.scanSimulateBtn}
              onPress={() => {
                setScanModalOpen(false);
                setOtpDigits('849210');
                triggerValidation('849210');
              }}
              activeOpacity={0.85}
            >
              <Check size={18} color="#FFFFFF" strokeWidth={2.4} />
              <Text style={styles.scanSimulateBtnText}>Auto-Scan Demo Pass</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* =========================================================================
          MODAL: ADD VISITOR / DELIVERY (Hierarchy & Company Chips)
         ========================================================================= */}
      <Modal visible={visitorModalOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.sheetHeader}>
              <View style={styles.sheetHeaderTitleGroup}>
                <Text style={styles.sheetTitle}>New Entry Request</Text>
                <Text style={styles.sheetSub}>Sends notification directly to Residence App</Text>
              </View>
              <TouchableOpacity onPress={() => setVisitorModalOpen(false)} style={styles.closeBtn}>
                <X size={20} color="#475569" strokeWidth={1.75} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetContent}>
              <View style={styles.typeSwitcher}>
                <TouchableOpacity 
                  style={[styles.typeSwitchBtn, entryKind === 'visitor' && styles.typeSwitchBtnActive]}
                  onPress={() => {
                    setEntryKind('visitor');
                    setVisitorName('');
                  }}
                  activeOpacity={0.8}
                >
                  <User size={16} color={entryKind === 'visitor' ? '#FFFFFF' : '#475569'} strokeWidth={1.75} />
                  <Text style={[styles.typeSwitchText, entryKind === 'visitor' && styles.typeSwitchTextActive]}>
                    Personal Visitor
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.typeSwitchBtn, entryKind === 'delivery' && styles.typeSwitchBtnActive]}
                  onPress={() => {
                    setEntryKind('delivery');
                    setVisitorName(`${selectedCompany} Partner`);
                  }}
                  activeOpacity={0.8}
                >
                  <Package size={16} color={entryKind === 'delivery' ? '#FFFFFF' : '#475569'} strokeWidth={1.75} />
                  <Text style={[styles.typeSwitchText, entryKind === 'delivery' && styles.typeSwitchTextActive]}>
                    Delivery Partner
                  </Text>
                </TouchableOpacity>
              </View>

              {entryKind === 'delivery' && (
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>SELECT DELIVERY COMPANY</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
                    {DELIVERY_COMPANIES.map(comp => (
                      <TouchableOpacity
                        key={comp.name}
                        style={[
                          styles.companyChip,
                          { backgroundColor: comp.bg, borderColor: comp.border },
                          selectedCompany === comp.name && styles.companyChipSelected
                        ]}
                        onPress={() => {
                          setSelectedCompany(comp.name);
                          setVisitorName(`${comp.name} Partner`);
                        }}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.companyChipText, { color: comp.color }]}>
                          {comp.name}
                        </Text>
                        {selectedCompany === comp.name && (
                          <Check size={14} color={comp.color} strokeWidth={2.4} style={{ marginLeft: 4 }} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>PERSON / RIDER NAME *</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g. Ramesh Singh"
                  placeholderTextColor="#94A3B8"
                  value={visitorName}
                  onChangeText={setVisitorName}
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.formLabel}>PHONE (OPTIONAL)</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="98765 00000"
                    placeholderTextColor="#94A3B8"
                    keyboardType="phone-pad"
                    value={visitorPhone}
                    onChangeText={setVisitorPhone}
                  />
                </View>

                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.formLabel}>VEHICLE NO. (OPTIONAL)</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="MH 02 CK 4567"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="characters"
                    value={vehicleNumber}
                    onChangeText={setVehicleNumber}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>SECURITY PHOTO AUDIT</Text>
                <View style={styles.photoCaptureRow}>
                  <TouchableOpacity 
                    style={styles.cameraBtn} 
                    onPress={handleSnapPhoto}
                    activeOpacity={0.8}
                  >
                    <Camera size={18} color="#2563EB" strokeWidth={1.75} />
                    <Text style={styles.cameraBtnText}>Take Live Photo</Text>
                  </TouchableOpacity>

                  {capturedPhoto ? (
                    <View style={styles.photoThumbWrap}>
                      <Image source={{ uri: capturedPhoto }} style={styles.photoThumb} />
                      <Text style={styles.photoCapturedLabel}>Captured</Text>
                    </View>
                  ) : (
                    <Text style={styles.photoOptionalNote}>Optional photo verification</Text>
                  )}
                </View>
              </View>

              {/* 4-Step Hierarchy */}
              <View style={styles.hierarchyCard}>
                <View style={styles.hierarchyTitleRow}>
                  <Building size={16} color="#2563EB" strokeWidth={1.75} />
                  <Text style={styles.hierarchyTitle}>DESTINATION FLAT HIERARCHY</Text>
                </View>

                <View style={styles.hierarchyStep}>
                  <Text style={styles.stepLabel}>1. Apartment Society</Text>
                  <View style={styles.fixedAptBox}>
                    <Text style={styles.fixedAptText}>{APARTMENT_NAME}</Text>
                  </View>
                </View>

                <View style={styles.hierarchyStep}>
                  <Text style={styles.stepLabel}>2. Select Block</Text>
                  <View style={styles.pillsRow}>
                    {BLOCKS.map(blk => (
                      <TouchableOpacity
                        key={blk}
                        style={[styles.pillBtn, selectedBlock === blk && styles.pillBtnActive]}
                        onPress={() => setSelectedBlock(blk)}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.pillBtnText, selectedBlock === blk && styles.pillBtnTextActive]}>
                          {blk}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.hierarchyStep}>
                  <Text style={styles.stepLabel}>3. Select Floor</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {FLOORS.map(flr => (
                      <TouchableOpacity
                        key={flr}
                        style={[styles.pillBtn, selectedFloor === flr && styles.pillBtnActive]}
                        onPress={() => setSelectedFloor(flr)}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.pillBtnText, selectedFloor === flr && styles.pillBtnTextActive]}>
                          {flr}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.hierarchyStep}>
                  <Text style={styles.stepLabel}>4. Select Flat / Door</Text>
                  <View style={styles.flatGrid}>
                    {['101', '102', '103', '104', '201', '202', '203', '204', '301', '302'].map(flt => (
                      <TouchableOpacity
                        key={flt}
                        style={[styles.flatPill, selectedFlat === flt && styles.flatPillActive]}
                        onPress={() => setSelectedFlat(flt)}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.flatPillText, selectedFlat === flt && styles.flatPillTextActive]}>
                          Flat {flt}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.linkedResidentBox}>
                  <View style={styles.linkedResidentHeader}>
                    <User size={14} color="#059669" strokeWidth={1.75} />
                    <Text style={styles.linkedResidentTitle}>Auto-Linked Resident on Residence App</Text>
                  </View>
                  <Text style={styles.linkedResidentName}>{selectedResident.resident}</Text>
                  <Text style={styles.linkedResidentPhone}>{selectedResident.phone}</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.submitReqBtn} 
                onPress={handleSendRequestToResident}
                activeOpacity={0.85}
              >
                <Send size={18} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.submitReqBtnText}>SEND REQUEST TO RESIDENCE APP</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* =========================================================================
          MODAL: LOG VEHICLE
         ========================================================================= */}
      <Modal visible={vehicleModalOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.sheetHeader}>
              <View>
                <Text style={styles.sheetTitle}>Vehicle Entry Log</Text>
                <Text style={styles.sheetSub}>Record vehicle plate and destination flat</Text>
              </View>
              <TouchableOpacity onPress={() => setVehicleModalOpen(false)} style={styles.closeBtn}>
                <X size={20} color="#475569" strokeWidth={1.75} />
              </TouchableOpacity>
            </View>

            <View style={styles.sheetContent}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>VEHICLE REGISTRATION NUMBER *</Text>
                <TextInput
                  style={[styles.formInput, styles.plateInput]}
                  placeholder="e.g. MH 02 CK 4567"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="characters"
                  value={vehPlate}
                  onChangeText={setVehPlate}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>SERVICE CATEGORY *</Text>
                <View style={styles.vehTypeRow}>
                  {(['RWA', 'Admin'] as const).map(opt => (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.vehTypeBtn, serviceOption === opt && styles.vehTypeBtnActive]}
                      onPress={() => setServiceOption(opt)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.vehTypeBtnText, serviceOption === opt && styles.vehTypeBtnTextActive]}>
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>LOCATION *</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Enter location (e.g. Clubhouse, STP Plant, Basement, Gate 2)"
                  placeholderTextColor="#94A3B8"
                  value={vehLocation}
                  onChangeText={setVehLocation}
                />
              </View>

              <TouchableOpacity 
                style={styles.submitReqBtn} 
                onPress={handleAddVehicle}
                activeOpacity={0.85}
              >
                <Car size={18} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.submitReqBtnText}>ALLOW SERVICE VEHICLE INSIDE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* =========================================================================
          MODAL: SUPERVISOR AUDIT LOG (1% Usage)
         ========================================================================= */}
      <Modal visible={supervisorModalOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.sheetHeader}>
              <View>
                <Text style={styles.sheetTitle}>Supervisor Shift Log</Text>
                <Text style={styles.sheetSub}>Gate 1 security logs & incident reports</Text>
              </View>
              <TouchableOpacity onPress={() => setSupervisorModalOpen(false)} style={styles.closeBtn}>
                <X size={20} color="#475569" strokeWidth={1.75} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.sheetContent}>
              <View style={styles.supervisorStatsGrid}>
                <View style={styles.superStatCard}>
                  <Text style={styles.superStatValue}>{entries.length}</Text>
                  <Text style={styles.superStatLabel}>Total Logs Today</Text>
                </View>
                <View style={styles.superStatCard}>
                  <Text style={[styles.superStatValue, { color: '#059669' }]}>{inCount}</Text>
                  <Text style={styles.superStatLabel}>Currently Inside</Text>
                </View>
                <View style={styles.superStatCard}>
                  <Text style={[styles.superStatValue, { color: '#2563EB' }]}>2.4 min</Text>
                  <Text style={styles.superStatLabel}>Avg Approval Time</Text>
                </View>
              </View>

              <View style={styles.supervisorDutyCard}>
                <View style={styles.supervisorDutyTitleRow}>
                  <Text style={styles.dutyTitle}>Current Shift: Morning (06:00 - 14:00)</Text>
                  <View style={[styles.dutyBadgeModal, isOnDuty ? styles.dutyBadgeActive : styles.dutyBadgeInactive]}>
                    <Text style={[styles.dutyBadgeModalText, isOnDuty ? styles.dutyBadgeActiveText : styles.dutyBadgeInactiveText]}>
                      {isOnDuty ? '🟢 Active On Duty' : '⚪ Off Duty'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.dutyGuard}>Guard on Duty: Surender Pal (ID: GD-882)</Text>

                <View style={styles.modalShiftDurationCard}>
                  <View style={styles.modalShiftDurationRow}>
                    <Clock size={15} color="#2563EB" strokeWidth={2} />
                    <Text style={styles.modalShiftDurationLabel}>Calculated Duty Duration:</Text>
                    <Text style={styles.modalShiftDurationVal}>{formatDuration(shiftDurationSeconds)}</Text>
                  </View>
                  <Text style={styles.modalShiftStartTimeNote}>
                    Shift Started At: {shiftStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[styles.modalDutyBtn, isOnDuty ? styles.modalDutyLogoutBtn : styles.modalDutyLoginBtn]}
                  onPress={() => {
                    setSupervisorModalOpen(false);
                    if (isOnDuty) {
                      setLogoutModalOpen(true);
                    } else {
                      handleStartDuty();
                    }
                  }}
                  activeOpacity={0.85}
                >
                  <LogOut size={15} color="#FFFFFF" strokeWidth={2} />
                  <Text style={styles.modalDutyBtnText}>
                    {isOnDuty ? 'Log Out Guard Shift' : 'Log In Guard Shift'}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.dutyNote}>All biometric barriers and boom gates operational.</Text>
              </View>

              <TouchableOpacity 
                style={styles.closeSheetBtn}
                onPress={() => setSupervisorModalOpen(false)}
                activeOpacity={0.85}
              >
                <Text style={styles.closeSheetBtnText}>Back to Console</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* =========================================================================
          MODAL: GUARD LOGOUT CONFIRMATION WITH TOTAL SHIFT DURATION
         ========================================================================= */}
      <Modal visible={logoutModalOpen} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.logoutModalCard}>
            <View style={styles.logoutIconCircle}>
              <LogOut size={26} color="#DC2626" strokeWidth={2} />
            </View>
            <Text style={styles.logoutModalTitle}>Confirm Duty Log Out</Text>
            <Text style={styles.logoutModalSub}>
              End active shift and calculate total working hours
            </Text>

            <View style={styles.logoutSummaryCard}>
              <View style={styles.logoutSummaryRow}>
                <Text style={styles.logoutSummaryLabel}>Guard Name:</Text>
                <Text style={styles.logoutSummaryVal}>Surender Pal (GD-882)</Text>
              </View>
              <View style={styles.logoutSummaryRow}>
                <Text style={styles.logoutSummaryLabel}>Shift Login Time:</Text>
                <Text style={styles.logoutSummaryVal}>
                  {shiftStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
              <View style={styles.logoutSummaryRow}>
                <Text style={styles.logoutSummaryLabel}>Calculated Duration:</Text>
                <Text style={[styles.logoutSummaryVal, { color: '#2563EB', fontWeight: '800' }]}>
                  {formatDuration(shiftDurationSeconds)}
                </Text>
              </View>
            </View>

            <View style={styles.logoutBtnGroup}>
              <TouchableOpacity
                style={styles.logoutConfirmBtn}
                onPress={handleConfirmLogout}
                activeOpacity={0.85}
              >
                <Text style={styles.logoutConfirmBtnText}>Log Out & Return to Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutCancelBtn}
                onPress={() => setLogoutModalOpen(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.logoutCancelBtnText}>Cancel / Stay On Duty</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* =========================================================================
          MODAL: EMERGENCY SOS
         ========================================================================= */}
      <Modal visible={sosModalOpen} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.sosCard}>
            <TriangleAlert size={42} color="#DC2626" strokeWidth={2} />
            <Text style={styles.sosTitle}>EMERGENCY ALERT</Text>
            <Text style={styles.sosSub}>Notify Central Security & Society Management</Text>

            <View style={styles.sosBtnGroup}>
              <TouchableOpacity 
                style={styles.sosConfirmBtn}
                onPress={() => {
                  setSosModalOpen(false);
                  Alert.alert('Emergency Broadcasted', 'All towers and central police have been alerted.');
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.sosConfirmBtnText}>TRIGGER PANIC ALARM</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.sosCancelBtn}
                onPress={() => setSosModalOpen(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.sosCancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

// =============================================================================
// STYLES: CLEAN, MINIMAL & PROFESSIONAL BLUE & WHITE
// =============================================================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    padding: 4,
    marginRight: 2,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  classicIconButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Main Scroll
  mainScrollView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // ---------------------------------------------------------------------------
  // FIRST SCREEN: OTP VIEW
  // ---------------------------------------------------------------------------
  otpScreenContainer: {
    padding: 16,
    paddingBottom: 90,
  },
  otpMainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  otpHeaderBox: {
    alignItems: 'center',
    marginBottom: 16,
  },
  keyIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  otpHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  otpSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  otpBoxRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 12,
  },
  otpBoxCell: {
    width: 44,
    height: 50,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  otpBoxCellActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  otpBoxCellFilled: {
    borderColor: '#1D4ED8',
    backgroundColor: '#FFFFFF',
  },
  otpBoxCellText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },

  // Small Scan & Submit Button Row
  otpActionControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
    marginBottom: 16,
  },
  smallScanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  smallScanButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  submitOtpButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  submitOtpButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // Verified Pass Display
  verifiedPassCard: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    gap: 6,
  },
  verifiedPassHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  verifiedPassTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#047857',
  },
  verifiedPassFlat: {
    fontSize: 13,
    fontWeight: '700',
    color: '#065F46',
  },
  verifiedPassResident: {
    fontSize: 11,
    color: '#047857',
  },
  allowVerifiedBtn: {
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
  },
  allowVerifiedBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // Dialpad
  dialpadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  dialKey: {
    width: '30%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialKeySpecial: {
    backgroundColor: '#EFF6FF',
  },
  dialKeyText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  dialKeySpecialText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  dialKeyDeleteText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#DC2626',
  },

  // Transition Banner Button
  nextScreenBannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },
  nextScreenBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nextScreenBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  nextScreenBannerSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },

  // ---------------------------------------------------------------------------
  // NEXT SCREEN: VISITORS & VEHICLES VIEW (VERY SIMPLE UI)
  // ---------------------------------------------------------------------------
  visitorsScreenContainer: {
    padding: 16,
    paddingBottom: 90,
  },
  simpleActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  primaryVisitorCard: {
    flex: 1,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  primaryVisitorIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#1D4ED8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  primaryVisitorTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  primaryVisitorSub: {
    fontSize: 10,
    color: '#BFDBFE',
    marginTop: 2,
  },
  secondaryVehicleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryVehicleIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  secondaryVehicleTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  secondaryVehicleSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },

  // Queues Section
  queuesSection: {
    marginTop: 2,
  },
  queueTabsBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
    marginBottom: 12,
  },
  queueTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  queueTabActive: {
    backgroundColor: '#2563EB',
  },
  queueTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  queueTabTextActive: {
    color: '#FFFFFF',
  },
  queueBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  queueBadgePending: {
    backgroundColor: '#FEF3C7',
  },
  queueBadgeIn: {
    backgroundColor: '#DCFCE7',
  },
  queueBadgeOut: {
    backgroundColor: '#F1F5F9',
  },
  queueBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  queueBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  queueBadgeTextActive: {
    color: '#FFFFFF',
  },

  // Search
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    padding: 0,
  },

  // Entry Cards
  entryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  entryCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  entryAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  entryHeaderDetails: {
    flex: 1,
  },
  entryNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  entryNameText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  companyBadge: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  companyBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  entrySubTime: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },

  // Destination Box
  entryDestBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  destRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  destText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
  residentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  residentText: {
    fontSize: 11,
    color: '#475569',
  },
  plateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  plateText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },

  // Queue Actions
  queueActionArea: {
    marginTop: 10,
  },
  positiveApprovalBox: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 8,
    padding: 8,
    gap: 6,
  },
  approvalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  approvalSuccessText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#047857',
  },
  allowEntryBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  allowEntryBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  waitingApprovalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 8,
    padding: 8,
  },
  waitingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  waitingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#B45309',
  },
  manualAllowBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },
  manualAllowBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
  },

  // IN Queue Actions
  inActionArea: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  inDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  inStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#047857',
  },
  markOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  markOutBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#DC2626',
  },

  // OUT Queue Actions
  outActionArea: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  outHistoryText: {
    fontSize: 11,
    color: '#64748B',
  },
  outPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  outPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  emptyStateTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  emptyStateSub: {
    fontSize: 11,
    color: '#94A3B8',
  },

  // ---------------------------------------------------------------------------
  // BOTTOM 2-PAGE SWITCHER BAR
  // ---------------------------------------------------------------------------
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 4,
  },
  bottomTabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 2,
  },
  bottomTabItemActive: {
    borderTopWidth: 2,
    borderTopColor: '#2563EB',
  },
  bottomTabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  bottomTabLabelActive: {
    color: '#2563EB',
    fontWeight: '800',
  },

  // Scanner Modal
  scannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 16,
    alignItems: 'center',
  },
  scannerViewfinder: {
    width: 200,
    height: 180,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2563EB',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 10,
  },
  scannerPrompt: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  scanSimulateBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scanSimulateBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // Modal Sheet & Overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '88%',
    paddingBottom: 24,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sheetHeaderTitleGroup: {
    flex: 1,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  sheetSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
  },
  sheetContent: {
    padding: 16,
  },

  typeSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 4,
    marginBottom: 14,
    gap: 4,
  },
  typeSwitchBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  typeSwitchBtnActive: {
    backgroundColor: '#2563EB',
  },
  typeSwitchText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  typeSwitchTextActive: {
    color: '#FFFFFF',
  },

  formGroup: {
    marginBottom: 12,
  },
  formLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  formInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: '#0F172A',
  },
  plateInput: {
    fontWeight: '800',
    letterSpacing: 1,
    fontSize: 15,
  },
  formRow: {
    flexDirection: 'row',
  },

  chipsScroll: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  companyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  companyChipSelected: {
    borderWidth: 1.8,
  },
  companyChipText: {
    fontSize: 11,
    fontWeight: '700',
  },

  photoCaptureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cameraBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  cameraBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  photoThumbWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  photoThumb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  photoCapturedLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  photoOptionalNote: {
    fontSize: 11,
    color: '#94A3B8',
  },

  hierarchyCard: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  hierarchyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  hierarchyTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: 0.5,
  },
  hierarchyStep: {
    gap: 4,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  fixedAptBox: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  fixedAptText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  pillBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 6,
  },
  pillBtnActive: {
    backgroundColor: '#2563EB',
    borderColor: '#1D4ED8',
  },
  pillBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  pillBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  flatGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  flatPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  flatPillActive: {
    backgroundColor: '#2563EB',
    borderColor: '#1D4ED8',
  },
  flatPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  flatPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  linkedResidentBox: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  linkedResidentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  linkedResidentTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#047857',
  },
  linkedResidentName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065F46',
    marginTop: 2,
  },
  linkedResidentPhone: {
    fontSize: 10,
    color: '#047857',
  },

  submitReqBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitReqBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  vehTypeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  vehTypeBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  vehTypeBtnActive: {
    backgroundColor: '#2563EB',
  },
  vehTypeBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  vehTypeBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  supervisorStatsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  superStatCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  superStatValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  superStatLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
    textAlign: 'center',
  },
  supervisorDutyCard: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    gap: 4,
  },
  dutyTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  dutyGuard: {
    fontSize: 11,
    color: '#1D4ED8',
  },
  dutyNote: {
    fontSize: 10,
    color: '#64748B',
  },
  logoutHeaderBtn: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  dutyBar: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dutyBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  dutyStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 5,
  },
  dutyStatusPillActive: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  dutyStatusPillInactive: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  dutyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dutyDotActive: {
    backgroundColor: '#10B981',
  },
  dutyDotInactive: {
    backgroundColor: '#94A3B8',
  },
  dutyStatusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  dutyStatusTextActive: {
    color: '#059669',
  },
  dutyStatusTextInactive: {
    color: '#64748B',
  },
  dutyTimerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dutyTimerLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  dutyTimerVal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  dutyToggleActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 5,
  },
  dutyLogoutActionBtn: {
    backgroundColor: '#DC2626',
  },
  dutyLoginActionBtn: {
    backgroundColor: '#059669',
  },
  dutyToggleActionBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  supervisorDutyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dutyBadgeModal: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dutyBadgeActive: {
    backgroundColor: '#DCFCE7',
  },
  dutyBadgeInactive: {
    backgroundColor: '#F1F5F9',
  },
  dutyBadgeModalText: {
    fontSize: 10,
    fontWeight: '700',
  },
  dutyBadgeActiveText: {
    color: '#15803D',
  },
  dutyBadgeInactiveText: {
    color: '#64748B',
  },
  modalShiftDurationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  modalShiftDurationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modalShiftDurationLabel: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  modalShiftDurationVal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },
  modalShiftStartTimeNote: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  modalDutyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 8,
    gap: 6,
  },
  modalDutyLogoutBtn: {
    backgroundColor: '#DC2626',
  },
  modalDutyLoginBtn: {
    backgroundColor: '#059669',
  },
  modalDutyBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  logoutModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    width: '90%',
    maxWidth: 380,
    alignItems: 'center',
  },
  logoutIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoutModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  logoutModalSub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  logoutSummaryCard: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
    marginBottom: 18,
  },
  logoutSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutSummaryLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  logoutSummaryVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  logoutBtnGroup: {
    width: '100%',
    gap: 8,
  },
  logoutConfirmBtn: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutConfirmBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  logoutCancelBtn: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: 'center',
  },
  logoutCancelBtnText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
  },
  closeSheetBtn: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeSheetBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },

  sosCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 24,
    padding: 24,
    alignItems: 'center',
    gap: 10,
  },
  sosTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#DC2626',
    letterSpacing: 0.5,
  },
  sosSub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 10,
  },
  sosBtnGroup: {
    width: '100%',
    gap: 8,
  },
  sosConfirmBtn: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  sosConfirmBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  sosCancelBtn: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sosCancelBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
});
