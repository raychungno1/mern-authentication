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
npx create-react-app ./
```

3. Install the nessecary dependencies for the front end application
    * `axios` an HTTP client to make requests
    * `jwt-decode` decodes JWT tokens

```console
npm i axios jwt-decode
```

4. **OPTIONAL:** to reduce clutter in the initial CRA app, I like to delete everything inside the `src` folder and replace it with just two files:

```js
// index.js
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

```js
// App.js
import React from "react";

const App = () => {
  return (
    <div>
      <h1>App</h1>
    </div>
  );
};

export default App;
```

Our folder structure now looks like this:

```
project
├───client
│   ├───node_modules
│   ├───public
│   ├───src
|   |   |   App.js
|   |   |   index.js
│   |
│   |   .gitignore
│   |   package.json
│   |   package-lock.json
│
└───server
```

5. Navigate to the `server` folder and initialize the back end 

    * Create a file called `index.js` in the server folder
    * This will be the starting point of our back end server
<br />

6. Initialize a `package.json` file in the `server` folder

```console
cd server
npm init -y
```

7. Install the nessecary dependencies for the back end server

    * `body-parser` allows us to send `POST` requests
    * `cors` enables cross origin requests
    * `express` a Node.js web framework
    * `mongoose` allows up to create models for our user
    * `nodemon` automatically restarts the node application when changes are detected

```console
npm i body-parser cors express mongoose nodemon
```

8. Finally, inside the `package.json` file in the `server` folder, make the following changes:

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
    "body-parser": "^1.20.0",
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "mongoose": "^6.5.2",
    "nodemon": "^2.0.19"
  }
}
```

Our folder structure now looks like this:

```
project
├───client
│   ├───node_modules
│   ├───public
│   ├───src
|   |   |   App.js
|   |   |   index.js
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
```