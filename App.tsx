import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FormProvider} from './context/FormContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FromScreen1 from './components/FormScreen1';
import FormScreen3 from './components/FormScreen3';
import FormScreen2 from './components/FormScreen2';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <FormProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="FormScreen1">
          <Stack.Screen name="FormScreen1" component={FromScreen1} />
          <Stack.Screen name="FormScreen2" component={FormScreen2} />
          <Stack.Screen name="FormScreen3" component={FormScreen3} />
        </Stack.Navigator>
      </NavigationContainer>
    </FormProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
