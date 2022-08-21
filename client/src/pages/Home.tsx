import { Divider } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useGetAuth } from "../hooks/useGetAuth";
import { IUser } from "../interfaces/user";

const Home = () => {
  const { auth } = useGetAuth();

  return (
    <div className="home__container">
      {auth ? (
        <>
          <div className="home__header">
            {auth.profile.picture ? (
              <img
                src={auth.profile.picture}
                alt="Profile Photo"
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <div
                style={{
                  width: 96,
                  height: 96,
                  background: "#2f9363",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  color: "white",
                  fontSize: "5rem",
                }}
              >
                <p>{auth.profile.name.charAt(0)}</p>
              </div>
            )}
            <div>
              <h1>{auth.profile.name}</h1>
              <p>{auth.profile.email}</p>
            </div>
          </div>
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
        <div className="home__footer">
          <h1>You are logged out.</h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link to="/signin" className="btn">
              Sign In
            </Link>
            <Link to="/signup" className="btn">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
