import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  console.log(response.data);
  return response.data.idToken;
}

export function createUser(email, password) {
  console.log("API_KEY:", API_KEY ? "Present" : "Missing");
  console.log("Request data:", { email, password: "***" });

  try {
    return authenticate("signUp", email, password);
  } catch (error) {
    console.error("Full error object:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    console.error("Error config:", error.config);

    if (error.response?.data?.error) {
      const errorMessage = error.response.data.error.message;
      console.error("Firebase error message:", errorMessage);
      throw new Error(errorMessage);
    } else if (error.code === "ECONNABORTED") {
      throw new Error("Request timed out. Please try again.");
    } else {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
