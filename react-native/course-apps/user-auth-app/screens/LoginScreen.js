import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signInHandler({ email, password }) {
    try {
      setIsAuthenticating(true);
      await createUser(email, password);
    } catch (err) {
      Alert.alert(
        "Authentication Failed!",
        "An unexpected error has occurred while trying to log in! Please try again later."
      );
      console.error("An unexpected error has occurred: ", err);
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in user..." />;
  }

  return <AuthContent isLogin onAuthenticate={signInHandler} />;
}

export default LoginScreen;
