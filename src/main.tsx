import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import DevicesContextProvider from "./contexts/DevicesContext.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/app/store";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            
            <DevicesContextProvider>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </DevicesContextProvider>
        </Provider>
    </React.StrictMode>
);
