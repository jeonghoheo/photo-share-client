import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import dotenv from "dotenv";
import { ROOT_QUERY } from "./App";
dotenv.config();

const GITHUB_AUTH_MUTATION = gql`
  mutation githubAuth($code: String!) {
    githubAuth(code: $code) {
      token
    }
  }
`;
const AuthorizedUser = props => {
  const [signingIn, setSigningIn] = useState(false);

  const refetchQueries = [
    {
      query: ROOT_QUERY
    }
  ];

  const authorizationComplete = (cache, { data }) => {
    localStorage.setItem("toekn", data.githubAuth.token);
    props.history.replace("/");
    setSigningIn(true);
  };

  const [githubAuthMutation] = useMutation(GITHUB_AUTH_MUTATION, {
    refetchQueries,
    update: authorizationComplete
  });

  const requestCode = () => {
    const clientID = process.env.REACT_APP_CLIENT_ID;
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
  };

  useEffect(() => {
    if (window.location.search.match(/code=/)) {
      setSigningIn(true);
      const code = window.location.search.replace("?code=", "");
      githubAuthMutation({ variables: { code } });
    }
  }, [githubAuthMutation]);

  return (
    <button onClick={requestCode} disabled={signingIn}>
      깃허브 로그인
    </button>
  );
};

export default withRouter(AuthorizedUser);
