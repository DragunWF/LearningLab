import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
console.log(API_KEY);

export async function createUser(email, password) {
  console.log("API_KEY:", API_KEY ? "Present" : "Missing");
  console.log("Request data:", { email, password: "***" });

  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
      {
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Success response:", response.data);
    return response.data;
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
