import "./App.css";
import { AuthProvider } from "./providers/authContext";
import { UserDataProvider } from "./providers/userContext";
import Router from "./router";
import { routes } from "./routes/routesConfig";

function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <Router routes={routes} />
      </UserDataProvider>
    </AuthProvider>
  );
}

export default App;
