import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [message, setMessage] = useState("User");
  const authContext = useContext(AuthContext);
  const token = authContext.token;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://test-project-aed68-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=${token}`
      );
      setMessage(response.data);
    }

    fetchData();
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
