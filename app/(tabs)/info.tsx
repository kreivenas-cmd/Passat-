import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Info, AlertCircle, ExternalLink, Car } from 'lucide-react-native';

export default function InfoTab() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Info size={32} color="#1e40af" />
        <Text style={styles.title}>Informacija</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Car size={24} color="#1e40af" />
          <Text style={styles.cardTitle}>Palaikomi automobiliai</Text>
        </View>
        <Text style={styles.cardText}>
          • VW Passat B6 (2005-2010) Automatinė greičių dėžė{'\n'}
          • Variklis: Visi benzininiai ir dyzeliniai variantai{'\n'}
          • Greičių dėžė: DSG / Tiptronic{'\n'}
          • Valdymo blokas: 09G / 09M
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <AlertCircle size={24} color="#f59e0b" />
          <Text style={styles.cardTitle}>Kada atlikti adaptaciją?</Text>
        </View>
        <Text style={styles.cardText}>
          Greičių dėžės adaptaciją rekomenduojama atlikti:{'\n\n'}
          • Po greičių dėžės remonto ar keitimo{'\n'}
          • Po greičių dėžės alyvos keitimo{'\n'}
          • Kai jaučiami perjungimo smūgiai{'\n'}
          • Kai greičiai perjunginėjami su vėlavimu{'\n'}
          • Po valdymo bloko programavimo{'\n'}
          • Kai atsiranda klaidų kodai, susiję su greičių dėže
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pasiruošimas</Text>
        <Text style={styles.cardText}>
          Prieš pradedant adaptaciją:{'\n\n'}
          1. Įsitikinkite, kad variklis yra įšilęs iki darbinės temperatūros (80-90°C){'\n'}
          2. Automobilis turi stovėti ant lygaus paviršiaus{'\n'}
          3. Įjunkite stovėjimo stabdį{'\n'}
          4. Perkėlimas į padėtį "P" (parkavimas){'\n'}
          5. Išjunkite visus elektros vartotojus (kondicionierių, šildytuvus, radiją){'\n'}
          6. Užtikrinkite, kad akumuliatorius yra pilnai įkrautas
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Po adaptacijos</Text>
        <Text style={styles.cardText}>
          Sėkmingai atlikus adaptaciją:{'\n\n'}
          • Pirmąsias 20-30 km važiuokite ramiai{'\n'}
          • Stenkitės perjunginėti per visus greičius{'\n'}
          • Sistema mokysis jūsų vairavimo stiliaus{'\n'}
          • Venkite staigių pagreitinimų{'\n'}
          • Optimalus adaptacijos procesas trunka apie 50-100 km
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>OBD adapteris</Text>
        <Text style={styles.cardText}>
          Ši programėlė sukurta darbui su Konnwei Kdiag OBD-II adapteriu.{'\n\n'}
          Adapterio prijungimas:{'\n'}
          1. Raskite OBD-II jungtį automobilyje (paprastai po vairuotojo valdymo pultU){'\n'}
          2. Įkiškite adapterį į jungtį{'\n'}
          3. Įjunkite užvedimą (pozicija II){'\n'}
          4. Įjunkite Bluetooth telefone{'\n'}
          5. Programėlėje paspauskite "Ieškoti įrenginių"
        </Text>
      </View>

      <View style={[styles.card, styles.warningCard]}>
        <View style={styles.cardHeader}>
          <AlertCircle size={24} color="#dc2626" />
          <Text style={[styles.cardTitle, styles.warningTitle]}>Atsakomybės apribojimas</Text>
        </View>
        <Text style={styles.warningText}>
          Ši programėlė skirta tik informaciniams ir švietimo tikslams.
          Naudodami šią programėlę, jūs prisiimate visą atsakomybę už jos naudojimą.{'\n\n'}
          Autorius neprisiima atsakomybės už galimus pažeidimus automobiliui ar jo sistemoms.{'\n\n'}
          Rekomenduojame adaptaciją atlikti tik įgudusiems vartotojams arba kreiptis į profesionalus.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>VW Passat B6 Adaptacija v1.0</Text>
        <Text style={styles.footerText}>© 2024</Text>
      </View>
    </ScrollView>
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
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 24,
  },
  warningCard: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  warningTitle: {
    color: '#dc2626',
  },
  warningText: {
    fontSize: 14,
    color: '#991b1b',
    lineHeight: 24,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 32,
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
});
