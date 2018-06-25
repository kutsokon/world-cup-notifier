import request from 'request-promise';
import moment from 'moment';
import _ from 'lodash';

import { calculateFlags } from '../flags';
import { calculateGoals } from '../goals';

const wcDataUrl = 'https://worldcup.sfg.io/matches/today';

const todayGamesRequest = request(wcDataUrl);

export function fetchTodayGames(ctx) {
  todayGamesRequest
    .then((data) => {
      try {
        const parsedGames = JSON.parse(data);
        const todayGamesReply = formTodayGamesReply(parsedGames);

        ctx.reply(`Today: \n${todayGamesReply}`);
      } catch (error) {
        ctx.reply('Sorry! I`m broken :(');
      }
    })
    .catch((err) => {
      ctx.reply('Sorry! I`m broken :(');
    });
}

export function startGamesPolling(ctx) {
  // const requestPolling = setInterval(() => {

  // }, 10000);
}

function formTodayGamesReply(games) {
  const reply = _
    .map(games, (game) => {
      const flags = calculateFlags(game.home_team.code, game.away_team.code);
      const goals = calculateGoals(game.home_team_events, game.away_team_events);
      const resultToShow = formGameResult(game.time, game.datetime, goals);

      return `${flags.home} ${game.home_team_country} - ${flags.away} ${
        game.away_team_country
      }: ${resultToShow}`;
    })
    .join('\n');

  return reply;
}

function formGameResult(time, datetime, goals) {
  if (time === 'full-time') {
    return `FT: ${goals.home} - ${goals.away}`;
  }
  if (!time) {
    return `🕐: ${moment(datetime).format('HH:mm')}`;
  }

  return `LIVE: ${goals.home} - ${goals.away}`;
}
