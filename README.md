# instagram voicemail
A simple node CLI script for instagram DM. 

The idea for this CLI script is inspired by the traditional voicemail. At the moment the only function provided by the script is new messages displaying inside your terminal window. I'm working to give you the ability to add a custom voicemail audio message that will be send to everyone that will contact you to notify them that you will not be able to reply to a DM in a certain moment. Unde the hood this library is using [Instagram MQTT](https://github.com/Nerixyz/instagram_mqtt) and [Instagram Private API](https://github.com/dilame/instagram-private-api) 

**USAGE**

Download or clone the repository and Install the project dependencies
```
npm install
```
Run the script
```
node index.js
```

****DISCLAIMER****

This script is safe to use. Your Instagram credentials will be used from the script only for login. No data is shared online or with third party server. Be carefoul during the usage, I'm not responsable if your account is blocked for spam activities. 
