import { Divider } from "@material-ui/core";
import React from "react";
import { useGetAuth } from "../hooks/useGetAuth";
import { IUser } from "../interfaces/user";

const Home = () => {
  const { auth, setAuth } = useGetAuth();

  return (
    <div>
      {auth ? (
        <>
          <h3>Welcome, {auth.profile.name}!</h3>
          {auth.profile.picture ? (
            <img src={auth.profile.picture} alt="Profile Photo" />
          ) : (
            <div
              style={{
                width: 96,
                height: 96,
                background: "gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>{auth.profile.name.charAt(0)}</p>
            </div>
          )}
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
              <tr>
                <td>{auth.profile.id}</td>
                <td>{auth.profile.name}</td>
                <td>{auth.profile.email}</td>
              </tr>
            </tbody>
          </table>
          <p style={{ overflowWrap: "break-word" }}>
            <strong>Token: </strong>
            {auth.token}
          </p>
        </>
      ) : (
        <h3>You are logged out.</h3>
      )}
    </div>
  );
};

export default Home;
