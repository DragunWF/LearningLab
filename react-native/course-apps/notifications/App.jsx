import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

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
  const [notificationScheduleCount, setNotificationScheduleCount] = useState(0);
  const [notificationResponseCount, setNotificationResponseCount] = useState(0);

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Push notifications need the approriate permissions!"
        );
        return;
      }

      console.log("Notification permissions granted!");
      console.log("Project ID:", process.env.EXPO_PUBLIC_PROJECT_ID);

      const pushToken = await Notifications.getExpoPushTokenAsync({
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
      });
      console.log("Expo Push Token:", pushToken);

      // required for android devices
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    // This is where you can handle notifications
    const subscription = Notifications.addNotificationReceivedListener(
      (response) => {
        console.log("Notification received:", response);
        setNotificationScheduleCount((prevCount) => prevCount + 1);
        // Handle the notification here
        // You can navigate to a specific screen or perform an action based on the notification response
      }
    );

    const response = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification response received:", response);
        setNotificationResponseCount((prevCount) => prevCount + 1);
        // Handle the notification response here
        // For example, you can navigate to a specific screen based on the notification data
      }
    );

    return () => {
      // Clean up the subscription and response when the component unmounts
      subscription.remove();
      response.remove();
    };
  }, []);

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

  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: process.env.EXPO_PUBLIC_PUSH_TOKEN,
        title: "Dragun (From a Device)",
        body: "This is a test message!",
      }),
    });
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Button
          title="Execute Local notification!"
          onPress={scheduleNotificationHandler}
        />
        <Button
          title="Execute Push notification!"
          onPress={sendPushNotificationHandler}
        />
        <View style={styles.infoContainer}>
          <Text>Notifications Received: {notificationScheduleCount}</Text>
          <Text>Notification Responses: {notificationResponseCount}</Text>
        </View>
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
  infoContainer: {
    marginTop: 20,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
