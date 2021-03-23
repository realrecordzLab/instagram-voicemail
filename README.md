# instagram voicemail
A simple node CLI script for instagram DM. 

The idea for this CLI script is inspired by the traditional voicemail. Under the hood this library is using [Instagram MQTT](https://github.com/Nerixyz/instagram_mqtt) and [Instagram Private API](https://github.com/dilame/instagram-private-api) 

**USAGE**

Download or clone the repository,navigate to the created folder and Install the project dependencies
```
npm install
```
Before run the script, create a new folder and call it `media` inside the project folder. It will hold all the audio messages that will be sended to you when the script is running. 

To use the voicemail bot you need to have the `ffmpeg` library installed in your system. Place inside the script folder an `mp3` file named `voicemail.mp3`. The script, when you choose to enable the bot, will look for this file and will take care to convert it into the instagram accepted audio format. Be sure to use only files of the maximum duration of 1:00 minutes. 

To replace your voicemail message, simply replace the `voicemail.mp3` file and delete the auto generated `voicemail.mp4` file.

Run the script
```
node index.js
```

****DISCLAIMER****

This script is safe to use. Your Instagram credentials will be used from the script only for login. No data is shared online or with third party server. Be carefoul during the usage, I'm not responsable if your account is blocked for spam activities. 
