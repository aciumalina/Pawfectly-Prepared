import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/registerScreen';
import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import 'expo-dev-client';
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

// import { notificationManager } from './services/notifications';



function App() {
  const Stack = createStackNavigator();
  //const auth = getAuth(app);
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);


  // Handle user state changes
  const onAuthStateChangedHandler = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChangedHandler);
    //notificationManager();
    return unsubscribe;
  }, []);



  if (initializing) {
    return (
      <View >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
      >
        {user ? (

          <Stack.Screen name="Home" component={HomeScreen} />

        ) : (
          <>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
