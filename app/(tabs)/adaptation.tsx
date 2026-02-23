import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { Gauge, AlertTriangle, Play, CheckCircle, XCircle } from 'lucide-react-native';
import { useOBDConnection } from '@/hooks/useOBDConnection';
import { useTransmissionAdaptation } from '@/hooks/useTransmissionAdaptation';

export default function AdaptationTab() {
  const { isConnected } = useOBDConnection();
  const {
    isAdapting,
    progress,
    status,
    startAdaptation,
    resetAdaptation,
  } = useTransmissionAdaptation();

  const [showWarning, setShowWarning] = useState(true);

  const handleStartAdaptation = () => {
    if (!isConnected) {
      Alert.alert(
        'Klaida',
        'Prašome pirmiausia prisijungti prie OBD adapterio.',
        [{ text: 'Gerai' }]
      );
      return;
    }

    Alert.alert(
      'Patvirtinkite adaptaciją',
      'Ar tikrai norite pradėti greičių dėžės adaptaciją? Įsitikinkite, kad variklis yra įšilęs iki darbinės temperatūros ir automobilis yra nejudančioje padėtyje.',
      [
        { text: 'Atšaukti', style: 'cancel' },
        {
          text: 'Pradėti',
          style: 'destructive',
          onPress: () => {
            setShowWarning(false);
            startAdaptation();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Gauge size={32} color="#1e40af" />
        <Text style={styles.title}>Greičių dėžės adaptacija</Text>
      </View>

      {showWarning && (
        <View style={styles.warningCard}>
          <AlertTriangle size={24} color="#f59e0b" />
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Svarbu!</Text>
            <Text style={styles.warningText}>
              • Variklis turi būti įšilęs iki darbinės temperatūros{'\n'}
              • Automobilis turi stovėti nejudėdamas{'\n'}
              • Įjunkite stovėjimo stabdį{'\n'}
              • Variklį palaikykite tuščiąja eiga{'\n'}
              • Nepaspauskite akceleratoriaus pedalo{'\n'}
              • Procesui reikės apie 5-10 minučių
            </Text>
          </View>
        </View>
      )}

      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>OBD būsena:</Text>
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

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>VW Passat B6 (2010) Automatas</Text>
          <Text style={styles.infoText}>
            Ši procedūra atliks automatinės greičių dėžės adaptacijos nustatymą iš naujo.
            Tai padeda pašalinti perjungimo problemas ir užtikrina sklandų greičių perjungimą.
          </Text>
        </View>

        {isAdapting && (
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>Adaptacijos eiga</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
            <Text style={styles.statusMessage}>{status}</Text>
          </View>
        )}

        {!isAdapting && progress === 100 && (
          <View style={styles.successCard}>
            <CheckCircle size={48} color="#22c55e" />
            <Text style={styles.successTitle}>Adaptacija sėkminga!</Text>
            <Text style={styles.successText}>
              Greičių dėžės adaptacija užbaigta. Prašome pravažiuoti apie 20 km normaliu režimu,
              kad sistema galėtų susimokyti jūsų vairavimo stiliaus.
            </Text>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={resetAdaptation}>
              <Text style={styles.secondaryButtonText}>Užbaigti</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.steps}>
          <Text style={styles.stepsTitle}>Adaptacijos žingsniai:</Text>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>Prisijungimas prie greičių dėžės valdymo bloko</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>Dabartinių adaptacijos reikšmių nuskaitymas</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>Adaptacijos reikšmių nustatymas iš naujo</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>4</Text>
            <Text style={styles.stepText}>Naujos adaptacijos inicializavimas</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>5</Text>
            <Text style={styles.stepText}>Patikrinimas ir patvirtinimas</Text>
          </View>
        </View>
      </ScrollView>

      {!isAdapting && progress !== 100 && (
        <TouchableOpacity
          style={[
            styles.primaryButton,
            !isConnected && styles.buttonDisabled,
          ]}
          onPress={handleStartAdaptation}
          disabled={!isConnected || isAdapting}>
          <Play size={20} color="white" />
          <Text style={styles.primaryButtonText}>Pradėti adaptaciją</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 12,
    color: '#1f2937',
  },
  warningCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400e',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 13,
    color: '#78350f',
    lineHeight: 20,
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  content: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  progressText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 8,
  },
  statusMessage: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  successCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#86efac',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#166534',
    marginTop: 12,
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: '#15803d',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  steps: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 14,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 28,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e40af',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  secondaryButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
