const Discord = require('discord.js')
const bot = new Discord.Client();
const axios = require('axios').default;

bot.on('ready',() => {
    
    console.log('Bot Online')
})
bot.on('message', async(message) => {
    if(message.author.bot) return
    let prefix = '!'; 
    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length)
    let args = MessageArray.slice(1)

    if(!message.content.startsWith(prefix)) return;





    if(cmd == 'getplace') {
        var game = args[0]
        var category = args[1]
        var overallsecs = 0;

        overallsecs += (parseFloat(args[2]) * 3600);
        overallsecs += (parseFloat(args[3]) * 60);
        overallsecs += parseFloat(args[4]);
        overallsecs += (parseFloat(args[5]) / 1000);
        let leaderboardtab = (await axios.get("https://www.speedrun.com/api/v1/leaderboards/" + game + "/category/" + category).catch(console.error))
        var runcount = 0;
        var stopnow = 0
        var finalplace
        do {
            if(overallsecs < leaderboardtab.data.data.runs[runcount].run.times.primary_t){
                stopnow = 1;
                finalplace = leaderboardtab.data.data.runs[runcount].place;
            }
            else{
                runcount ++;
                stopnow = 0
                if(runcount >= Object.keys(leaderboardtab.data.data.runs).length) {
                    stopnow = 1;
                    finalplace = Object.keys(leaderboardtab.data.data.runs).length + 1
                    
                }
                
            }
        }
        while(stopnow == 0)
        message.reply("Deine Position auf dem Leaderboard von " + leaderboardtab.data.data.weblink + " wäre " + finalplace + "#.")
        


    } 

    if(cmd == "cat"){
        let catim = (await axios.get("https://api.thecatapi.com/v1/images/search?api_key=acfda0ee-d73f-4559-adef-36823f43bd89"))
        message.channel.send(catim.data[0].url)
    
    }


})




bot.login(process.env.BOT_TOKEN)
