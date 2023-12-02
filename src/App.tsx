import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import AppRouter from "./routes/AppRouter";
import "./App.scss";
import ModalsContextProvider from "./contexts/ModalsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
    return (
        <MantineProvider theme={theme}>
            <ModalsContextProvider>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <AppRouter />
            </ModalsContextProvider>
        </MantineProvider>
    );
}
