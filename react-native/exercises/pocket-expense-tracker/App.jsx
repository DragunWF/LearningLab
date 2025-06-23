import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import ExpensesContextProvider from "./store/ExpensesContext";

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <BottomTab.Navigator
            screenOptions={{
              tabBarStyle: {
                backgroundColor: "#021526",
              },
            }}
          >
            <BottomTab.Screen
              name="RecentExpenses"
              component={RecentExpensesScreen}
              options={{
                headerTitle: "Recent Expenses",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="time" color={color} size={size} />
                ),
                tabBarLabel: "Recent Expenses",
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#021526",
                },
              }}
            />
            <BottomTab.Screen
              name="AllExpenses"
              component={AllExpensesScreen}
              options={{
                headerTitle: "All Expenses",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="calendar" color={color} size={size} />
                ),
                tabBarLabel: "All Expenses",
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#021526",
                },
              }}
            />
          </BottomTab.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
