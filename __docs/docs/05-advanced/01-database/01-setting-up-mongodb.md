---
sidebar_position: 1
---

# Setting up MongoDB

Install the MongoDB on your server/PC following [this tutorial](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).

After it's installed, you need to run a Mongo Daemon so it keeps working in the background. Mongo runs on port `27017` by default, but its worth to choose some other port to protect your database from the attacks that scan for unprotected default database ports. Decide on a port you want to run your database on or stay with the default 27017.

To start the Mongo Daemon, use the following command:

```
mongod --auth --fork --port YOUR_MONGO_PORT --bind_ip 0.0.0.0 --dbpath /var/lib/mongodb --logpath /var/lib/mongod.log
```

The `--bind_ip 0.0.0.0` allows the remote clients to connect to your database. It is useful if your database runs on different machine than your bot. You can remove that part if you host both the bot and the database on the same machine.

### Securing your database

You can skip this section if you want to inevitably get hacked.

Mongo database is created without any authentication method, therefore to keep your database secure you should start from creating an administrator account.

The Administrator should be added to the `admin` database. To do so, use the following commands:

- `mongo --port YOUR_MONGO_PORT`
- `use admin` (this switches you to `admin` database)
- ```
  db.createUser(
      {
          user: "YOUR_ADMIN_USERNAME",
          pwd: "YOUR_ADMIN_PASSWORD",
          roles: [ "root" ]
      }
  )
  ```

Voila! Your database now has an admin account. Now whenever you want to perform any administrative actions, you have to use the following command beforehand:

`db.auth({"login": "YOUR_ADMIN_USERNAME", "pwd": "YOUR_ADMIN_PASSWORD"})`
