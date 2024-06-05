import "./App.css";
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
            <Router routes={routes} />
          </FirebaseProvider>
        </UserDataProvider>
      </BackendProvider>
    </AuthProvider>
  );
}

export default App;
