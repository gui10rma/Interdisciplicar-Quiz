import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- Suas telas ---
import NeonBackgroundScreen from './src/screens/Cap1-1';
import Mission1 from './src/screens/Mission1';
import ArcanumIntroScreen from './src/screens/Cap1-2';

// --- Criação da Stack ---
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NeonBackgroundScreen" 
        screenOptions={{
          headerShown: false, 
        }}
      >
        {/* Telas registradas */}
        <Stack.Screen name="NeonBackgroundScreen" component={NeonBackgroundScreen} />
        <Stack.Screen name="Mission1" component={Mission1} />
        <Stack.Screen name="ArcanumIntroScreen" component={ArcanumIntroScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

