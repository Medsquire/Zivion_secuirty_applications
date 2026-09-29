import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { Card } from '../components/Card';
import { QrCode, AlertTriangle, UserPlus, FileText } from 'lucide-react-native';

export const GuardDashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Guard Console</Text>
          <Text style={styles.headerSubtitle}>Post: Main Gate • Status: Active</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.grid}>
            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.iconContainer, { backgroundColor: colors.electricBlue + '15' }]}>
                <QrCode color={colors.electricBlue} size={28} />
              </View>
              <Text style={styles.gridText}>Scan QR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.iconContainer, { backgroundColor: colors.cyanBlue + '15' }]}>
                <UserPlus color={colors.cyanBlue} size={28} />
              </View>
              <Text style={styles.gridText}>New Visitor</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.iconContainer, { backgroundColor: colors.warning + '15' }]}>
                <FileText color={colors.warning} size={28} />
              </View>
              <Text style={styles.gridText}>Log Entry</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem}>
              <View style={[styles.iconContainer, { backgroundColor: colors.error + '15' }]}>
                <AlertTriangle color={colors.error} size={28} />
              </View>
              <Text style={styles.gridText}>SOS Alert</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Recent Deliveries & Visitors</Text>
          <Card>
            <View style={styles.listItem}>
              <View style={[styles.listIcon, { backgroundColor: colors.success + '20' }]} />
              <View style={styles.listTextContainer}>
                <Text style={styles.listTitle}>Amazon Delivery</Text>
                <Text style={styles.listSubtitle}>Apt 402 • 10:23 AM</Text>
              </View>
              <Text style={[styles.statusText, { color: colors.success }]}>Cleared</Text>
            </View>

            <View style={[styles.listItem, { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 12, paddingTop: 12 }]}>
              <View style={[styles.listIcon, { backgroundColor: colors.warning + '20' }]} />
              <View style={styles.listTextContainer}>
                <Text style={styles.listTitle}>Guest: Sarah Connor</Text>
                <Text style={styles.listSubtitle}>Apt 105 • 10:45 AM</Text>
              </View>
              <Text style={[styles.statusText, { color: colors.warning }]}>Pending</Text>
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primaryNavy,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  gridItem: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gridText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  listTextContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  listSubtitle: {
    fontSize: 13,
    color: colors.secondaryText,
    marginTop: 2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  }
});
