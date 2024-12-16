import "./App.css";
import { AutoLogout } from "./auth/components/autoLogout";
import { AuthProvider } from "./providers/authContext";
import { BackendProvider } from "./providers/backendContext";
import { FirebaseProvider } from "./providers/firebaseContext";
import { PropsDataProvider } from "./providers/propsContext";
import Router from "./router";
import { routes } from "./routes/routesConfig";
import { ChakraProvider } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google"

const clientId = import.meta.env.VITE_CLIENT_ID

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BackendProvider>
          <PropsDataProvider>
            <FirebaseProvider>
              <GoogleOAuthProvider clientId={clientId}>
                <AutoLogout />
                <Router routes={routes} />
              </GoogleOAuthProvider>
            </FirebaseProvider>
          </PropsDataProvider>
        </BackendProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
