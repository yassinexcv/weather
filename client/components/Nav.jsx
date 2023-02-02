import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Login from '../pages/login';
import Register from '../pages/Register';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Navigation = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-home'
            : 'ios-home';
        } else if (route.name === 'Login') {
          iconName = focused ? 'ios-log-in' : 'ios-log-in';
        } else if (route.name === 'Register') {
          iconName = focused ? 'ios-create' : 'ios-create';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" options={{headerShown : false }} component={Home} />
    <Tab.Screen name="Login" component={Login} />
    <Tab.Screen name="Register" component={Register} />
  </Tab.Navigator>
);

export default Navigation;
