const User = ({ user }) => {
  return (
    <div>
      <h1>User</h1>
      <p>
        Name: <b>{user.name}</b>
      </p>
      <p>
        Username: <b>{user.username}</b>
      </p>
    </div>
  );
};

export default User;
