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
  Building,
} from 'lucide-react-native';
import { colors, gradients } from '../theme/colors';

interface LoginScreenProps {
  navigation: {
    navigate: (screen: 'GuardDashboard' | 'SupervisorDashboard' | 'AdminDashboard') => void;
  };
}

type RoleType = 'guard' | 'supervisor' | 'admin';

const buildingImage =
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80';

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 900;

  const [role, setRole] = useState<RoleType>('guard');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleSelect = (selectedRole: RoleType) => {
    setRole(selectedRole);
    if (selectedRole === 'guard') {
      setPhoneNumber('9876543210');
      setPassword('guard123');
    } else if (selectedRole === 'supervisor') {
      setPhoneNumber('9876543211');
      setPassword('super123');
    } else {
      setPhoneNumber('9876543212');
      setPassword('admin123');
    }
  };

  const handleLogin = () => {
    if (role === 'guard') {
      navigation.navigate('GuardDashboard');
    } else if (role === 'supervisor') {
      navigation.navigate('SupervisorDashboard');
    } else {
      navigation.navigate('AdminDashboard');
    }
  };

  const roleLabel =
    role === 'guard'
      ? 'Security Guard'
      : role === 'supervisor'
      ? 'Supervisor'
      : 'Administrator';

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
                  <Text style={styles.brandSubtitle}>Gate & Access Management</Text>
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

          {/* Minimal Title */}
          <Text style={styles.formTitle}>Sign In</Text>
          <Text style={styles.formSubtitle}>Enter your phone number & password to continue</Text>

          {/* Compact Role Selector */}
          <View style={styles.roleTabsContainer}>
            <TouchableOpacity
              style={[styles.roleTab, role === 'guard' && styles.activeRoleTab]}
              onPress={() => handleRoleSelect('guard')}
              activeOpacity={0.8}
            >
              <ShieldCheck
                size={16}
                color={role === 'guard' ? '#2563EB' : colors.secondaryText}
              />
              <Text
                style={[styles.roleTabText, role === 'guard' && styles.activeRoleTabText]}
              >
                Guard
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleTab, role === 'supervisor' && styles.activeRoleTab]}
              onPress={() => handleRoleSelect('supervisor')}
              activeOpacity={0.8}
            >
              <UserCheck
                size={16}
                color={role === 'supervisor' ? '#2563EB' : colors.secondaryText}
              />
              <Text
                style={[styles.roleTabText, role === 'supervisor' && styles.activeRoleTabText]}
              >
                Supervisor
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleTab, role === 'admin' && styles.activeRoleTab]}
              onPress={() => handleRoleSelect('admin')}
              activeOpacity={0.8}
            >
              <Building
                size={16}
                color={role === 'admin' ? '#2563EB' : colors.secondaryText}
              />
              <Text
                style={[styles.roleTabText, role === 'admin' && styles.activeRoleTabText]}
              >
                Admin
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Inputs */}
          <View style={styles.inputsSection}>
            {/* Phone Number Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <View style={styles.countryCodeBox}>
                  <Phone size={18} color="#64748B" />
                  <Text style={styles.countryCodeText}>+91</Text>
                </View>
                <View style={styles.inputDivider} />
                <TextInput
                  style={styles.textInput}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="Enter phone number"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputIconBox}>
                  <Lock size={18} color="#64748B" />
                </View>
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
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

            {/* Forgot Password Link */}
            <TouchableOpacity style={styles.forgotRow} activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleLogin}
              style={styles.loginButtonWrapper}
            >
              <LinearGradient
                colors={['#2563EB', '#0EA5E9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.loginButtonGradient}
              >
                <Text style={styles.loginButtonText}>Sign In as {roleLabel}</Text>
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
              <Text style={styles.secureBadgeText}>End-to-End Encrypted Terminal</Text>
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
    height: 220,
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
    paddingBottom: 36,
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
    marginBottom: 6,
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
    marginTop: 4,
    marginBottom: 18,
  },

  // Role Switcher Tabs
  roleTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    gap: 4,
    marginBottom: 20,
  },
  roleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 9,
    gap: 6,
  },
  activeRoleTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  roleTabText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#64748B',
  },
  activeRoleTabText: {
    color: '#2563EB',
    fontWeight: '700',
  },

  // Inputs
  inputsSection: {
    gap: 16,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    height: 52,
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
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: -4,
  },
  forgotText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#2563EB',
  },

  // Login Button
  loginButtonWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 8,
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
    marginTop: 22,
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
