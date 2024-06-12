import "./App.css";
import { AutoLogout } from "./auth/components/autoLogout";
import { AuthProvider } from "./providers/authContext";
import { BackendProvider } from "./providers/backendContext";
import { FirebaseProvider } from "./providers/firebaseContext";
import { UserDataProvider } from "./providers/userContext";
import Router from "./router";
import { routes } from "./routes/routesConfig";

function App() {
  return (
    <AuthProvider>
      <BackendProvider>
        <UserDataProvider>
          <FirebaseProvider>
            <AutoLogout />
            <Router routes={routes} />
          </FirebaseProvider>
        </UserDataProvider>
      </BackendProvider>
    </AuthProvider>
  );
}

export default App;
