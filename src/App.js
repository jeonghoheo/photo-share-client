import React from "react";
import Users from "./Users";
import { gql } from "apollo-boost";

export const ROOT_QUERY = gql`
  query allUsers {
    totalUsers
    allUsers {
      name
      avatar
    }
  }
`;

function App() {
  return <Users />;
}

export default App;
