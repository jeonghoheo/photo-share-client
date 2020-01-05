import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import Apolloclient from "apollo-boost";

const client = new Apolloclient({
  uri: "http://localhost:4000/graphql",
  request: operation => {
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        authorizatiion: localStorage.getItem("token")
      }
    }));
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
