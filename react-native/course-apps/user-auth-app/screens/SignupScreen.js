import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authContext = useContext(AuthContext);

  async function signUpHandler({ email, password }) {
    try {
      setIsAuthenticating(true);
      const token = await createUser(email, password);
      authContext.authenticate(token);
    } catch (err) {
      Alert.alert(
        "Account Registration Error",
        "An unexpected error has occurred while trying to create your account! Please try again later."
      );
      console.log(
        "An unexpected error has occurred while trying to register your account: ",
        err
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Registering user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
