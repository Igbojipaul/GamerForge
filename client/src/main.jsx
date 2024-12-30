import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";


import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
);