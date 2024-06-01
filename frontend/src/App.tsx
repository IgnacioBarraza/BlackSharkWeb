import "./App.css";
import { AuthProvider } from "./providers/authContext";
import { FirebaseProvider } from "./providers/firebaseContext";
import { UserDataProvider } from "./providers/userContext";
import Router from "./router";
import { routes } from "./routes/routesConfig";

function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <FirebaseProvider>
          <Router routes={routes} />
        </FirebaseProvider>
      </UserDataProvider>
    </AuthProvider>
  );
}

export default App;
