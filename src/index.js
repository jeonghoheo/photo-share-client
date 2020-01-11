import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import Apolloclient, { InMemoryCache } from "apollo-boost";
import { persistCache } from "apollo-cache-persist";

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: localStorage
});

if (localStorage["apollo-cache-persist"]) {
  let cacheData = JSON.parse(localStorage["apollo-cache-persist"]);
  cache.restore(cacheData);
}

const client = new Apolloclient({
  cache,
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
