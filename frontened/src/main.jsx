import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "../src/components/ui/sonner.jsx";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store.js";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store); // create persistor

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
