// Fivem Server Status Discord Bot by Zofux

// DO NOT CHANGE THE CODE, change the config.json

// CODE
const Discord = require('discord.js');
const bot = new Discord.Client()
const fivereborn = require('fivereborn-query');
const config = require('./config.json');

bot.once('ready', () => {
    console.log('Bot is online')
})

function activity(){
    setTimeout(() => {
        fivereborn.query(config.SERVER_IP,config.SERVER_PORT, (err, data) => { 
            if (err) { 
                console.log(err); 
            } else { 
                bot.user.setActivity(`${data.clients} players on ${config.SERVER_NAME}`, { type: "WATCHING" });
            }
        });
        activity(); 
    }, 1000);
}
activity();

bot.login(config.BOT_TOKEN)