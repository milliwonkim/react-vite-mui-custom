import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { unstable_ClassNameGenerator as ClassNameGenerator } from "@mui/material";
// import { MUI_REPLACE_TAG } from "./constants/etc.ts";

// ClassNameGenerator.configure((componentName) =>
//   componentName.replace("Mui", MUI_REPLACE_TAG)
// );

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
