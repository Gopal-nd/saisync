import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="profile"
        options={{ tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />, title: 'Profile' }}
      />
      <Tabs.Screen
        name="calculator"
        options={{ tabBarIcon: ({ color, size }) => <MaterialIcons name="calculate" size={size} color={color} />, title: 'Calculator' }}
      />
      <Tabs.Screen
        name="calendar"
        options={{ tabBarIcon: ({ color, size }) => 
        <Ionicons name="calendar" size={size} color={color} />, title: 'Calendar' }}
      />
    </Tabs>
  );
}
