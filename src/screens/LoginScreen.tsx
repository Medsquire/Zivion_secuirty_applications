import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { Button } from '../components/Button';
import { Shield } from 'lucide-react-native';

export const LoginScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Shield color={colors.electricBlue} size={64} />
          <Text style={styles.title}>ZIVION Security</Text>
          <Text style={styles.subtitle}>Smarter Communities. Better Living.</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.loginText}>Select your role to login:</Text>
          
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primaryNavy,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.secondaryText,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  loginText: {
    fontSize: 14,
    color: colors.secondaryText,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginBottom: 16,
  }
});
