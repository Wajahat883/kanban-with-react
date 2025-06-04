import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

const getusersFromstorage = () => {
  try {
    const users = localStorage.getItem("mockUsers");
    return users ? JSON.parse(users) : [];
  } catch (e) {
    return [];
  }
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(getusersFromstorage);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("mockUsers", JSON.stringify(user));
  }, [user]);

  const login = (username, password) => {
    if (!Array.isArray(user)) {
      throw new Error("User data is corrupted or missing");
    }

    const userExits = user.find(
      (u) => u.username === username && u.password === password
    );

    if (!userExits) {
      throw new Error("Invalid credential");
    }

    setCurrentUser(userExits);
    localStorage.setItem("user",JSON.stringify(userExits))
  };

  const signup = (username, password, email) => {
    if (!Array.isArray(user)) {
      throw new Error("User data is corrupted or missing");
    }

    const userExits = user.find((u) => u.email === email);
    if (userExits) {
      throw new Error("User already exists");
    }

    const newUser = { id: Date.now(), username, email, password };
    setUser([...user, newUser]);
  };

  const logout = () => {
    setCurrentUser(null); 
    localStorage.removeItem("user")
  };

  return (
    <AuthContext.Provider value={{ user, currentUser, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth, AuthContext };
