# API Calls

We now need a way to make API calls to the back end.

---

1. Ensure you have the following folder structure:

```
project
├───client
│   ├───node_modules
│   ├───public
│   ├───src
|   |   ├───store
|   |   |   |   authSlice.ts
|   |   |   |   index.ts
|   |   |
|   |   |   App.tsx
|   |   |   index.tsx
|   |
│   |   .gitignore
│   |   package.json
│   |   package-lock.json
│
└───server
```

2. Create an `api` folder in the `src` folder
3. Create an `auth.ts` file in the new `api` folder

```ts
// auth.ts
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
```
