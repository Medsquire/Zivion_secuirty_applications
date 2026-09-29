import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { Card } from '../components/Card';
import { ShieldAlert, Users, ClipboardList, Settings } from 'lucide-react-native';

export const AdminDashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <Text style={styles.headerSubtitle}>System Overview</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.statsContainer}>
            <Card style={styles.statCard}>
              <Users color={colors.electricBlue} size={24} />
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Active Guards</Text>
            </Card>
            <Card style={styles.statCard}>
              <ShieldAlert color={colors.warning} size={24} />
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Incidents</Text>
            </Card>
          </View>

          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Card>
            <View style={styles.activityItem}>
              <View style={[styles.dot, { backgroundColor: colors.success }]} />
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>Shift Change Completed</Text>
                <Text style={styles.activityTime}>Gate A • 10 mins ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.dot, { backgroundColor: colors.warning }]} />
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>Visitor Overstay Alert</Text>
                <Text style={styles.activityTime}>Block B • 25 mins ago</Text>
              </View>
            </View>
          </Card>

          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Card>
            <View style={styles.actionRow}>
              <View style={styles.actionItem}>
                <ClipboardList color={colors.electricBlue} size={24} />
                <Text style={styles.actionText}>Reports</Text>
              </View>
              <View style={styles.actionItem}>
                <Users color={colors.cyanBlue} size={24} />
                <Text style={styles.actionText}>Staff</Text>
              </View>
              <View style={styles.actionItem}>
                <Settings color={colors.secondaryText} size={24} />
                <Text style={styles.actionText}>Settings</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primaryNavy,
    padding: 24,
    paddingTop: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: colors.cyanBlue,
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    padding: 20,
    marginTop: -20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    padding: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primaryNavy,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primaryNavy,
    marginBottom: 12,
    marginTop: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  activityTime: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionItem: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: colors.text,
    marginTop: 8,
    fontWeight: '500',
  }
});
