import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

interface OBDDevice {
  id: string;
  name: string;
}

export function useOBDConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<OBDDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);

  const startScan = async () => {
    if (Platform.OS === 'web') {
      setIsScanning(true);

      setTimeout(() => {
        setDevices([
          { id: 'demo-obd-001', name: 'Konnwei Kdiag' },
          { id: 'demo-obd-002', name: 'OBD2 Adapter' },
        ]);
        setIsScanning(false);
      }, 2000);
      return;
    }

    try {
      setIsScanning(true);
      setDevices([]);

      setTimeout(() => {
        setIsScanning(false);
      }, 10000);

    } catch (error) {
      console.error('Scan error:', error);
      setIsScanning(false);
    }
  };

  const connect = async (deviceId: string) => {
    if (Platform.OS === 'web') {
      setTimeout(() => {
        setIsConnected(true);
        setConnectedDevice(deviceId);
      }, 1000);
      return;
    }

    try {
      setIsConnected(true);
      setConnectedDevice(deviceId);
    } catch (error) {
      console.error('Connection error:', error);
      setIsConnected(false);
      setConnectedDevice(null);
    }
  };

  const disconnect = async () => {
    try {
      setIsConnected(false);
      setConnectedDevice(null);
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  const sendCommand = async (command: string): Promise<string> => {
    if (!isConnected) {
      throw new Error('Not connected to OBD adapter');
    }

    if (Platform.OS === 'web') {
      await new Promise(resolve => setTimeout(resolve, 500));
      return 'OK';
    }

    return 'OK';
  };

  return {
    isConnected,
    isScanning,
    devices,
    connectedDevice,
    startScan,
    connect,
    disconnect,
    sendCommand,
  };
}
