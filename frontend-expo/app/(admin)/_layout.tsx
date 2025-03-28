import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import useAuthStore from '@/store/useAuthStore';
export default function AdminLayout() {
  const {user} = useAuthStore();
  const role = user?.role
  console.log(role)
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="adminprofile"
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="arrow-forward-circle" size={size} color={color} />, title: 'admin' }}
        />
            <Tabs.Screen
        name="register"
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />, title: 'create' }}
        />
               <Tabs.Screen
        name="profile"
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />, title: 'Profile' }}
        />
    </Tabs>
  );
}
