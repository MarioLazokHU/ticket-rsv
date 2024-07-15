import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getCookie, setCookie } from "../../utils/cookies";
import { BASE_URL } from "../../utils/config";

type AuthContextType = {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
  userRole: string;
};

const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  login: () => {},
  logout: () => {},
  userRole: "user",
});

export const useAuth = () => {
  return useContext(AuthContext);
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const user = getCookie("user");
    if (user && user.id && user.token) {
      (async () => {
        await authUser(user.id, user.token);
      })();
    }
  }, []);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setCookie("user", null);
    setLoggedIn(false);
    setUserRole('');
  };

  const authUser = async (id: string, token: string) => {
    if(id && token){
      const response = await fetch(`${BASE_URL}/user/auth`, {
        method: "POST",
        body: JSON.stringify({ id, token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data && data.role && data.id && data.token) {
        setUserRole(data.role);
        login();
      } else {
       
      }
    }
   
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
