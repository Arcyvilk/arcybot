---
sidebar_position: 1
---

# Create a new JavaScript project

In this section, you'll learn how to build a simple bot on the `Arcybot` library. We will use JavaScript for the simplicity, but the library is written in TypeScript and it's a recommended approach for the bots based on it.

### Create a package.json

Create a new folder for your bot.

Inside the folder, open a terminal and run an `npm init` command. This will create a `package.json` file for your new project. The utility will walk you through all the steps, but you don't have to fill in the fields at this point.

After the `package.json` file is created, navigate to it and add a `type` field and a `start` script:

```json title="package.json"
{
  "name": "arcybot-tutorial",
  "version": "1.0.0",
  "main": "index.js",
  "license": "ISC",
  // highlight-start
  "type": "module",
  "scripts": {
    "start": "node index.js"
  }
  // highlight-end
}
```

### Install an `Arcybot` dependency

Use one of the following commands, depending on which package manager you prefer:

#### NPM
```bash
npm install arcybot@latest
```

#### Yarn
```bash
yarn add arcybot@latest
```

### Create an `index.js` file

Create an `index.js` file in the same directory as the `package.json` file - this will serve as an entry point for your bot:

```tsx title="index.js"
import { Arcybot } from 'arcybot';

const config = {};              // configuration object
const commandsObject = [];      // a JSON object storing basic info about your commands
const commandsFunctions = [];   // methods executing your more sophisticated commands

const bot = new Arcybot(commandsObject, commandsFunctions, config);

bot.start('Bot started!');
```

This code imports an `arcybot` dependency, creates a new `Arcybot` instance and then starts the bot. 

It's almost ready to work - the only thing it needs is a proper configuration!
