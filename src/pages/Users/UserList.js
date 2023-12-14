import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USER = gql`
  query GetUser {
    users {
      id
      email
      password
    }
  }
`;

export default function UserList() {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.users.map(({ id, email, password }) => (
        <div key={id}>
          <h3>{email}</h3>
          <br />
          <p>{password}</p>
          <br />
        </div>
      ))}
    </div>
  );
}
