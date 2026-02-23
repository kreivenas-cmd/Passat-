import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Bluetooth, CheckCircle, XCircle, RefreshCw } from 'lucide-react-native';
import { useOBDConnection } from '@/hooks/useOBDConnection';

export default function ConnectionTab() {
  const { isConnected, isScanning, devices, connect, disconnect, startScan } = useOBDConnection();
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Bluetooth size={32} color="#1e40af" />
        <Text style={styles.title}>OBD Prisijungimas</Text>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Būsena:</Text>
          <View style={styles.statusIndicator}>
            {isConnected ? (
              <>
                <CheckCircle size={20} color="#22c55e" />
                <Text style={[styles.statusText, styles.connected]}>Prijungta</Text>
              </>
            ) : (
              <>
                <XCircle size={20} color="#ef4444" />
                <Text style={[styles.statusText, styles.disconnected]}>Atjungta</Text>
              </>
            )}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prieinami įrenginiai</Text>

        <TouchableOpacity
          style={[styles.button, isScanning && styles.buttonDisabled]}
          onPress={startScan}
          disabled={isScanning || isConnected}>
          <RefreshCw size={20} color="white" />
          <Text style={styles.buttonText}>
            {isScanning ? 'Ieškoma...' : 'Ieškoti įrenginių'}
          </Text>
        </TouchableOpacity>

        <ScrollView style={styles.deviceList}>
          {devices.length === 0 ? (
            <Text style={styles.emptyText}>
              Nerasta įrenginių. Paspauskite "Ieškoti įrenginių" mygtuką.
            </Text>
          ) : (
            devices.map((device) => (
              <TouchableOpacity
                key={device.id}
                style={[
                  styles.deviceItem,
                  selectedDevice === device.id && styles.deviceItemSelected,
                ]}
                onPress={() => setSelectedDevice(device.id)}>
                <View>
                  <Text style={styles.deviceName}>{device.name || 'Nežinomas įrenginys'}</Text>
                  <Text style={styles.deviceId}>{device.id}</Text>
                </View>
                <Bluetooth size={20} color="#6b7280" />
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>

      <View style={styles.actionButtons}>
        {!isConnected ? (
          <TouchableOpacity
            style={[styles.primaryButton, !selectedDevice && styles.buttonDisabled]}
            onPress={() => selectedDevice && connect(selectedDevice)}
            disabled={!selectedDevice}>
            <Text style={styles.primaryButtonText}>Prisijungti</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.primaryButton, styles.disconnectButton]}
            onPress={disconnect}>
            <Text style={styles.primaryButtonText}>Atjungti</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 12,
    color: '#1f2937',
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  connected: {
    color: '#22c55e',
  },
  disconnected: {
    color: '#ef4444',
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  deviceList: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
    marginTop: 20,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  deviceItemSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  deviceId: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  actionButtons: {
    marginTop: 16,
  },
  primaryButton: {
    backgroundColor: '#1e40af',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  disconnectButton: {
    backgroundColor: '#ef4444',
  },
});
