import { auth, signIn, signUp } from "../firebaseConfig";

export const loginUser = async (email, password) => {
  return await signIn(auth, email, password);
};

export const registerUser = async (email, password) => {
  return await signUp(auth, email, password);
};