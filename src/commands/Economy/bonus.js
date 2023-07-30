const economyJs = require('../../models/economic');
const moment = require('moment-timezone');
module.exports = {
  name: 'bonus',
  alias: ['Bonus'],
  usage: `${prefa}bonus`,
  desc: 'Claim your bonus 50000 gold (one-time).',
  category: 'Economy',
  react: '💰',
  start: async (client, m, { command, yaOwn, prefix, pushname, pushName, args }) => {
    if (!m.from.endsWith("@g.us")) {
      return m.reply("Please use this command in a group.");
    }
    const userId = m.sender;
    let economy = await economyJs.findOne({ userId });
    if (!economy) {
      economy = new economyJs({ userId });
      await economy.save();
    }
    const hasClaimedBonus = economy.hasClaimedBonus;
    const now = moment.tz('Africa/Blantyre');
    if (hasClaimedBonus) {
      return m.reply("You have already claimed your bonus gold.");
    } else {
      economy.wallet += 50000;
      economy.hasClaimedBonus = true;
      await economy.save();
      const buttonText = `You claimed your one-time bonus of 50000 gold! | ${pushName}`;
      await client.sendMessage(m.from, { text: buttonText }, { quoted: m });
    }
  }
};
