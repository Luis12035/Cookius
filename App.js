import { Form } from "native-base"
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import homeScreen from "./src/screens/homeScreen"

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="homeScreen">
        <Stack.Screen name="homeScreen" component={homeScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}