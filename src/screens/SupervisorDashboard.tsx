import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { UserCheck, Clock, MapPin } from 'lucide-react-native';

export const SupervisorDashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Supervisor View</Text>
          <Text style={styles.headerSubtitle}>Shift: Morning (08:00 - 16:00)</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Active Patrols</Text>
          
          <Card>
            <View style={styles.guardRow}>
              <View style={styles.guardInfo}>
                <View style={styles.avatar}>
                  <UserCheck color={colors.electricBlue} size={20} />
                </View>
                <View>
                  <Text style={styles.guardName}>John Doe</Text>
                  <Text style={styles.guardLocation}>
                    <MapPin color={colors.secondaryText} size={12} /> Main Gate
                  </Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
                <Text style={[styles.statusText, { color: colors.success }]}>Active</Text>
              </View>
            </View>

            <View style={[styles.guardRow, { marginTop: 16, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 16 }]}>
              <View style={styles.guardInfo}>
                <View style={styles.avatar}>
                  <UserCheck color={colors.electricBlue} size={20} />
                </View>
                <View>
                  <Text style={styles.guardName}>Mike Smith</Text>
                  <Text style={styles.guardLocation}>
                    <MapPin color={colors.secondaryText} size={12} /> Block A Basement
                  </Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: colors.warning + '20' }]}>
                <Text style={[styles.statusText, { color: colors.warning }]}>Patrolling</Text>
              </View>
            </View>
          </Card>

          <Text style={styles.sectionTitle}>Schedule</Text>
          <Card>
            <View style={styles.scheduleItem}>
              <Clock color={colors.cyanBlue} size={20} />
              <View style={styles.scheduleText}>
                <Text style={styles.scheduleTitle}>Shift Handover</Text>
                <Text style={styles.scheduleTime}>Today, 15:45 PM</Text>
              </View>
            </View>
          </Card>

          <Button title="Assign Patrol Route" onPress={() => {}} style={{ marginTop: 12 }} />
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primaryNavy,
    marginBottom: 12,
  },
  guardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  guardName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  guardLocation: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleText: {
    marginLeft: 12,
  },
  scheduleTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
  scheduleTime: {
    fontSize: 13,
    color: colors.secondaryText,
    marginTop: 2,
  }
});
