# Backend Models

Models are how users get represented in the MongoDB database. We want our user to have the following properties:

```ts
interface IUser {
  name: String;
  email: String;
  password: String;
  id: String;
}
```

---

1. Inside the `server` folder, create a `models` folder
2. Create a `user.js` file in this `models` folder
3. Ensure you have the following folder structure:

```
project
├───client
└───server
    ├───node_modules
    ├───models
    |   |   user.js
    |
    |   index.js
    |   package.json
    |   package-lock.json
```

4. Inside `user.js` file in the `models` folder, add the following:

```js
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
```
