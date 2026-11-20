import React, { useState, useEffect } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Phone,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react-native';

interface LoginScreenProps {
  navigation: {
    navigate: (screen: 'GuardDashboard' | 'SupervisorDashboard') => void;
  };
}

type AuthStep = 'phone' | 'otp';

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [step, setStep] = useState<AuthStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  // Resend Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, resendTimer]);

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
    setPhoneNumber(cleaned);
    setErrorMessage('');
  };

  const handleOtpChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 6);
    setOtp(cleaned);
    setErrorMessage('');
  };

  // Step 1: Send OTP
  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMessage('');
    setOtp('');
    setResendTimer(30);
    setStep('otp');
  };

  // Step 2: Verify OTP & Login
  const handleVerifyOtp = () => {
    if (!otp || otp.length < 6) {
      setErrorMessage('Please enter the complete 6-digit OTP');
      return;
    }

    if (otp !== '123456') {
      setErrorMessage('Invalid OTP. Please enter 123456');
      return;
    }

    setErrorMessage('');

    // Determine target role:
    // Numbers ending with '1' (e.g. 9876543211) navigate to Supervisor Console;
    // other numbers navigate to Guard Console.
    if (phoneNumber.endsWith('1')) {
      navigation.navigate('SupervisorDashboard');
    } else {
      navigation.navigate('GuardDashboard');
    }
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setOtp('');
    setErrorMessage('');
  };

  // Helper to render 6 visual OTP boxes
  const renderOtpBoxes = () => {
    const digits = otp.split('');
    const boxes = [];
    for (let i = 0; i < 6; i++) {
      const isCurrent = i === digits.length;
      const isFilled = i < digits.length;
      boxes.push(
        <View
          key={i}
          style={[
            styles.otpBox,
            isCurrent && styles.otpBoxCurrent,
            isFilled && styles.otpBoxFilled,
          ]}
        >
          <Text style={styles.otpBoxDigit}>{digits[i] || ''}</Text>
        </View>
      );
    }
    return <View style={styles.otpBoxesRow}>{boxes}</View>;
  };

  return (
    <ImageBackground
      source={require('../assets/apartment-gate-bg.jpg')}
      resizeMode="cover"
      style={styles.fullScreenBackground}
    >
      <LinearGradient
        colors={[
          'rgba(15, 23, 42, 0.38)',
          'rgba(15, 23, 42, 0.58)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientOverlay}
      >
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.contentWrapper}>
                {/* Logo directly above the card only */}
                {/* Logo directly above the card only - Icon Only */}
                <View style={styles.brandHeader}>
                  <View style={styles.brandIconBox}>
                    <Image
                      source={require('../assets/logo.jpg')}
                      style={styles.brandLogoImage}
                      resizeMode="cover"
                    />
                  </View>
                </View>

                {/* Form Card (Frosted Glass Container) */}
                <View style={styles.formCard}>
                  {/* =============================================================== */}
                  {/* STEP 1: PHONE NUMBER INPUT */}
                  {/* =============================================================== */}
                  {step === 'phone' ? (
                    <View>
                      <Text style={styles.formTitle}>Sign In</Text>


                      <View style={styles.inputsSection}>
                        {/* Phone Number Field */}
                        <View style={styles.fieldGroup}>
                          <Text style={styles.fieldLabel}>
                            Phone Number <Text style={styles.requiredMark}>*</Text>
                          </Text>
                          <View style={styles.inputContainer}>
                            <View style={styles.countryCodeBox}>
                              <Phone size={19} color="#2563EB" />
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
                              autoFocus={true}
                            />
                          </View>
                        </View>

                        {/* Error Message */}
                        {errorMessage ? (
                          <View style={styles.errorContainer}>
                            <AlertCircle size={15} color="#EF4444" />
                            <Text style={styles.errorText}>{errorMessage}</Text>
                          </View>
                        ) : null}

                        {/* Send OTP Button */}
                        <TouchableOpacity
                          activeOpacity={0.85}
                          onPress={handleSendOtp}
                          style={styles.primaryBtnWrapper}
                        >
                          <LinearGradient
                            colors={['#2563EB', '#0EA5E9']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.primaryBtnGradient}
                          >
                            <Text style={styles.primaryBtnText}>Send OTP</Text>
                            <View style={styles.primaryBtnIconBox}>
                              <ArrowRight size={18} color="#FFFFFF" />
                            </View>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    /* =============================================================== */
                    /* STEP 2: ENTER OTP (OTP = 123456) */
                    /* =============================================================== */
                    <View>
                      <View style={styles.otpHeaderRow}>
                        <TouchableOpacity
                          onPress={() => {
                            setStep('phone');
                            setOtp('');
                            setErrorMessage('');
                          }}
                          style={styles.backToPhoneBtn}
                          activeOpacity={0.7}
                        >
                          <ArrowLeft size={18} color="#2563EB" />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.formTitle}>Verify OTP</Text>
                          <Text style={styles.formSubtitle}>
                            Sent to <Text style={styles.boldPhoneText}>+91 {phoneNumber}</Text>
                          </Text>
                        </View>
                      </View>

                      <View style={styles.inputsSection}>
                        {/* 6-Box OTP Display with overlaid invisible input */}
                        <View style={styles.otpInputWrapper}>
                          {renderOtpBoxes()}
                          <TextInput
                            style={styles.hiddenTextInput}
                            value={otp}
                            onChangeText={handleOtpChange}
                            keyboardType="number-pad"
                            maxLength={6}
                            autoFocus={true}
                          />
                        </View>

                        {/* Error Message */}
                        {errorMessage ? (
                          <View style={styles.errorContainer}>
                            <AlertCircle size={15} color="#EF4444" />
                            <Text style={styles.errorText}>{errorMessage}</Text>
                          </View>
                        ) : null}

                        {/* Resend OTP Row */}
                        <View style={styles.resendRow}>
                          {resendTimer > 0 ? (
                            <Text style={styles.resendTimerText}>
                              Resend OTP in <Text style={styles.timerBold}>{resendTimer}s</Text>
                            </Text>
                          ) : (
                            <TouchableOpacity
                              onPress={handleResendOtp}
                              style={styles.resendBtn}
                              activeOpacity={0.7}
                            >
                              <RefreshCw size={13} color="#2563EB" />
                              <Text style={styles.resendBtnText}>Resend OTP</Text>
                            </TouchableOpacity>
                          )}

                          <TouchableOpacity
                            onPress={() => {
                              setStep('phone');
                              setOtp('');
                              setErrorMessage('');
                            }}
                            activeOpacity={0.7}
                          >
                            <Text style={styles.changeNumberText}>Edit Phone Number</Text>
                          </TouchableOpacity>
                        </View>

                        {/* Verify & Login Button */}
                        <TouchableOpacity
                          activeOpacity={0.85}
                          onPress={handleVerifyOtp}
                          style={styles.primaryBtnWrapper}
                        >
                          <LinearGradient
                            colors={['#2563EB', '#0EA5E9']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.primaryBtnGradient}
                          >
                            <Text style={styles.primaryBtnText}>Verify & Login</Text>
                            <View style={styles.primaryBtnIconBox}>
                              <CheckCircle2 size={18} color="#FFFFFF" />
                            </View>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingTop: 40,
    paddingBottom: 0,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 460,
  },

  // Brand Logo Header (Directly Above the Card Only)
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  brandIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.30,
    shadowRadius: 14,
    elevation: 6,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
  },
  brandLogoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  brandSubtitle: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    marginTop: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  // Form Card (Frosted Glass Container Docked at Bottom)
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: Platform.OS === 'ios' ? 44 : 32,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.18,
    shadowRadius: 30,
    elevation: 12,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
      } as any,
    }),
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
    marginBottom: 20,
  },
  boldPhoneText: {
    fontWeight: '700',
    color: '#0F172A',
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
  requiredMark: {
    color: '#EF4444',
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.70)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.90)',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 14,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      } as any,
    }),
  },
  countryCodeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 8,
  },
  inputDivider: {
    width: 1,
    height: 22,
    backgroundColor: '#CBD5E1',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '600',
    letterSpacing: 0.5,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      } as any,
    }),
  },

  // OTP Verification View
  otpHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 4,
  },
  backToPhoneBtn: {
    padding: 6,
    marginTop: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
  },
  otpInputWrapper: {
    position: 'relative',
    marginVertical: 4,
  },
  otpBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  otpBox: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      } as any,
    }),
  },
  otpBoxCurrent: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  otpBoxFilled: {
    borderColor: '#93C5FD',
    backgroundColor: '#F8FAFC',
  },
  otpBoxDigit: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  hiddenTextInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    fontSize: 24,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  resendTimerText: {
    fontSize: 12,
    color: '#64748B',
  },
  timerBold: {
    fontWeight: '700',
    color: '#0F172A',
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resendBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  changeNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },

  // Error Banner
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 8,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },

  // Primary Buttons
  primaryBtnWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 10,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  primaryBtnIconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
