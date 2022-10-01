---
sidebar_position: 3
---

# Create a list of commands

:::tip
All of Arcybot's commands are, by default, **[slash commands](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ)**!
:::

### Adding a simple text command

Basic information about all of the bot's commands are stored in an array of objects. To store them, you can create a JSON file, JavaScript object, or a database collection. In this tutorial we'll just create a JS object, but in the longer run it's much better to store your command list in a database to have an easy access to it without the need to modify the code every time you want to adjust anything.

Every command has fields required for all types of commands, and a few unique to the particular's command type. [Read more about Arcybot's command types here](/docs/category/command-types).

Let's add a simple text command which, when used, prints "Hello world!" to Discord's chat.

```tsx title="index.js"
import { Arcybot, CommandType } from 'arcybot';
import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  discordToken: process.env.DISCORD_TOKEN,
  botId: process.env.BOT_ID,
};

// highlight-start

const commandsObject = [{
  type: CommandType.TEXT,
  text: 'Hello World!',
  keyword: 'hello',
  description: 'Print your first hello world!',
  isDisabled: false,
  isModOnly: false,
  canUseInDm: true,
}];

// highlight-end

const commandsFunctions = [];
const customCommands = [];

const bot = new Arcybot(config, commandsObject, commandsFunctions, customCommands);

bot.start('Bot started!');
```

Voila! Your first command is ready.

When you start the bot, it will take a few seconds to register the commands. Observe the logs in your console terminal - commands become usable after you see the `[INFO] - Successfully registered 3 global commands!` log.

:::info
All Arcybot's commands are, by default, global. This means that they are not limited to a Discord server, but can be used in any server that your bot is in, as well as in private messages.
:::

### More sophisticated commands

If you don't want to stop with simple text and embed commands, you can also create a [custom command](/docs/commands/custom-command).
