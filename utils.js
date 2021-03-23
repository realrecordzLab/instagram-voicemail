//
const moment = require('moment');
const chalk = require('chalk');
const path = require('path');
const https = require('https');
const fs = require('fs');

exports.messageLogger = (data, threads) => {
    const timestamp = moment(Number(data.message.timestamp) / 1000);
    console.log(chalk.magenta('+---NEW MESSAGE---+'));
    console.log(chalk.yellow(`Conversation with: ${threads.get(data.message.thread_id)}`));
    console.log(chalk.yellow(`Date: ${timestamp}`));
    switch(data.message.item_type){
        case 'text':
            if( data.message.hasOwnProperty('reactions') ){
                console.log(chalk.yellow(`${threads.get(data.message.thread_id)} like your last message\n`));
            }    
            console.log(chalk.grey(`${data.message.text}`));
            break;
        case 'voice_media':
            //thread.voice_media.media.audio.audio_src
            const filename = paht.basename(data.message.voice_media.media.audio.audio_src);
            const downloadDir = path.format({dir: __dirname, base: `media/${filename}`});
            const stream = fs.createWriteStream(downloadDir);
            https.get(data.message.voice_media.media.audio.audio_src, (response) => {
                response.pipe(stream);
                console.log(chalk.yellow(`New vocal message received and saved in: ${downloadDir}\n`));
            });
            break;
    }
    console.log(chalk.magenta(`-------------------\n`));
}