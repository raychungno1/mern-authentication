# Actions

The Redux store doesn't know anything about async operations, but the process of making API calls is asynchronous. This, we will use redux-thunk to allow async logic to interact with the store.

---

1. Ensure you have the following folder structure:

```
project
├───client
│   ├───node_modules
│   ├───public
│   ├───src
|   |   ├───api
|   |   |   |   auth.ts
|   |   |
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

2. Create an `actions` folder in the `src` folder
3. Create an `auth.ts` file in the new `actions` folder

```ts
// auth.ts
import { AUTH } from "../store/authSlice";
import * as api from "../api/auth";
import { NavigateFunction } from "react-router-dom";
import { AnyAction, Dispatch } from "redux";

export const signin =
  (formData: any, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { data } = await api.signin(formData);
      dispatch(AUTH(data));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

export const signup =
  (formData: any, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { data } = await api.signup(formData);
      dispatch(AUTH(data));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
```
