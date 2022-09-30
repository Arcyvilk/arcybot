---
sidebar_position: 3
---

# Browsing database

To view and edit your database's contents you can either use shell commands, or a GUI. I recommend using GUI because it makes your life much easier. A very good and free MongoDB GUI is [MongoDB Compass](https://www.mongodb.com/try/download/compass) - just navigate to the website and follow the instructions to download and install it.

After the installation open the MongoDB Compass. You should see this screen:

![](https://raw.githubusercontent.com/Arcyvilk/arcybot-discord-template/gh-pages/imgs/compass1.png)

I recommend clicking the `Fill in connection fields individually` option. Once you do it, you should see this screen:

![](https://raw.githubusercontent.com/Arcyvilk/arcybot-discord-template/gh-pages/imgs/compass2.png)

If you see less fields than on the attached screenshot, you need to change the Authentication method from `None` to `Username / Password`. Fill the fields accordingly to the screenshot above using your Administrator credentials that we created earlier and click "Connect". You should be able to see your database now. It is empty for now, but it will get filled automatically when we run the bot for the first time.