import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";

export default function App() {
  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first notification",
        body: "This is the body of the local notification",

        // You can add additional data to the notification
        data: { content: "This is some data" },
        sound: "default", // Use 'default' for the default notification sound
        priority: Notifications.AndroidNotificationPriority.HIGH, // Set high priority for Android
        vibrate: true, // Enable vibration for the notification
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Button
          title="Press me to schedule notification!"
          onPress={scheduleNotificationHandler}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
