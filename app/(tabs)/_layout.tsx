import { Tabs } from 'expo-router';
import { Bluetooth, Gauge, Info, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1e40af',
        tabBarInactiveTintColor: '#6b7280',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Prisijungimas',
          tabBarIcon: ({ size, color }) => (
            <Bluetooth size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="adaptation"
        options={{
          title: 'Adaptacija',
          tabBarIcon: ({ size, color }) => (
            <Gauge size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Informacija',
          tabBarIcon: ({ size, color }) => (
            <Info size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
