// Design System Specification: Color Palette & Frosted Glassmorphism Tokens
export const colors = {
  // Existing keys for backwards compatibility
  primaryNavy: '#0B1220',
  electricBlue: '#2563EB',
  skyBlue: '#3B82F6',
  skyBlueLight: '#38A4F7',
  cyanBlue: '#38A4F7',
  deepNavy: '#1D4ED8',
  sapphire: '#0A396E',
  background: '#F0F6FF',
  darkBackground: '#090D16',
  card: 'rgba(255, 255, 255, 0.90)',
  text: '#000000',
  secondaryText: 'rgba(0, 0, 0, 0.50)',
  border: 'rgba(226, 232, 240, 0.8)',
  borderLight: 'rgba(255, 255, 255, 0.95)',
  white: '#FFFFFF',

  // Status colors with translucent backgrounds
  success: '#059669',
  successBg: 'rgba(16, 185, 129, 0.12)',
  warning: '#D97706',
  warningBg: 'rgba(245, 158, 11, 0.12)',
  error: '#E11D48',
  danger: '#E11D48',
  dangerBg: 'rgba(244, 63, 94, 0.12)',
  resolved: 'rgba(226, 232, 240, 0.8)',

  // Typography hierarchy
  textHeading: '#000000',
  textBody: 'rgba(0, 0, 0, 0.75)',
  textCaption: 'rgba(0, 0, 0, 0.50)',

  // Glass tokens
  glass: {
    cardGradient: [
      'rgba(255, 255, 255, 0.92)',
      'rgba(248, 251, 255, 0.78)',
      'rgba(239, 246, 255, 0.74)',
    ] as const,
    cardBorder: 'rgba(255, 255, 255, 0.95)',
    cardShadow: 'rgba(37, 99, 235, 0.11)',
    activeGradient: [
      'rgba(239, 246, 255, 0.92)',
      'rgba(224, 237, 254, 0.78)',
      'rgba(255, 255, 255, 0.84)',
    ] as const,
    activeBorder: 'rgba(191, 219, 254, 0.75)',
    dockGradient: [
      'rgba(255, 255, 255, 0.28)',
      'rgba(226, 240, 255, 0.18)',
      'rgba(255, 255, 255, 0.26)',
    ] as const,
    dockBorder: 'rgba(255, 255, 255, 0.72)',
    inputBg: 'rgba(255, 255, 255, 0.70)',
    inputBorder: 'rgba(255, 255, 255, 0.90)',
  },
};

export const gradients = {
  primary: ['#2563EB', '#3B82F6'] as const,
  primaryButton: ['#2563EB', '#3B82F6'] as const,
  secondary: ['#1D4ED8', '#38A4F7'] as const,
  lightBackground: ['#F0F6FF', '#E9F2FE', '#F5F9FF'] as const,
  darkBackground: ['#090D16', '#0F172A', '#111827'] as const,
  cardBase: [
    'rgba(255, 255, 255, 0.92)',
    'rgba(248, 251, 255, 0.78)',
    'rgba(239, 246, 255, 0.74)',
  ] as const,
  cardActive: [
    'rgba(239, 246, 255, 0.92)',
    'rgba(224, 237, 254, 0.78)',
    'rgba(255, 255, 255, 0.84)',
  ] as const,
  dock: [
    'rgba(255, 255, 255, 0.28)',
    'rgba(226, 240, 255, 0.18)',
    'rgba(255, 255, 255, 0.26)',
  ] as const,
};
