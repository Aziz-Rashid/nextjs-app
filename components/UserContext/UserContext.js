import { createContext } from "react";

export const UserContext = createContext({
  user: {
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    lastLogin: "",
    registerDate: "",
    formattedRegisterDate: "",
    isAdmin: false,
  },
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
