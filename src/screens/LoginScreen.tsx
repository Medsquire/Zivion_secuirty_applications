import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Shield } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { Button } from '../components/Button';

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
    <ImageBackground source={{ uri: buildingImage }} resizeMode="cover" style={styles.background}>
      <View style={styles.scrim} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={[styles.content, isWideScreen ? styles.wideContent : styles.narrowContent]}>
          <View style={[styles.brandSection, !isWideScreen && styles.narrowBrandSection]}>
            <View style={styles.brand}>
              <View style={styles.brandIcon}>
                <Shield color="#FFFFFF" size={30} />
              </View>
              <View>
                <Text style={styles.brandName}>ZIVION Security</Text>
                <Text style={styles.brandCaption}>Apartment Gate Security</Text>
              </View>
            </View>

            <View style={[styles.message, !isWideScreen && styles.narrowMessage]}>
              <Text style={[styles.title, !isWideScreen && styles.narrowTitle]}>
                Secure Entrance.{'\n'}Safer Community.
              </Text>
              <Text style={[styles.subtitle, !isWideScreen && styles.narrowSubtitle]}>
                Smarter communities start with safer access. Manage visitors, vehicles and entry
                with confidence.
              </Text>
            </View>
          </View>

          <View style={styles.loginPanel}>
            <View style={styles.panelIcon}>
              <Shield color={colors.electricBlue} size={28} />
            </View>
            <Text style={styles.panelTitle}>Welcome back</Text>
            <Text style={styles.panelSubtitle}>Select your role to continue</Text>

            <View style={styles.buttonContainer}>
              <Button
                title="Login as Security Guard"
                onPress={() => navigation.navigate('GuardDashboard')}
                style={styles.button}
              />
              <Button
                title="Login as Supervisor"
                onPress={() => navigation.navigate('SupervisorDashboard')}
                variant="secondary"
                style={styles.button}
              />
              <Button
                title="Login as Admin"
                onPress={() => navigation.navigate('AdminDashboard')}
                variant="outline"
                style={styles.button}
              />
            </View>
            <Text style={styles.footer}>ZIVION Security · Safe access for every community</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.primaryNavy,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(5, 12, 27, 0.64)',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  wideContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 64,
    paddingVertical: 40,
    gap: 72,
  },
  narrowContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 28,
    gap: 28,
  },
  brandSection: {
    flex: 1,
    maxWidth: 560,
  },
  narrowBrandSection: {
    flex: 0,
    width: '100%',
    alignItems: 'center',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  brandCaption: {
    color: 'rgba(255, 255, 255, 0.76)',
    fontSize: 12,
    marginTop: 3,
  },
  message: {
    marginTop: 64,
  },
  narrowMessage: {
    alignItems: 'center',
    marginTop: 22,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '800',
    lineHeight: 56,
    letterSpacing: -0.8,
  },
  narrowTitle: {
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.82)',
    fontSize: 17,
    lineHeight: 26,
    marginTop: 18,
    maxWidth: 480,
  },
  narrowSubtitle: {
    textAlign: 'center',
    marginTop: 10,
  },
  loginPanel: {
    width: 420,
    maxWidth: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.24,
    shadowRadius: 32,
    elevation: 12,
  },
  panelIcon: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    marginBottom: 20,
  },
  panelTitle: {
    color: colors.primaryNavy,
    fontSize: 26,
    fontWeight: '800',
  },
  panelSubtitle: {
    color: colors.secondaryText,
    fontSize: 15,
    marginTop: 8,
    marginBottom: 26,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: 14,
  },
  footer: {
    color: colors.secondaryText,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 10,
  },
});
