import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";
import OpenProvider from "./contexts/OpenContext.jsx";
import FavoritesProvider from "./contexts/FavoritesContext.jsx";
import WatchHistoryProvider from "./contexts/WatchHistoryContext.jsx";
import PlayListProvider from "./contexts/PlayListContext.jsx";
import CommentProvider from "./contexts/CommentContext.jsx";
import RateProvider from "./contexts/RateContext.jsx";

import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/shift-away.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <OpenProvider>
          <CommentProvider>
            <PlayListProvider>
              <FavoritesProvider>
                <WatchHistoryProvider>
                  <RateProvider>
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                      <GoogleOAuthProvider
                        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                      >
                        <StrictMode>
                          <App />
                        </StrictMode>
                      </GoogleOAuthProvider>
                    </SkeletonTheme>
                  </RateProvider>
                </WatchHistoryProvider>
              </FavoritesProvider>
            </PlayListProvider>
          </CommentProvider>
        </OpenProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
