# VW Passat B6 Greičių dėžės adaptacija

Android programėlė VW Passat B6 automatinės greičių dėžės adaptacijai naudojant Konnwei Kdiag OBD-II adapterį.

## Funkcionalumas

- Prisijungimas prie OBD-II adapterio per Bluetooth
- Automatinės greičių dėžės adaptacijos procedūra
- Išsami informacija ir instrukcijos lietuvių kalba
- Žingsnis po žingsnio vedlys

## Palaikomi automobiliai

- VW Passat B6 (2005-2010)
- Automatinė greičių dėžė (DSG / Tiptronic)
- Valdymo blokas: 09G / 09M

## Techniniai reikalavimai

- Android įrenginys su Bluetooth
- Konnwei Kdiag OBD-II adapteris
- Įšilęs variklis (80-90°C)
- Pilnai įkrautas akumuliatorius

## Saugumas

SVARBU: Naudokite šią programėlę tik jei žinote ką darote. Neteisingai atlikta adaptacija gali sukelti greičių dėžės problemų.

## Diegimas ir naudojimas

### Web versija (Demo režimas)

Programėlė veikia web naršyklėje su demo režimu. Tikram naudojimui reikia native Android build.

### Native Android build

Norint naudoti su tikru OBD adapteriu:

1. Išeksportuokite projektą:
```bash
npx expo prebuild
```

2. Sukurkite Android APK:
```bash
npm run android
```

3. Arba sukurkite development build:
```bash
npx expo install expo-dev-client
npx expo run:android
```

## Bluetooth leidimų konfigūracija

App.json failas jau sukonfigūruotas su reikalingais Bluetooth leidimais Android platformai:

- BLUETOOTH
- BLUETOOTH_ADMIN
- BLUETOOTH_CONNECT
- BLUETOOTH_SCAN
- ACCESS_FINE_LOCATION
- ACCESS_COARSE_LOCATION

## Plėtra

Projektas naudoja:
- Expo SDK 54
- React Native
- Expo Router (File-based navigation)
- react-native-ble-plx (Bluetooth komunikacija)

## Atsakomybės apribojimas

Ši programėlė skirta tik informaciniams ir švietimo tikslams. Autorius neprisiima atsakomybės už galimus pažeidimus automobiliui.
