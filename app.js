const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')

const copyId = '1058808050665914402'
const pasteId = '1058808391738343495'

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
]});

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', async (message) => {
  if (message.author.bot) return

  const { id, parentId } = message.channel
  if (id !== copyId && parentId !== copyId) return

  const channel = client.channels.cache.get(pasteId)
  await channel.send(message.content)
})

client.on('messageUpdate', async (oldMessage, message) => {
  const { id, parentId } = message.channel
  if (id !== copyId && parentId !== copyId) return

  const channel = client.channels.cache.get(pasteId)
  await channel.send(message.content)
});

client.login(process.env.DISCORD_TOKEN)
