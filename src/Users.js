import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ROOT_QUERY } from "./App";

const Users = () => {
  const { data, loading } = useQuery(ROOT_QUERY);
  return (
    <>
      {loading ? (
        <p>사용자를 불러오는중...</p>
      ) : (
        <UserLIst count={data.totalUsers} users={data.allUsers} />
      )}
    </>
  );
};

const UserLIst = ({ count, users }) => {
  return (
    <div>
      <p>{count} Users</p>
      <ul>
        {users.map(user => (
          <UserLIstItem key={user.name} name={user.name} avatar={user.avatar} />
        ))}
      </ul>
    </div>
  );
};

const UserLIstItem = ({ name, avatar }) => (
  <li>
    <img src={avatar} width={48} height={48} alt="" />
    {name}
  </li>
);

export default Users;
