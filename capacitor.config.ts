import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.radio929.app',
  appName: '929.lu',
  webDir: 'dist',
  ios: {
    scheme: 'App929',
    backgroundColor: '#ffffff'
  },
  android: {
    backgroundColor: '#ffffff'
  }
};

export default config;
