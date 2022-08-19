# Backend Setup

1. Ensure you have the following folder structure:

```
project
├───client
└───server
    ├───node_modules
    |   index.js
    |   package.json
    |   package-lock.json
```

2. Inside `index.js` in the `server` folder, add the following:

```js
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((e) => console.log(e.message));
```

2. Try running the backend server

<table><td>

`Make sure you're in the server folder!`
```console
npm start
```
</td></table>


You should see `Server running on port 5000` printed to the console.