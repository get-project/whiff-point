import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import './index.css';
import StoreContextProvider from "./context/StoreContextProvider";
import { Auth0Provider } from '@auth0/auth0-react';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Auth0Provider
    domain="dev-e1jx8boys1jc7hkw.us.auth0.com"
    clientId="9aTYcgCmFpuTUfsWXqJRK41u1TVnqyNo"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </Auth0Provider>
);
