import React from "react";
import Users from "./Users";
import AuthorizedUser from "./AuthorizedUser";
import { BrowserRouter } from "react-router-dom";
import { gql } from "apollo-boost";

export const ROOT_QUERY = gql`
  query allUsers {
    totalUsers
    allUsers {
      ...userInfo
    }
    me {
      ...userInfo
    }
  }

  fragment userInfo on User {
    name
    avatar
  }
`;

function App() {
  return (
    <BrowserRouter>
      <div>
        <AuthorizedUser />
        <Users />
      </div>
    </BrowserRouter>
  );
}

export default App;
