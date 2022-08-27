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
          {auth.user.picture ? (
            <img
              src={auth.user.picture}
              alt="Profile Photo"
              className="w-24 h-24 rounded-full object-contain"
            />
          ) : (
            <div className="w-24 h-24 rounded-full object-contain bg-[#9bc148] flex items-center justify-center text-white text-7xl">
              <p className="mb-2">{auth.user.name.charAt(0)}</p>
            </div>
          )}
        </>
      ) : (
        <p>Logged Out</p>
      )}
    </div>
  );
};

export default Home;
