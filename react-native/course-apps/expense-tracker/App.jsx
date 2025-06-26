import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpensesScreen from "./screens/ManageExpensesScreen";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverView} />
          <Stack.Screen name="ManageExpense" component={ManageExpensesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function ExpensesOverView() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="RecentExpenses"
        compoent={RecentExpensesScreen}
      />
      <BottomTabs.Screen name="AllExpenses" component={AllExpensesScreen} />
    </BottomTabs.Navigator>
  );
}
