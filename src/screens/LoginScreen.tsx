import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Shield,
  Users,
  Building,
  ArrowRight,
  Lock,
  CircleCheck,
  ChevronRight,
} from 'lucide-react-native';
import { colors, gradients } from '../theme/colors';

interface LoginScreenProps {
  navigation: {
    navigate: (screen: 'GuardDashboard' | 'SupervisorDashboard' | 'AdminDashboard') => void;
  };
}

const buildingImage =
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80';

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 900;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={{ uri: buildingImage }}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        {/* Subtle dark gradient overlay for optimal readability */}
        <LinearGradient
          colors={['rgba(6, 11, 20, 0.72)', 'rgba(6, 11, 20, 0.88)', 'rgba(6, 11, 20, 0.96)']}
          style={styles.gradientOverlay}
        />

        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              isWideScreen ? styles.wideScrollContent : styles.narrowScrollContent,
            ]}
            showsVerticalScrollIndicator={false}
            bounces={true}
            keyboardShouldPersistTaps="handled"
          >
            {/* Top / Hero Section */}
            <View style={[styles.heroSection, !isWideScreen && styles.narrowHeroSection]}>
              {/* Status Badge */}
              <View style={styles.statusBadge}>
                <View style={styles.pulsingDot} />
                <Text style={styles.statusBadgeText}>ACTIVE GATE MONITORING</Text>
              </View>

              {/* Brand Header */}
              <View style={styles.brandRow}>
                <View style={styles.brandIconContainer}>
                  <LinearGradient
                    colors={gradients.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.brandIconGradient}
                  >
                    <Shield color="#FFFFFF" size={26} />
                  </LinearGradient>
                </View>
                <View>
                  <Text style={styles.brandTitle}>ZIVION SECURITY</Text>
                  <Text style={styles.brandSubtitle}>Apartment Gate & Access System</Text>
                </View>
              </View>

              {/* Punchy Headline */}
              <View style={styles.taglineBlock}>
                <Text style={[styles.mainHeadline, !isWideScreen && styles.narrowMainHeadline]}>
                  Secure Entrance.{'\n'}
                  <Text style={styles.highlightHeadline}>Safer Community.</Text>
                </Text>
                <Text style={[styles.subHeadline, !isWideScreen && styles.narrowSubHeadline]}>
                  Helping guards, supervisors and staff verify visitors, manage vehicle entry, and
                  secure every gate checkpoint in real time.
                </Text>
              </View>

              {/* Feature Pills */}
              <View style={[styles.featuresRow, !isWideScreen && styles.narrowFeaturesRow]}>
                <View style={styles.featurePill}>
                  <CircleCheck color={colors.cyanBlue} size={14} />
                  <Text style={styles.featurePillText}>Visitor QR / Pass</Text>
                </View>
                <View style={styles.featurePill}>
                  <CircleCheck color={colors.cyanBlue} size={14} />
                  <Text style={styles.featurePillText}>Vehicle Entry Log</Text>
                </View>
                <View style={styles.featurePill}>
                  <CircleCheck color={colors.cyanBlue} size={14} />
                  <Text style={styles.featurePillText}>Fast OTP Verify</Text>
                </View>
              </View>
            </View>

            {/* Bottom-Up Login Sheet / Card */}
            <View style={[styles.sheetContainer, isWideScreen ? styles.wideSheet : styles.narrowSheet]}>
              {/* Bottom Sheet Grab Handle (Mobile visual cue for scroll-up sheet) */}
              {!isWideScreen && (
                <View style={styles.dragHandleContainer}>
                  <View style={styles.dragHandle} />
                </View>
              )}

              {/* Sheet Header */}
              <View style={styles.sheetHeader}>
                <View style={styles.sheetHeaderIconBox}>
                  <Shield color={colors.electricBlue} size={22} />
                </View>
                <View style={styles.sheetHeaderText}>
                  <Text style={styles.sheetTitle}>Welcome Back</Text>
                  <Text style={styles.sheetSubtitle}>Choose your terminal role to continue</Text>
                </View>
              </View>

              {/* Role Selection Cards */}
              <View style={styles.rolesList}>
                {/* 1. Security Guard (Primary / Featured) */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => navigation.navigate('GuardDashboard')}
                  style={styles.guardCardWrapper}
                >
                  <LinearGradient
                    colors={['#2563EB', '#0EA5E9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.guardCardGradient}
                  >
                    <View style={styles.roleCardIconContainer}>
                      <View style={styles.guardIconCircle}>
                        <Shield color="#FFFFFF" size={22} />
                      </View>
                    </View>
                    <View style={styles.roleCardTextContainer}>
                      <View style={styles.roleCardTitleRow}>
                        <Text style={styles.guardCardTitle}>Security Guard</Text>
                        <View style={styles.primaryTag}>
                          <Text style={styles.primaryTagText}>GATEWAY</Text>
                        </View>
                      </View>
                      <Text style={styles.guardCardDesc}>
                        Visitor verification, gate logs & vehicle entry
                      </Text>
                    </View>
                    <View style={styles.guardArrowCircle}>
                      <ArrowRight color="#FFFFFF" size={18} />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                {/* 2. Supervisor */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('SupervisorDashboard')}
                  style={styles.standardRoleCard}
                >
                  <View style={[styles.roleIconCircle, { backgroundColor: '#EEF2FF' }]}>
                    <Users color="#4F46E5" size={20} />
                  </View>
                  <View style={styles.roleCardTextContainer}>
                    <Text style={styles.standardRoleTitle}>Supervisor</Text>
                    <Text style={styles.standardRoleDesc}>
                      Shift oversight, patrol logs & incident alerts
                    </Text>
                  </View>
                  <View style={styles.standardChevronCircle}>
                    <ChevronRight color={colors.secondaryText} size={18} />
                  </View>
                </TouchableOpacity>

                {/* 3. Administrator */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('AdminDashboard')}
                  style={styles.standardRoleCard}
                >
                  <View style={[styles.roleIconCircle, { backgroundColor: '#F0FDF4' }]}>
                    <Building color="#16A34A" size={20} />
                  </View>
                  <View style={styles.roleCardTextContainer}>
                    <Text style={styles.standardRoleTitle}>Administrator</Text>
                    <Text style={styles.standardRoleDesc}>
                      Community setup, guard roster & analytics
                    </Text>
                  </View>
                  <View style={styles.standardChevronCircle}>
                    <ChevronRight color={colors.secondaryText} size={18} />
                  </View>
                </TouchableOpacity>
              </View>

              {/* Bottom Security Trust & Footnote */}
              <View style={styles.sheetFooter}>
                <View style={styles.securityNote}>
                  <Lock color="#94A3B8" size={13} />
                  <Text style={styles.securityNoteText}>256-bit Gate Terminal Encryption</Text>
                </View>
                <Text style={styles.footerBrandText}>
                  ZIVION Security · Safe access for every community
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060B14',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  // Wide screen (tablet/desktop) layout
  wideScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 64,
    paddingVertical: 48,
    gap: 72,
  },
  // Mobile screen layout: natural flow from top hero to bottom sheet
  narrowScrollContent: {
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 16,
    paddingBottom: 0,
  },

  // Hero Section
  heroSection: {
    maxWidth: 540,
  },
  narrowHeroSection: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(34, 211, 238, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.28)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 16,
    gap: 7,
  },
  pulsingDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#22D3EE',
  },
  statusBadgeText: {
    color: '#22D3EE',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  brandIconContainer: {
    shadowColor: colors.cyanBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  brandIconGradient: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  brandSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  taglineBlock: {
    marginTop: 20,
  },
  mainHeadline: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
    lineHeight: 48,
    letterSpacing: -0.6,
  },
  narrowMainHeadline: {
    fontSize: 28,
    lineHeight: 34,
  },
  highlightHeadline: {
    color: '#38BDF8',
  },
  subHeadline: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    maxWidth: 480,
  },
  narrowSubHeadline: {
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: 8,
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
  },
  narrowFeaturesRow: {
    marginTop: 14,
    gap: 8,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
  },
  featurePillText: {
    color: '#F1F5F9',
    fontSize: 12,
    fontWeight: '600',
  },

  // Sheet / Card Container
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 20,
  },
  wideSheet: {
    width: 440,
    maxWidth: '100%',
    borderRadius: 28,
    padding: 34,
  },
  // Mobile bottom-sheet appearance: curves up from bottom
  narrowSheet: {
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: Platform.OS === 'ios' ? 36 : 28,
  },
  dragHandleContainer: {
    alignItems: 'center',
    paddingVertical: 6,
    marginBottom: 8,
  },
  dragHandle: {
    width: 42,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  sheetHeaderIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  sheetHeaderText: {
    flex: 1,
  },
  sheetTitle: {
    color: '#0F172A',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sheetSubtitle: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 2,
  },

  // Roles list
  rolesList: {
    gap: 12,
  },
  // Primary Guard Card
  guardCardWrapper: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 6,
  },
  guardCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 14,
  },
  roleCardIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  guardIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleCardTextContainer: {
    flex: 1,
  },
  roleCardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  guardCardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  primaryTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  primaryTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  guardCardDesc: {
    color: 'rgba(255, 255, 255, 0.88)',
    fontSize: 12,
    marginTop: 3,
  },
  guardArrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Standard Role Cards (Supervisor & Admin)
  standardRoleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
  },
  roleIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  standardRoleTitle: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700',
  },
  standardRoleDesc: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  standardChevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Sheet Footer
  sheetFooter: {
    marginTop: 18,
    alignItems: 'center',
    gap: 8,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  securityNoteText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
  },
  footerBrandText: {
    color: '#94A3B8',
    fontSize: 11,
    textAlign: 'center',
  },
});
