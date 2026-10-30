import React, { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Shield,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  AlertCircle,
} from 'lucide-react-native';
import { colors, gradients } from '../theme/colors';

interface LoginScreenProps {
  navigation: {
    navigate: (screen: 'GuardDashboard' | 'SupervisorDashboard') => void;
  };
}

type RoleType = 'guard' | 'supervisor';

// Registered phone numbers mapping
const KNOWN_ACCOUNTS: Record<string, { role: RoleType; name: string; pass: string }> = {
  '9876543210': { role: 'guard', name: 'Security Guard', pass: 'guard123' },
  '9876543211': { role: 'supervisor', name: 'Shift Supervisor', pass: 'super123' },
};

const buildingImage =
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80';

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 900;

  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [password, setPassword] = useState('guard123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Automatically determine role based on phone number
  const detectedAccount = KNOWN_ACCOUNTS[phoneNumber];
  // If registered, use registered role; otherwise determine by rule or default to guard
  const detectedRole: RoleType = detectedAccount
    ? detectedAccount.role
    : phoneNumber.endsWith('1')
    ? 'supervisor'
    : 'guard';

  const handlePhoneChange = (text: string) => {
    // Keep only digits, max 10
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
    setPhoneNumber(cleaned);
    setErrorMessage('');

    // If matches a known demo number, auto-set default password for convenience
    if (KNOWN_ACCOUNTS[cleaned]) {
      setPassword(KNOWN_ACCOUNTS[cleaned].pass);
    }
  };

  const fillQuickLogin = (role: RoleType) => {
    if (role === 'guard') {
      setPhoneNumber('9876543210');
      setPassword('guard123');
    } else {
      setPhoneNumber('9876543211');
      setPassword('super123');
    }
    setErrorMessage('');
  };

  const handleLogin = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password');
      return;
    }

    setErrorMessage('');
    if (detectedRole === 'supervisor') {
      navigation.navigate('SupervisorDashboard');
    } else {
      navigation.navigate('GuardDashboard');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          isWideScreen ? styles.wideScrollContainer : styles.narrowScrollContainer,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Top Image Hero Banner */}
        <ImageBackground
          source={{ uri: buildingImage }}
          resizeMode="cover"
          style={[styles.heroBanner, isWideScreen && styles.wideHeroBanner]}
        >
          <LinearGradient
            colors={['rgba(6, 11, 20, 0.45)', 'rgba(6, 11, 20, 0.85)']}
            style={styles.heroGradient}
          />
          <SafeAreaView style={styles.heroSafeArea}>
            <View style={styles.heroContent}>
              <View style={styles.brandBadge}>
                <LinearGradient
                  colors={gradients.primary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.brandIconBox}
                >
                  <Shield color="#FFFFFF" size={24} />
                </LinearGradient>
                <View>
                  <Text style={styles.brandTitle}>ZIVION SECURITY</Text>
                  <Text style={styles.brandSubtitle}>Gate & Checkpoint Terminal</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>

        {/* Form Card (Below the Image) */}
        <View style={[styles.formCard, isWideScreen && styles.wideFormCard]}>
          {/* Subtle Top Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Title */}
          <Text style={styles.formTitle}>Sign In</Text>
          <Text style={styles.formSubtitle}>
            Role is automatically verified from your mobile number
          </Text>

          {/* Quick Demo Logins Selector */}
          <View style={styles.quickLoginsSection}>
            <Text style={styles.quickLoginsLabel}>QUICK LOGINS:</Text>
            <View style={styles.quickLoginsRow}>
              <TouchableOpacity
                style={[
                  styles.quickLoginChip,
                  detectedRole === 'guard' && styles.activeGuardChip,
                ]}
                onPress={() => fillQuickLogin('guard')}
                activeOpacity={0.8}
              >
                <ShieldCheck
                  size={15}
                  color={detectedRole === 'guard' ? '#2563EB' : '#64748B'}
                />
                <Text
                  style={[
                    styles.quickLoginChipText,
                    detectedRole === 'guard' && styles.activeGuardChipText,
                  ]}
                >
                  Guard (9876543210)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.quickLoginChip,
                  detectedRole === 'supervisor' && styles.activeSupervisorChip,
                ]}
                onPress={() => fillQuickLogin('supervisor')}
                activeOpacity={0.8}
              >
                <UserCheck
                  size={15}
                  color={detectedRole === 'supervisor' ? '#4F46E5' : '#64748B'}
                />
                <Text
                  style={[
                    styles.quickLoginChipText,
                    detectedRole === 'supervisor' && styles.activeSupervisorChipText,
                  ]}
                >
                  Supervisor (9876543211)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Inputs */}
          <View style={styles.inputsSection}>
            {/* Phone Number Field (Marked required with *) */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.fieldLabel}>
                  Phone Number <Text style={styles.requiredMark}>*</Text>
                </Text>
                {/* Dynamically Detected Role Badge */}
                {phoneNumber.length >= 10 && (
                  <View
                    style={[
                      styles.detectedBadge,
                      detectedRole === 'supervisor'
                        ? styles.supervisorBadge
                        : styles.guardBadge,
                    ]}
                  >
                    {detectedRole === 'supervisor' ? (
                      <UserCheck size={12} color="#4F46E5" />
                    ) : (
                      <ShieldCheck size={12} color="#2563EB" />
                    )}
                    <Text
                      style={[
                        styles.detectedBadgeText,
                        detectedRole === 'supervisor'
                          ? styles.supervisorBadgeText
                          : styles.guardBadgeText,
                      ]}
                    >
                      {detectedRole === 'supervisor'
                        ? 'Supervisor Account'
                        : 'Guard Account'}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.countryCodeBox}>
                  <Phone size={18} color="#64748B" />
                  <Text style={styles.countryCodeText}>+91</Text>
                </View>
                <View style={styles.inputDivider} />
                <TextInput
                  style={styles.textInput}
                  value={phoneNumber}
                  onChangeText={handlePhoneChange}
                  placeholder="Enter 10-digit mobile number"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
            </View>

            {/* Password Field (Marked required with *) */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                Password <Text style={styles.requiredMark}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputIconBox}>
                  <Lock size={18} color="#64748B" />
                </View>
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={(val) => {
                    setPassword(val);
                    setErrorMessage('');
                  }}
                  placeholder="Enter password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  {showPassword ? (
                    <EyeOff size={18} color="#64748B" />
                  ) : (
                    <Eye size={18} color="#64748B" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Error Message */}
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <AlertCircle size={15} color="#EF4444" />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Forgot Password Link */}
            <TouchableOpacity style={styles.forgotRow} activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Dynamic Login Button based on detected role */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleLogin}
              style={styles.loginButtonWrapper}
            >
              <LinearGradient
                colors={
                  detectedRole === 'supervisor'
                    ? ['#4F46E5', '#06B6D4']
                    : ['#2563EB', '#0EA5E9']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.loginButtonGradient}
              >
                <Text style={styles.loginButtonText}>
                  Login as {detectedRole === 'supervisor' ? 'Supervisor' : 'Security Guard'}
                </Text>
                <View style={styles.loginButtonArrow}>
                  <ArrowRight size={18} color="#FFFFFF" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Minimal Security Footer */}
          <View style={styles.footer}>
            <View style={styles.secureBadge}>
              <Lock size={12} color="#94A3B8" />
              <Text style={styles.secureBadgeText}>Encrypted Gate Terminal Access</Text>
            </View>
            <Text style={styles.footerCopy}>ZIVION Security · 24/7 Access</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#060B14',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#060B14',
  },
  wideScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 40,
  },
  narrowScrollContainer: {
    justifyContent: 'flex-start',
  },

  // Hero Banner (Top)
  heroBanner: {
    width: '100%',
    height: 210,
    justifyContent: 'flex-end',
  },
  wideHeroBanner: {
    width: 420,
    height: 520,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroSafeArea: {
    width: '100%',
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingBottom: 34,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.cyanBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  brandSubtitle: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    marginTop: 2,
  },

  // Form Card (Below the Image)
  formCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -22,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 16,
  },
  wideFormCard: {
    flex: 0,
    width: 440,
    marginTop: 0,
    borderRadius: 24,
    paddingVertical: 32,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 4,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  formSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3,
    marginBottom: 16,
  },

  // Quick Logins
  quickLoginsSection: {
    marginBottom: 18,
  },
  quickLoginsLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  quickLoginsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  quickLoginChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 5,
  },
  activeGuardChip: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  activeGuardChipText: {
    color: '#2563EB',
    fontWeight: '700',
  },
  activeSupervisorChip: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  activeSupervisorChipText: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  quickLoginChipText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#475569',
  },

  // Inputs
  inputsSection: {
    gap: 14,
  },
  fieldGroup: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  requiredMark: {
    color: '#EF4444',
    fontWeight: '700',
  },
  detectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  guardBadge: {
    backgroundColor: '#EFF6FF',
  },
  guardBadgeText: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '700',
  },
  supervisorBadge: {
    backgroundColor: '#EEF2FF',
  },
  supervisorBadgeText: {
    color: '#4F46E5',
    fontSize: 11,
    fontWeight: '700',
  },
  detectedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    height: 50,
    paddingHorizontal: 14,
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 8,
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  inputDivider: {
    width: 1,
    height: 22,
    backgroundColor: '#CBD5E1',
    marginRight: 10,
  },
  inputIconBox: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
  },
  eyeButton: {
    padding: 6,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    gap: 6,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '500',
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: -2,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },

  // Login Button
  loginButtonWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 6,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  },
  loginButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  loginButtonArrow: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Footer
  footer: {
    marginTop: 20,
    alignItems: 'center',
    gap: 4,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  secureBadgeText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  footerCopy: {
    fontSize: 11,
    color: '#CBD5E1',
  },
});
