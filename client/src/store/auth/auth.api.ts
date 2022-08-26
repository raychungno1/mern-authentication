import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_BASE_URL,

    // Adds authorization header if logged in
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        body: formData,
      }),
    }),
    activate: builder.mutation({
      query: (token) => ({
        url: "/activate",
        method: "POST",
        body: token,
      }),
    }),
    login: builder.mutation({
      query: (formData) => ({
        url: "/login",
        method: "POST",
        body: formData,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/password/forget",
        method: "PUT",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: (formData) => ({
        url: "/password/reset",
        method: "PUT",
        body: formData,
      }),
    }),
    googleLogin: builder.mutation({
      query: (credential) => ({
        url: "/googlelogin",
        method: "POST",
        body: credential,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivateMutation,
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGoogleLoginMutation,
} = api;
