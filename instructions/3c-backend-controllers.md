# Backend Controllers

Constollers are how we interact with a `User`. For our authentication flow, we want the user to:
* Sign In
* Sign Up

---

1. Inside the `server` folder, create a `controllers` folder
2. Create a `user.js` file in this `controllers` folder
3. Ensure you have the following folder structure:

```
project
├───client
└───server
    ├───node_modules
    ├───models
    |   |   user.js
    |
    ├───controllers
    |   |   user.js
    |
    |   index.js
    |   package.json
    |   package-lock.json
```

4. Inside `user.js` file in the `controllers` folder, add the following:

```js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  res.status(200).json({ message: "Signing In!" });
  console.log("Signing In!");
};

export const signup = async (req, res) => {
  res.status(200).json({ message: "Signing Up!" });
  console.log("Signing Up!");
};
```
