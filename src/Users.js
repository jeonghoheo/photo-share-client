import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { ROOT_QUERY } from "./App";

const ADD_FAKE_USERS_MUTATION = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avatar
    }
  }
`;

const Users = () => {
  const { data, loading, refetch } = useQuery(ROOT_QUERY);

  return (
    <>
      {loading ? (
        <p>사용자를 불러오는중...</p>
      ) : (
        <UserLIst
          count={data.totalUsers}
          users={data.allUsers}
          refetchUsers={refetch}
        />
      )}
    </>
  );
};

const UserLIst = ({ count, users, refetchUsers }) => {
  const variables = {
    count: 1
  };
  const refetchQueries = [
    {
      query: ROOT_QUERY
    }
  ];
  const [addFakeUsers] = useMutation(ADD_FAKE_USERS_MUTATION, {
    variables,
    refetchQueries
  });

  return (
    <div>
      <p>{count} Users</p>
      <button
        onClick={() => {
          refetchUsers();
        }}
      >
        다시 가져오기
      </button>
      <button onClick={() => addFakeUsers()}>임시 사용자 추가</button>
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
