import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  UserCheck, 
  Clock, 
  MapPin, 
  Phone, 
  ArrowLeft, 
  LogOut,
  Radio,
  Building2,
  Calendar
} from 'lucide-react-native';

interface SupervisorDashboardProps {
  navigation?: any;
}

export const SupervisorDashboard: React.FC<SupervisorDashboardProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.headerLeft}>
          {navigation && (
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login')}
              style={styles.backBtn}
            >
              <ArrowLeft size={20} color={colors.primaryNavy} />
            </TouchableOpacity>
          )}
          <View style={styles.logoBadge}>
            <Building2 size={18} color={colors.cyanBlue} />
          </View>
          <View>
            <Text style={styles.brandTitle}>ZIVION</Text>
            <Text style={styles.subDutyText}>Supervisor Console • Shift Lead</Text>
          </View>
        </View>

        {navigation && (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')}
            style={styles.exitBtn}
          >
            <LogOut size={16} color={colors.secondaryText} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Banner */}
        <LinearGradient
          colors={['#0B1220', '#13213C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBanner}
        >
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.heroGreeting}>Patrol & Post Supervision</Text>
              <Text style={styles.heroSub}>Morning Shift Active • 6 Posts Manning</Text>
            </View>
            <View style={styles.shieldPill}>
              <Radio size={22} color={colors.cyanBlue} />
            </View>
          </View>

          <View style={styles.metricRow}>
            <View style={styles.metricCol}>
              <Text style={styles.metricVal}>6 / 6</Text>
              <Text style={styles.metricLabel}>Posts Active</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricCol}>
              <Text style={[styles.metricVal, { color: colors.success }]}>100%</Text>
              <Text style={styles.metricLabel}>Guard Coverage</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricCol}>
              <Text style={[styles.metricVal, { color: colors.cyanBlue }]}>0</Text>
              <Text style={styles.metricLabel}>Active SOS</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Section: Live Patrols */}
        <Text style={styles.sectionTitle}>Live Guard Posts & Patrols</Text>
        
        <Card style={styles.guardCard}>
          <View style={styles.guardRow}>
            <View style={styles.guardInfo}>
              <View style={[styles.avatar, { backgroundColor: colors.electricBlue + '15' }]}>
                <UserCheck color={colors.electricBlue} size={22} />
              </View>
              <View>
                <Text style={styles.guardName}>Officer John Doe</Text>
                <View style={styles.locationPill}>
                  <MapPin color={colors.secondaryText} size={12} />
                  <Text style={styles.locationText}>Main Gate (Post #01)</Text>
                </View>
              </View>
            </View>

            <View style={styles.guardActionRight}>
              <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
                <Text style={[styles.statusText, { color: colors.success }]}>Active Gate</Text>
              </View>
              <TouchableOpacity 
                onPress={() => Alert.alert('Intercom Call', 'Connecting to Officer John Doe (Post #01)...')}
                style={styles.callIconBtn}
              >
                <Phone size={14} color={colors.primaryNavy} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.guardRow, styles.borderTop]}>
            <View style={styles.guardInfo}>
              <View style={[styles.avatar, { backgroundColor: colors.warning + '15' }]}>
                <UserCheck color={colors.warning} size={22} />
              </View>
              <View>
                <Text style={styles.guardName}>Officer Mike Smith</Text>
                <View style={styles.locationPill}>
                  <MapPin color={colors.secondaryText} size={12} />
                  <Text style={styles.locationText}>Block A Basement Patrol</Text>
                </View>
              </View>
            </View>

            <View style={styles.guardActionRight}>
              <View style={[styles.statusBadge, { backgroundColor: colors.warning + '20' }]}>
                <Text style={[styles.statusText, { color: colors.warning }]}>Patrolling</Text>
              </View>
              <TouchableOpacity 
                onPress={() => Alert.alert('Radio Call', 'Connecting to Officer Mike Smith (Radio Ch 2)...')}
                style={styles.callIconBtn}
              >
                <Phone size={14} color={colors.primaryNavy} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Section: Shift Schedule */}
        <Text style={styles.sectionTitle}>Upcoming Shift Milestones</Text>
        <Card style={styles.scheduleCard}>
          <View style={styles.scheduleItem}>
            <View style={styles.scheduleIconCircle}>
              <Clock color={colors.electricBlue} size={20} />
            </View>
            <View style={styles.scheduleText}>
              <Text style={styles.scheduleTitle}>Shift Handover Briefing</Text>
              <Text style={styles.scheduleTime}>Main Gate Post • Today, 15:45 PM</Text>
            </View>
            <View style={styles.statusBadgeUpcoming}>
              <Text style={styles.statusTextUpcoming}>3h 15m</Text>
            </View>
          </View>

          <View style={[styles.scheduleItem, styles.borderTop]}>
            <View style={[styles.scheduleIconCircle, { backgroundColor: colors.cyanBlue + '20' }]}>
              <Calendar color={colors.primaryNavy} size={20} />
            </View>
            <View style={styles.scheduleText}>
              <Text style={styles.scheduleTitle}>Perimeter Sensor Audit</Text>
              <Text style={styles.scheduleTime}>South Boundary Wall • 17:00 PM</Text>
            </View>
            <View style={styles.statusBadgeUpcoming}>
              <Text style={styles.statusTextUpcoming}>Scheduled</Text>
            </View>
          </View>
        </Card>

        <Button 
          title="Assign Patrol Route" 
          onPress={() => Alert.alert('Patrol Route', 'Opening route assigner for on-duty guards.')} 
          style={styles.actionBtn} 
        />

        {navigation && (
          <TouchableOpacity 
            onPress={() => navigation.navigate('GuardDashboard')}
            style={styles.switchConsoleBtn}
          >
            <Text style={styles.switchConsoleText}>Switch to Guard Gate View →</Text>
          </TouchableOpacity>
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
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    padding: 6,
    marginRight: 6,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryNavy,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primaryNavy,
  },
  subDutyText: {
    fontSize: 11,
    color: colors.secondaryText,
  },
  exitBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  heroBanner: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroGreeting: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroSub: {
    fontSize: 12,
    color: colors.cyanBlue,
    marginTop: 2,
  },
  shieldPill: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    paddingVertical: 10,
  },
  metricCol: {
    flex: 1,
    alignItems: 'center',
  },
  metricVal: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaryNavy,
    marginBottom: 12,
  },
  guardCard: {
    padding: 14,
    marginBottom: 16,
  },
  guardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 12,
    paddingTop: 12,
  },
  guardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  guardName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaryNavy,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  guardActionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  callIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleCard: {
    padding: 14,
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  scheduleIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.electricBlue + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  scheduleText: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryNavy,
  },
  scheduleTime: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 2,
  },
  statusBadgeUpcoming: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusTextUpcoming: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.secondaryText,
  },
  actionBtn: {
    marginVertical: 4,
  },
  switchConsoleBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 8,
  },
  switchConsoleText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.electricBlue,
  },
});
