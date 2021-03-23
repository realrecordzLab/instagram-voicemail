const { IgApiClient } = require('instagram-private-api');
const { withRealtime } = require('instagram_mqtt');
const { messageLogger } = require('./utils');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const ora = require('ora');
const voicemailFile = path.format({dir: __dirname, base: 'voicemail.mp4'});

let threads = new Map();
const ig = withRealtime(new IgApiClient());
ig.state.generateDevice(process.env.IG_USERNAME);

( async () => {
    
    console.log(chalk.yellow('Logging in...'));
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    console.log(chalk.green('Logged!'));
    
    console.log(chalk.yellow('Connecting to inbox...'));
    await ig.realtime.connect({ 
        irisData: await ig.feed.directInbox().request() 
    });
    console.log(chalk.green('Connected!'));

    ora({
        color: 'magenta', 
        text: chalk.magenta(`Listening for incoming messages\n`)
    }).start();
        
    ig.realtime.on('message', async (data) => { 
        if( String(data.message.user_id) === ig.state.cookieUserId ){
            return;
        } 
        
        if( String(data.message.path).endsWith('has_seen') ){
            return;
        } 
        
        if( !threads.has(data.message.thread_id) ){
            const thread = await ig.feed.directThread({thread_id: data.message.thread_id}).request();
            threads.set(data.message.thread_id, thread.thread.users[0].full_name);
            messageLogger(ig, data, threads);
        } else {
            messageLogger(ig, data, threads);
        }
        //console.log(process.env.ENABLE_BOT);
        if( process.env.ENABLE_BOT ){
            if( !String(data.message.path).endsWith('has_seen') && String(data.message.user_id) !== ig.state.cookieUserId ){
                await ig.entity.directThread(data.message.thread_id).broadcastVoice({
                    file: fs.readFileSync(voicemailFile)
                });  
            }   
        }
    });
        
})();

