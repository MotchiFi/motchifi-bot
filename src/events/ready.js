const mongoose = require('mongoose');
const mongodbURL = process.env.MONGODBURL;
const { ActivityType, EmbedBuilder, Embed } = require(`discord.js`);

mongoose.set('strictQuery', false);
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.username} is ready!`);
        //Server & Member count
        const servers = await client.guilds.cache.size;
        const users = await client.guilds.cache.reduce(
        (a, b) => a + b.memberCount,
        0
       );
        console.log(`${client.user.username} is at ${servers} Servers!`)
        console.log(`${client.user.username} has ${users} users!`)
        //MONGODB Check
        if (!mongodbURL) return console.log("Error: Cannot find MongodbURL. File: *.env*");
        await mongoose.connect(mongodbURL || '', {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        if (mongoose.connect) {
            console.log("Connected with MONGODB: True");
        } else {
          console.log("Connected with MONGODB: False");
        }

        client.user.setActivity({ name: "Running on toowake's PC", type: ActivityType.Watching})
    },
};