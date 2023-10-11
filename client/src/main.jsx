import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider} from '@mantine/core';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
    <Auth0Provider domain="dev-7t3kl4hb6o875wkm.us.auth0.com"
    clientId="6ys95NalNWyGn4yf9nOyEREyFV1azVu6"
    authorizationParams={{
      redirect_uri : "https://youtube-real-estate-xk5e.vercel.app"
    }}
    audience = "https://youtube-real-estate.vercel.app"
    scope ="openid profile email">
    <App />
    </Auth0Provider>
    </MantineProvider>
  </React.StrictMode>
);
