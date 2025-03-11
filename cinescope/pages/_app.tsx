import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext"; // Import AuthProvider
import { FavoritesProvider } from "@/context/FavoritesContext"; // Keep FavoritesProvider

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(error => {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
    }
  }, []);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <Component {...pageProps} />
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default MyApp;
