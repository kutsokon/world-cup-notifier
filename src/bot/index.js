
import Telegraf from 'telegraf';

import { fetchTodayGames, startGamesPolling } from '../game';

const bot = new Telegraf('564562461:AAE1rR4veXt6NCg4KRxKytAnFnyEYBFnqNQ');

bot.start((ctx) => {
  ctx.reply('Welcome to World Cup 2018 Notifier! Type /help to get the full list of commands');
  startGamesPolling(ctx);
});
bot.help(ctx => ctx.reply('Type /today to get today`s World Cup games'));
bot.hears('/today', (ctx) => {
  fetchTodayGames(ctx);
});

bot.startPolling();
