# Redux for State Management

Redux will be used to manage the User across the application.

---

1. Ensure you have the following folder structure:

```
project
├───client
│   ├───node_modules
│   ├───public
│   ├───src
|   |   |   App.tsx
|   |   |   index.tsx
|   |
│   |   .gitignore
│   |   package.json
│   |   package-lock.json
│
└───server
```

2. Create a `store` folder in the `src` folder
3. Create a `index.ts` and a `authSlice.ts` file in the new `reducers` folder
   - `authSlice.ts` defines the reducers for a login/logout action - we are storing the user data into localstorage so that you will stay logged in even if you close the page
   - `index.ts` creates the Redux store

```ts
// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { authData: null },
  reducers: {
    AUTH(state, action) {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state = { ...state, authData: action.payload };
    },
    LOGOUT(state) {
      localStorage.removeItem("profile");
      state = { ...state, authData: null };
    },
  },
});

export const { AUTH, LOGOUT } = authSlice.actions;
export default authSlice.reducer;
```

```ts
// index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
```

4. Create a `hooks` folder in the `src` folder
5. Create a `reduxHooks.ts` afile in the new `hooks` folder

```ts
// reduxHooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

6. Now, let's include this store in our `App.tsx` file in the `src` folder:

```diff
import React from "react";
import { BrowserRouter } from "react-router-dom";
+import { Provider } from "react-redux";

+import store from "./store";

const App = () => {
  return (
+   <Provider store={store}>
      <BrowserRouter>
        <h1>App</h1>
      </BrowserRouter>
+   </Provider>
  );
};

export default App;
```
