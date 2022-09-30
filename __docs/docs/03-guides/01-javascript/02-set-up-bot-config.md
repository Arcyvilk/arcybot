---
sidebar_position: 2
---

# Set up bot's config

For the bot to work, it needs to know its Discord token and its application ID.

:::danger
***Never expose your bot's token.*** It's a violation of Discord's ToS and will open your bot to hackers, what can be devastating to every server it's in if it has elevated permissions.
:::

### Configuring the bot

Add a configuration object to your `index.js` file like following (replacing `YOUR_DISCORD_TOKEN` with the [bot's token](/docs/getting-started/connect-bot-to-discord#get-the-bots-token), and `YOUR_BOT_ID` with [bot's application ID](/docs/getting-started/connect-bot-to-discord#invite-the-bot-to-your-server)):

```tsx title="index.js"
import Arcybot from 'arcybot';

// highlight-start

const config = {
  discordToken: YOUR_DISCORD_TOKEN,
  botId: YOUR_BOT_ID
};

// highlight-end

const commandsObject = [];
const commandsFunctions = [];

const bot = new Arcybot(commandsObject, commandsFunctions, config);

bot.start();
```

### Securing your token

**You don't want to accidentally commit your Discord's token to Github**. We will now take steps to ensure that your token is safe. One of the ways of doing that is passing the token as an environmental variable.

In the root directory create an `.env` file and put your token and bot's ID there:

```yml title=".env"
DISCORD_TOKEN=YOUR_DISCORD_TOKEN
BOT_ID=YOUR_BOT_ID
```

:::tip
If you're using Github as a version control, don't forget to add `.env` file to `.gitignore` to avoid accidentally commiting it.
:::

Then install a `dotenv` package - it loads environmental variables into `process.env`, what allows us to use them in out application:

```
npm install dotenv
```

And finally, import the `dotenv` and use the environmental variables in your `index.js` file:

```tsx title="index.js"
import Arcybot from 'arcybot';
// highlight-start

import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  discordToken: process.env.DISCORD_TOKEN,
  botId: process.env.BOT_ID,
};

// highlight-end

const commandsObject = [];
const commandsFunctions = [];

const bot = new Arcybot(commandsObject, commandsFunctions, CONFIG);

bot.start();
```