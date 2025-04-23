import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.radio929.app',
  appName: '929.lu',
  webDir: 'dist',
  plugins: {
    // Register our native AudioHelper plugin
    AudioHelper: {
      enabled: true
    }
  },
  ios: {
    scheme: 'App929',
    backgroundColor: '#ffffff'
  },
  android: {
    backgroundColor: '#ffffff'
  }
};

export default config;
