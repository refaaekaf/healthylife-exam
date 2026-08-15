import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ContentDetailScreen from '../screens/ContentDetailScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SavedScreen from '../screens/SavedScreen';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();
const HomeStackNav = createNativeStackNavigator();

const HomeStack = () => (
  <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
    <HomeStackNav.Screen name="HomeMain" component={HomeScreen} />
    <HomeStackNav.Screen name="ContentDetail" component={ContentDetailScreen} />
  </HomeStackNav.Navigator>
);

const LogoutScreen = () => {
  const { logout } = useAuth();
  logout();
  return null;
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarLabelStyle: { fontFamily: 'Nunito_600SemiBold', fontSize: 11 },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Beranda: 'home',
            Dashboard: 'grid',
            Tersimpan: 'bookmark',
            Keluar: 'log-out'
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Beranda" component={HomeStack} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Tersimpan" component={SavedScreen} />
      <Tab.Screen name="Keluar" component={LogoutScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;