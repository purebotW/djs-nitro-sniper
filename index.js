const Discord = require('discord.js-selfbot');
const client = new Discord.Client();
const axios = require('axios');

client.token = 'TOKEN-HERE';

client.on('ready', function(){
	console.log(`Sniping nitros as ${client.user.tag}`)
})

client.on('message', function(msg){
	const code = check(msg.content);
	if (!code) return;
	if (code.length !== 16) return;
	axios.post(
		`https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`,
      {
        channel_id: msg.channel.id,
		payment_source_id: null
      },
      {
        headers: {
          'Authorization': client.token,
          'content-type': 'application/json'
        }
      }
    ).then(function(res) {
		if (res.status == 200) console.log(`Sniped discord.gift/${code} in ${msg.guild.name} sent by ${msg.author.tag}`)
	}).catch(function (error) {console.log(`Invalid nitro code discord.gift/${code}`)});
});

function check(content) {
	const regex = new RegExp('(https://)?(discord.com/gifts/|discordapp.com/gifts/|discord.gift/)([a-zA-Z0-9]+)');
	const code = content.match(regex);
	if (!code) return null;
	return code[3];
};

client.login(client.token);