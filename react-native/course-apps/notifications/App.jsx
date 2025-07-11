import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";

// This is where you can customize how notifications are handled
// For example, you can set the default behavior for notifications
// when the app is in the foreground or background.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

//// FOR IOS ////
const allowsNotificationsAsync = async () => {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

const requestPermissionsAsync = async () => {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
};
//// END ////

export default function App() {
  async function scheduleNotificationHandler() {
    const hasPushNotificationPermissionGranted =
      await allowsNotificationsAsync();

    if (!hasPushNotificationPermissionGranted) {
      await requestPermissionsAsync();
    }

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
