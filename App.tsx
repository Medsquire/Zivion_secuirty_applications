import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './src/screens/LoginScreen';
import { AdminDashboard } from './src/screens/AdminDashboard';
import { SupervisorDashboard } from './src/screens/SupervisorDashboard';
import { GuardDashboard } from './src/screens/GuardDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="SupervisorDashboard" component={SupervisorDashboard} />
        <Stack.Screen name="GuardDashboard" component={GuardDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
