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
import { 
  ShieldAlert, 
  Users, 
  ClipboardList, 
  Settings, 
  Building2, 
  ArrowLeft, 
  LogOut,
  Car,
  CheckCircle2,
  Activity
} from 'lucide-react-native';

interface AdminDashboardProps {
  navigation?: any;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigation }) => {
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
            <Text style={styles.subDutyText}>Estate & Security Administration</Text>
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
        
        {/* Banner: Campus Overview */}
        <LinearGradient
          colors={['#0B1220', '#13213C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBanner}
        >
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.heroGreeting}>Executive Security Admin</Text>
              <Text style={styles.heroSub}>All Gates, Barriers & Perimeters Online</Text>
            </View>
            <View style={styles.badgePill}>
              <Activity size={22} color={colors.cyanBlue} />
            </View>
          </View>

          <View style={styles.metricRow}>
            <View style={styles.metricCol}>
              <Text style={styles.metricVal}>24</Text>
              <Text style={styles.metricLabel}>Total Staff</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricCol}>
              <Text style={[styles.metricVal, { color: colors.success }]}>142</Text>
              <Text style={styles.metricLabel}>Today Entries</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricCol}>
              <Text style={[styles.metricVal, { color: colors.warning }]}>1</Text>
              <Text style={styles.metricLabel}>Open Issue</Text>
            </View>
          </View>
        </LinearGradient>

        {/* 2x2 Primary KPI Metric Cards */}
        <Text style={styles.sectionTitle}>Facility Health & Access</Text>
        <View style={styles.kpiGrid}>
          <Card style={styles.kpiCard}>
            <View style={[styles.kpiIconBox, { backgroundColor: colors.electricBlue + '15' }]}>
              <Users size={22} color={colors.electricBlue} />
            </View>
            <Text style={styles.kpiValue}>24</Text>
            <Text style={styles.kpiLabel}>Active Guards on Duty</Text>
          </Card>

          <Card style={styles.kpiCard}>
            <View style={[styles.kpiIconBox, { backgroundColor: colors.warning + '15' }]}>
              <ShieldAlert size={22} color={colors.warning} />
            </View>
            <Text style={[styles.kpiValue, { color: colors.warning }]}>1</Text>
            <Text style={styles.kpiLabel}>Overstay Warnings</Text>
          </Card>

          <Card style={styles.kpiCard}>
            <View style={[styles.kpiIconBox, { backgroundColor: colors.cyanBlue + '20' }]}>
              <Car size={22} color={colors.primaryNavy} />
            </View>
            <Text style={styles.kpiValue}>86</Text>
            <Text style={styles.kpiLabel}>Resident Vehicles In</Text>
          </Card>

          <Card style={styles.kpiCard}>
            <View style={[styles.kpiIconBox, { backgroundColor: colors.success + '15' }]}>
              <CheckCircle2 size={22} color={colors.success} />
            </View>
            <Text style={[styles.kpiValue, { color: colors.success }]}>99.4%</Text>
            <Text style={styles.kpiLabel}>Barrier Uptime</Text>
          </Card>
        </View>

        {/* Recent Activity Log */}
        <Text style={styles.sectionTitle}>Live Audit Trail</Text>
        <Card style={styles.auditCard}>
          <View style={styles.activityItem}>
            <View style={[styles.dot, { backgroundColor: colors.success }]} />
            <View style={styles.activityText}>
              <Text style={styles.activityTitle}>Shift Change Confirmed</Text>
              <Text style={styles.activitySub}>Gate A & Gate B manned by Shift Team Alpha</Text>
              <Text style={styles.activityTime}>10 mins ago</Text>
            </View>
          </View>

          <View style={[styles.activityItem, styles.borderTop]}>
            <View style={[styles.dot, { backgroundColor: colors.warning }]} />
            <View style={styles.activityText}>
              <Text style={styles.activityTitle}>Commercial Delivery Overstay</Text>
              <Text style={styles.activitySub}>Vehicle MH04-CD-5678 overstayed 30 mins at Block B</Text>
              <Text style={styles.activityTime}>25 mins ago</Text>
            </View>
          </View>

          <View style={[styles.activityItem, styles.borderTop]}>
            <View style={[styles.dot, { backgroundColor: colors.electricBlue }]} />
            <View style={styles.activityText}>
              <Text style={styles.activityTitle}>Emergency Sensor Heartbeat Passed</Text>
              <Text style={styles.activitySub}>Perimeter fence voltage & panic buttons verified</Text>
              <Text style={styles.activityTime}>1 hour ago</Text>
            </View>
          </View>
        </Card>

        {/* Management Quick Actions */}
        <Text style={styles.sectionTitle}>Management Modules</Text>
        <Card style={styles.actionCard}>
          <View style={styles.actionRow}>
            <TouchableOpacity 
              onPress={() => Alert.alert('Reports', 'Generating monthly gate pass and visitor report...')}
              style={styles.actionItem}
            >
              <View style={[styles.actionIconBox, { backgroundColor: colors.electricBlue + '15' }]}>
                <ClipboardList color={colors.electricBlue} size={22} />
              </View>
              <Text style={styles.actionText}>Audit Reports</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => Alert.alert('Staff', 'Viewing roster for 24 security personnel.')}
              style={styles.actionItem}
            >
              <View style={[styles.actionIconBox, { backgroundColor: colors.cyanBlue + '20' }]}>
                <Users color={colors.primaryNavy} size={22} />
              </View>
              <Text style={styles.actionText}>Guard Roster</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => Alert.alert('Settings', 'Accessing gate pass policies and siren volume controls.')}
              style={styles.actionItem}
            >
              <View style={[styles.actionIconBox, { backgroundColor: '#F1F5F9' }]}>
                <Settings color={colors.secondaryText} size={22} />
              </View>
              <Text style={styles.actionText}>Gate Rules</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {navigation && (
          <TouchableOpacity 
            onPress={() => navigation.navigate('GuardDashboard')}
            style={styles.switchConsoleBtn}
          >
            <Text style={styles.switchConsoleText}>Switch to Guard Gate Console →</Text>
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
  badgePill: {
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
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  kpiCard: {
    width: '48%',
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primaryNavy,
  },
  kpiLabel: {
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 2,
    textAlign: 'center',
    fontWeight: '500',
  },
  auditCard: {
    padding: 14,
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 10,
    paddingTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
    marginRight: 10,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryNavy,
  },
  activitySub: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 1,
  },
  activityTime: {
    fontSize: 10,
    color: colors.secondaryText,
    marginTop: 3,
    fontWeight: '500',
  },
  actionCard: {
    padding: 16,
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionItem: {
    alignItems: 'center',
  },
  actionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryNavy,
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
