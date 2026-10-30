import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Shield, 
  Users, 
  Car, 
  AlertTriangle, 
  Plus 
} from 'lucide-react-native';
import { colors, gradients } from '../theme/colors';

export type TabType = 'overview' | 'visitors' | 'vehicles' | 'alerts';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onQuickActionPress: () => void;
  visitorCount?: number;
  alertCount?: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  onQuickActionPress,
  visitorCount = 8,
  alertCount = 2,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        
        {/* Tab 1: Console / Overview */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onTabChange('overview')}
          style={styles.tabItem}
        >
          <View style={[styles.iconBox, activeTab === 'overview' && styles.activeIconBox]}>
            <Shield 
              size={22} 
              color={activeTab === 'overview' ? colors.electricBlue : colors.secondaryText} 
            />
          </View>
          <Text style={[styles.tabLabel, activeTab === 'overview' && styles.activeTabLabel]}>
            Console
          </Text>
        </TouchableOpacity>

        {/* Tab 2: Visitors */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onTabChange('visitors')}
          style={styles.tabItem}
        >
          <View style={[styles.iconBox, activeTab === 'visitors' && styles.activeIconBox]}>
            <Users 
              size={22} 
              color={activeTab === 'visitors' ? colors.electricBlue : colors.secondaryText} 
            />
            {visitorCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{visitorCount}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.tabLabel, activeTab === 'visitors' && styles.activeTabLabel]}>
            Visitors
          </Text>
        </TouchableOpacity>

        {/* Center Raised Floating Action Button (FAB) */}
        <View style={styles.fabContainer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onQuickActionPress}
            style={styles.fabTouchable}
          >
            <LinearGradient
              colors={gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.fabGradient}
            >
              <Plus size={28} color="#FFFFFF" strokeWidth={2.5} />
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.fabLabel}>Quick In</Text>
        </View>

        {/* Tab 3: Vehicles */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onTabChange('vehicles')}
          style={styles.tabItem}
        >
          <View style={[styles.iconBox, activeTab === 'vehicles' && styles.activeIconBox]}>
            <Car 
              size={22} 
              color={activeTab === 'vehicles' ? colors.electricBlue : colors.secondaryText} 
            />
          </View>
          <Text style={[styles.tabLabel, activeTab === 'vehicles' && styles.activeTabLabel]}>
            Vehicles
          </Text>
        </TouchableOpacity>

        {/* Tab 4: SOS / Alerts */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onTabChange('alerts')}
          style={styles.tabItem}
        >
          <View style={[styles.iconBox, activeTab === 'alerts' && styles.activeAlertIconBox]}>
            <AlertTriangle 
              size={22} 
              color={activeTab === 'alerts' ? colors.error : colors.secondaryText} 
            />
            {alertCount > 0 && (
              <View style={styles.alertBadge}>
                <Text style={styles.badgeText}>{alertCount}</Text>
              </View>
            )}
          </View>
          <Text style={[
            styles.tabLabel, 
            activeTab === 'alerts' ? styles.activeAlertLabel : null
          ]}>
            SOS
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 50,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    height: Platform.OS === 'ios' ? 84 : 70,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 58,
    paddingVertical: 2,
  },
  iconBox: {
    width: 36,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeIconBox: {
    backgroundColor: colors.electricBlue + '15',
  },
  activeAlertIconBox: {
    backgroundColor: colors.error + '15',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.secondaryText,
    marginTop: 2,
  },
  activeTabLabel: {
    color: colors.electricBlue,
    fontWeight: '700',
  },
  activeAlertLabel: {
    color: colors.error,
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: colors.success,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  alertBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  fabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
  },
  fabTouchable: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: colors.electricBlue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryNavy,
    marginTop: 3,
  },
});
