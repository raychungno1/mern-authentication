import React from "react";
import { useAppSelector } from "../common/hooks/useAppRedux";

const Home = () => {
  const auth = useAppSelector(({ auth }) => auth);

  return (
    <div>
      {auth ? (
        <>
          <p>{auth.user.name}</p>
          <p>{auth.user.email}</p>
          <p>{auth.token}</p>
        </>
      ) : (
        <p>Logged Out</p>
      )}
    </div>
  );
};

export default Home;
