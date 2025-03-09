
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.fdc64c95a3834a7083909577cb794769',
  appName: 'heart-map-connect',
  webDir: 'dist',
  server: {
    url: 'https://fdc64c95-a383-4a70-8390-9577cb794769.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
