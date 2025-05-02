import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tatasapp.app',
  appName: 'TatasApp',
  webDir: 'www',
  plugins: {
    OneSignal: {
      appId: 'a7ee9282-2595-4c65-834c-2dab2e68d56c'
    }
  }
};

export default config;
