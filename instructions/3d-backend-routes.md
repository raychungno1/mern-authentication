# Backend Routes

Routes are what handles the API requests from our front end.

---

1. Inside the `server` folder, create a `routes` folder
2. Create a `users.js` file in this `routes` folder
3. Ensure you have the following folder structure:

```
project
├───client
└───server
    ├───node_modules
    ├───routes
    |   |   users.js
    |
    |   index.js
    |   package.json
    |   package-lock.json
```

4. Inside `users.js` in the `routes` folder, add the following:

```js
import express from "express"

import { signin, signup } from "../controllers/user.js"
const router = express.Router();

router.post("/signin", signin)
router.post("/signup", signup)

export default router;
```

5. Inside `index.js` in the `server` folder, add the following:

```diff
...
import "dotenv/config";

+import userRoutes from "./routes/users.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

+app.use("/users", userRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
...
```

Now lets confirm if these new routes are working.

7. Start the backend server if you haven't already

<table><td>

`Make sure you're in the server folder!`
```console
npm start
```
</td></table>


8. Using an API platform such as `Postman`, make `POST` requests to the following links, making sure you get an appropriate return message from each:
    * `http://localhost:5000/users/signin`
    * `http://localhost:5000/users/signup`
