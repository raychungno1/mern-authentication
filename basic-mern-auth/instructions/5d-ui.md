# User Interface

1. Ensure you have the following folder structure:

```
project
├───client
│   ├───node_modules
│   ├───public
│   ├───src
|   |   ├───actions
|   |   |   |   auth.ts
|   |   |
|   |   ├───api
|   |   |   |   auth.ts
|   |   |
|   |   ├───hooks
|   |   |   |   reduxHooks.ts
|   |   |   |   useGetAuth.ts
|   |   |
|   |   ├───interfaces
|   |   |   |   user.ts
|   |   |
|   |   ├───store
|   |   |   |   authSlice.ts
|   |   |   |   index.ts
|   |
│   |   .gitignore
│   |   package.json
│   |   package-lock.json
│
└───server
```

2. Create an `components` folder in the `src` folder
3. Create an `Navbar` folder in the `components` folder
4. Create `index.tsx` and `styles.css` files in the new `Navbar` folder

   - [`index.tsx`](https://github.com/raychungno1/mern-authentication/blob/main/client/src/components/Navbar/index.tsx)
   - [`styles.css`](https://github.com/raychungno1/mern-authentication/blob/main/client/src/components/Navbar/styles.css)

5. Create an `images` folder in the `src` folder
6. Add the logo images in the new `images` folder

   - [Images](https://github.com/raychungno1/mern-authentication/tree/main/client/src/images)

7. Create an `pages` folder in the `src` folder
8. Create `Home.tsx`, `Signin.tsx` and `Signup.tsx` files in the new `pages` folder

   - [`Home.tsx`](https://github.com/raychungno1/mern-authentication/blob/main/client/src/pages/Home.tsx)
   - [`Signup.tsx`](https://github.com/raychungno1/mern-authentication/blob/main/client/src/pages/Signup.tsx)
   - [`Signin.tsx`](https://github.com/raychungno1/mern-authentication/blob/main/client/src/pages/Signin.tsx)

9. Create a `globals.css` file in the `src` folder
   - [`globals.css`](https://github.com/raychungno1/mern-authentication/blob/main/client/src/globals.css)
