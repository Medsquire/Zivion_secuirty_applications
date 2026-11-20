import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../theme/colors';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  active?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, style, active = false }) => {
  const gradientColors = active ? gradients.cardActive : gradients.cardBase;

  return (
    <View style={[styles.cardWrapper, active && styles.activeCardWrapper, style]}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.glass.cardBorder,
    overflow: 'hidden',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.11,
    shadowRadius: 28,
    elevation: 3,
    marginBottom: 16,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 10px 28px -8px rgba(37, 99, 235, 0.11), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
      } as any,
    }),
  },
  activeCardWrapper: {
    borderColor: colors.glass.activeBorder,
  },
  gradientContainer: {
    padding: 18,
  },
});
