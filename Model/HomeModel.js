import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};