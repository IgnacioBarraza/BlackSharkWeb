import "./App.css";
import { AutoLogout } from "./auth/components/autoLogout";
import { AuthProvider } from "./providers/authContext";
import { BackendProvider } from "./providers/backendContext";
import { FirebaseProvider } from "./providers/firebaseContext";
import { PropsDataProvider } from "./providers/propsContext";
import Router from "./router";
import { routes } from "./routes/routesConfig";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BackendProvider>
          <PropsDataProvider>
            <FirebaseProvider>
              <AutoLogout />
              <Router routes={routes} />
            </FirebaseProvider>
          </PropsDataProvider>
        </BackendProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
