import React from "react";
import { useQuery } from "react-apollo";
import { ROOT_QUERY } from "./App";

const Me = ({ logout, requestCode, signIngIn }) => {
  const { data, loading } = useQuery(ROOT_QUERY);

  return (
    <>
      {data && data.me ? (
        <CurrentUser {...data.me} logout={logout} />
      ) : loading ? (
        <p>loading...</p>
      ) : (
        <button onClick={requestCode} disabled={signIngIn}>
          깃허브로 로그인
        </button>
      )}
    </>
  );
};

const CurrentUser = ({ name, avatar, logout }) => {
  return (
    <div>
      <img src={avatar} alt="" width={48} height={48} />
      <h1>{name}</h1>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};

export default Me;
