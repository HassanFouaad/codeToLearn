import React,{Fragment} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'semantic-ui-css/semantic.min.css'
ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);
