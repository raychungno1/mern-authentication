# MongoDB Setup

This example will be hosted on MongoDB Atlas

1. Naviate to the MongoDB [website](https://www.mongodb.com/atlas/database)

2. Click on the `Try Free `button, and create an account or login

3. Click on `Create` or `Build a Cluster`
    * You may have to create a project before doing this

4. Click on `Shared`, then `Create Cluster on the bottom of the page

5. Click on the `Database Access` tab in the sidebar, then choose `Add New Database User`
    * Choose `Username and Password` as the auth method, enter the promted details, then click `Add User`
    * Remember this password!!!!!!

6. Click on the `Network Access` tab in the sidebar, then choose `Add IP Address`
    * Choose `Add current IP Address`, then `Confirm`

7. Click on the `Database` tab in the sidebar, then the `Connect` button on the cluster

8. Click on `Connect your application`, the copy the connection string on the page

9. Paste the connection string in the `.env` file in our `server` folder
    * Make sure to replace `<usernsme>` and `<password>` with the database user you created in step 5

```diff
PORT = 5000
- CONNECTION_URL = ""
+ CONNECTION_URL = "mongodb+srv://<username>:<password>..."
```

10. **IMPORTANT:** make sure the `.env` is included in any `.gitignore` files. DO NOT share this link publicly!


