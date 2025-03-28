import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import useAuthStore from '@/store/useAuthStore';
export default function StaffLayout() {
  const {user} = useAuthStore();
  const role = user?.role
  console.log(role)
  return (
    <Tabs screenOptions={{ headerShown: false }} >
      <Tabs.Screen
        name="classes"
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="shield" size={size} color={color} />, title: 'shedule' }}
        />
        <Tabs.Screen
        name="profile"
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />, title: 'Profile' }}
        />
    </Tabs>
  );
}
