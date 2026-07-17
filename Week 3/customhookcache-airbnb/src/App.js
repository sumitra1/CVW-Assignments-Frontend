import React from "react";
import useFetch from "./useFetch";

function Users() {
  const {
    data,
    loading,
    error
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h2>Users</h2>

      {data &&
        data.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
          </div>
        ))}
    </div>
  );
}

function UserCount() {
  const { data } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <h3>
      Total Users: {data ? data.length : 0}
    </h3>
  );
}

export default function App() {
  return (
    <div>
      <Users />
      <UserCount />
    </div>
  );
}