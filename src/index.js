import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Chicken} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <Chicken>
    <App />
  </Chicken>,
  document.getElementById("root")
);

