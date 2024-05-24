import React from "react";
import Home from "@/components/Screens/Home";
import Login from "@/components/Screens/Login";
import ChoosePet from "@/components//Screens/ChoosePet";
import InformationPet from "@/components//Screens/InformationPet";
import Detail from "@/components//Screens/Detail";
import MyPet from "@/components//Screens/MyPet";

import { useColorScheme } from "@/hooks/useColorScheme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

export default function TabLayout() {
    const Stack = createNativeStackNavigator();
    const colorScheme = useColorScheme();
    return (
        <GestureHandlerRootView>
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName="start">
                    <Stack.Screen name="start" component={Home} />
                    <Stack.Screen name="login" component={Login} />
                    <Stack.Screen name="choose" component={ChoosePet} />
                    <Stack.Screen name="information" component={InformationPet} />
                    <Stack.Screen name="detail" component={Detail} />
                    <Stack.Screen name="mypet" component={MyPet} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}
