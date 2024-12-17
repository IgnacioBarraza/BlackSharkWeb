import "./App.css";
import { AutoLogout } from "./auth/components/autoLogout";
import { AuthProvider } from "./context/authContext";
import { BackendProvider } from "./context/backendContext";
import { PropsDataProvider } from "./context/propsContext";
import Router from "./router";
import { routes } from "./routes/routesConfig";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BackendProvider>
          <PropsDataProvider>
              <AutoLogout />
              <Router routes={routes} />
          </PropsDataProvider>
        </BackendProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
