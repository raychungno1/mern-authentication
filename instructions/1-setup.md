# Setup

1. Create the following folder structure:

```
project
├───client
└───server
```

2. Navigate to the `client` folder and initialize the front end application

```console
cd client
npx create-react-app ./ --template typescript
```

3. Install the nessecary dependencies for the front end application
   - `axios` an HTTP client to make requests
   - `jwt-decode` decodes JWT tokens
   - `react-router-dom` front end "routing"
   - `redux` a state management container
   - `react-redux` lets you use Redux with React
   - `redux-thunk` thunk middleware for Redux (customize the way a `dispatch` runs)
   - `@reduxjs/toolkit` a toolset for redux development

<table><td>

`Make sure you're in the client folder!`

```console
npm i axios jwt-decode react-redux react-router-dom redux redux-thunk @reduxjs/toolkit
```

</td></table>

4. **OPTIONAL:** to reduce clutter in the initial CRA app, I like to delete everything inside the `src` folder and replace it with just two files:

```tsx
// index.tsx
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./globals.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
```

```tsx
// App.tsx
import React from "react";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <h1>App</h1>
    </BrowserRouter>
  );
};

export default App;
```

5. Inside the `package.json` file in the `client` folder, make the following change:

```diff
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
+ "proxy": "http://localhost:5000",
  "dependencies": {
    "@reduxjs/toolkit": "^1.8.5",
    ...
  }
  ...
}
```

Our folder structure now looks like this:

```
project
├───client
│   ├───node_modules
│   ├───public
│   ├───src
|   |   |   App.tsx
|   |   |   index.tsx
│   |
│   |   .gitignore
│   |   package.json
│   |   package-lock.json
│
└───server
```

You can now try starting the web server:

<table><td>

`Make sure you're in the client folder!`

```console
npm start
```

</td></table>

6.  Navigate to the `server` folder and initialize the back end

    - Create a file called `index.js` in the server folder
    - This will be the starting point of our back end server

    <br />

7.  Initialize a `package.json` file in the `server` folder

```console
cd server
npm init -y
```

8. Install the nessecary dependencies for the back end server

   - `bcryptjs` hashes passwords
   - `body-parser` allows us to send `POST` requests
   - `cors` enables cross origin requests
   - `dotenv` loads environment variables
   - `express` a Node.js web framework
   - `jsonwebtoken` implements JSON web tokens (duh)
   - `mongoose` allows up to create models for our user
   - `nodemon` automatically restarts the node application when changes are detected

<table><td>

`Make sure you're in the server folder!`

```console
npm i bcryptjs body-parser cors dotenv express jsonwebtoken mongoose nodemon
```

</td></table>

9. Finally, inside the `package.json` file in the `server` folder, make the following changes:

```diff
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
+  "type": "module",
  "scripts": {
+    "start": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.5.2",
    "nodemon": "^2.0.19"
  }
}
```

10. Add two additional files in the `server` folder for environment variables:

<table><td>

`.env.example`

```
PORT = "PORT"
CONNECTION_URL = "MONGO URL STRING"
```

</td></table>

<table><td>

`.env`

```
PORT = 5000
CONNECTION_URL = ""
```

</td></table>

Our folder structure now looks like this:

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
    ├───node_modules
    |   index.js
    |   package.json
    |   package-lock.json
    |   .env
    |   .env.example
```
