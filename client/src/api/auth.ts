import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Add our user token if user is logged in
API.interceptors.request.use((req: any) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    req.headers.authorization = `Bearer ${JSON.parse(profile).token}`;
  }

  return req;
});

export const signin = (formData: any) => API.post("/users/signin", formData);
export const signup = (formData: any) => API.post("/users/signup", formData);
