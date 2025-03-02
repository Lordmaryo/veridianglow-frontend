import { toast } from "react-hot-toast";

export const handleError = (error: any, customMessage?: string) => {
  console.error("API Error:", error);

  let errorMessage = "An unknown error occurred, try again later";

  if (error?.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else if (customMessage) {
    errorMessage = customMessage;
  }

  if (errorMessage.startsWith("User validation failed: password:")) {
    errorMessage = "Password must be 8 or more characters";
  }

  if (errorMessage === "Refresh token not found") {
    return;
  }

  toast.error(errorMessage, { id: "error" });
};
