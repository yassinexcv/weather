import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ImageBackground } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './pages/Home';

const Stack = createStackNavigator();

const Image = { uri: "https://img.freepik.com/free-vector/blue-sky-with-clouds-background-elegant_1017-26302.jpg?w=1380&t=st=1674549824~exp=1674550424~hmac=5516180b0d8a73a2e0944931f027def86d71e03dbadfe8489a98a11e484a5479" };

export default function App() {
  return (
    
    <View style={styles.container}>
      <ImageBackground source={Image} style={styles.image}>
        <Home/>
      </ImageBackground>
      <StatusBar style="auto" />
     
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  image: {

    // style image background to cover all screen
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: '100%',
    height: '100%',



  },
});
