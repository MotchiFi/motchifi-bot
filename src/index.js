const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();



//reactionrole
const reactSchema = require("./Schemas.js/reactionrole");
client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.customId === "reactionrole") {
        const guild = interaction.guild.id;
        const message = interaction.message.id;
        const reactchannel = interaction.channel.id;
 
        const reactData = await reactSchema.findOne({
            Guild: guild,
            Message: message,
            Channel: reactchannel
        })
 
        if (!reactData) {
            return;
        } else if (reactData) {
            //Role ID
            const ROLE_ID = reactData.Role;
            //try add/remove role
            try {
                const targetMember = interaction.member;
                const role = interaction.guild.roles.cache.get(ROLE_ID);
                if (!role) {
                  interaction.reply({
                    content: 'Role not found.',
                    ephemeral: true
                  });
                }
                if (targetMember.roles.cache.has(ROLE_ID)) {
                    targetMember.roles.remove(role).catch(err => {console.log(err)});
                  interaction.reply({
                    content: `Removed the role ${role} from ${targetMember}.`,
                    ephemeral: true
                  });
                } else {
                  await targetMember.roles.add(role).catch(err => {console.log(err)});;
                  interaction.reply({
                    content: `Added the role ${role} to ${targetMember}.`,
                    ephemeral: true
                  });
                }
              } catch (error) {
                //catch the error
                console.log(error);
                interaction.reply('An error occurred while processing the command.');
            }
        }
    }
})