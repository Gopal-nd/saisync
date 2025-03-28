import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import useAuthStore from '@/store/useAuthStore';
export default function StudentLayout() {
  const {user} = useAuthStore();
  const role = user?.role
  console.log(role)
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="profile"
        options={{ tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />, title: 'Profile' }}
      />
      <Tabs.Screen
        name="calender"
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="easel-outline" size={size} color={color} />, title: 'calender' }}
      />
    </Tabs>
  );
}
