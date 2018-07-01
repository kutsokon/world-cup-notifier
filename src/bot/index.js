import Telegraf from 'telegraf';

import { fetchTodayMatches } from '../match-notifier';
import { startGoalPolling } from '../goal-notifier';

const API_KEY = '';
const bot = new Telegraf(API_KEY);

bot.start((ctx) => {
  ctx.reply('Welcome to World Cup 2018 Notifier! Every WC18 goals in your messanger!');
  startGoalPolling(ctx);
});
bot.help(ctx => ctx.reply('Type /today to get today`s World Cup games'));
bot.hears('/today', (ctx) => {
  fetchTodayMatches(ctx);
});
bot.hears('/poll', (ctx) => {
  startGoalPolling(ctx);
});

bot.startPolling();
