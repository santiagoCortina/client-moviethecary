import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components";
import RootNavigation from "./RootNavigation";
import { getUserWs } from "./services/auth-ws";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleLogout = () => {
    setUser(null);
    console.log("adios user", user);
  };

  const authenticate = (user) => {
    setUser(user);
  };

  const initData = () => {
    getUserWs().then((response) => {
      if (response.status) {
        setLoading(false);
        setUser(response.data.user);
      }
    });
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className="App">
      <Navbar {...{ user, handleLogout }} />
      <RootNavigation {...{ user, authenticate, handleLogout }} />
    </div>
  );
}

export default App;
