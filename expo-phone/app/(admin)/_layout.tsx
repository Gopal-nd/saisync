import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Text, Platform } from 'react-native';
import useAuthStore from '@/store/useAuthStore';

export default function AdminLayout() {
  const { user } = useAuthStore();
  const role = user?.role;
  console.log(role);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#8a8a8a',
        tabBarLabelStyle: styles.tabLabel,
        tabBarShowLabel: true,
        tabBarIconStyle: styles.tabIcon,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="adminprofile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="home" size={size} color={color} />
            </View>
          ),
          title: 'Dashboard',
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused ? styles.activeLabel : null]}>
              Dashboard
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="add-circle" size={size} color={color} />
            </View>
          ),
          title: 'Create User',
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused ? styles.activeLabel : null]}>
              Create
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={size} color={color} />
            </View>
          ),
          title: 'My Profile',
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused ? styles.activeLabel : null]}>
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1a1a1a',
    borderTopWidth: 0,
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabIcon: {
    marginTop: 5,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8a8a8a',
  },
  activeLabel: {
    color: '#3498db',
    fontWeight: '700',
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});