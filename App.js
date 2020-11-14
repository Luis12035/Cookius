import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import homeScreen from "./src/screens/homeScreen";
import recipeInfoScreen from "./src/screens/recipeInfoScreen";
import recipesSearchScreen from "./src/screens/recipesSearchScreen";

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="homeScreen">
        <Stack.Screen name="homeScreen" component={homeScreen} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="recipesSearchScreen" component={recipesSearchScreen}
          options={{title: ' ',
             headerTransparent: true,
             headerTintColor: 'red'
             }}>
          </Stack.Screen>
        <Stack.Screen name="recipeInfoScreen" component={recipeInfoScreen} 
          options={{title: ' ',
            headerTransparent: true,
            headerTintColor: 'red'
          }}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
};