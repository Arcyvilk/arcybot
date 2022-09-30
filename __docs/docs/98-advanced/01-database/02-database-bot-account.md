---
sidebar_position: 2
---

# Creating database bot account

### Creating a MongoDB account for your bot

After installing and preparing the Administrator account, I recommend creating a secondary account for the bot with less permissions. This allows you to track what the bot does in the database, and also secures your database in case your bot's credentials get leaked.

To do this, use the following commands in the shell:

- `mongo --port YOUR_PORT_HERE`
- `use admin`
- `db.auth({"user":"YOUR_ADMIN_LOGIN", pwd:"YOUR_ADMIN_PASSWORD"})`
- `db.createUser({"user":"YOUR_BOT_LOGIN", pwd:"YOUR_BOT_PASSWORD", roles: [{ "role":"readWrite", "db": "YOUR_BOT_DATABASE_NAME"}]})`

You need to remember `YOUR_BOT_LOGIN` and `YOUR_BOT_PASSWORD` so you can fill them in the next step into bot's configuration.

### Connecting the bot to its MongoDB account

- navigate to the `config.json` file you've created earlier
- find the `DATABASE_URL` field
- paste this into the `DATABASE_URL` field:

```
"mongodb://YOUR_BOT_LOGIN:YOUR_BOT_PASSWORD@DATABASE_HOST:DATABASE_PORT/YOUR_BOT_DATABASE_NAME?authSource=admin"
```

Don't forget to edit that URL to reflect your data!