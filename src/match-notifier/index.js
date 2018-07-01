import request from 'request-promise';

import { formMatchResult } from '../utils/match';
import { getFlag } from '../utils/flags';
import { getAllGoalsFromMatch } from '../utils/goals';

const wcDataUrl = 'https://worldcup.sfg.io/matches/today';

export async function fetchTodayMatches(ctx) {
  const todayMathes = await request(wcDataUrl);

  if (todayMathes) {
    let parsedMatches;

    try {
      parsedMatches = JSON.parse(todayMathes);
    } catch (error) {
      ctx.reply('Sorry! I`m broken :(');
    }

    const todayMatchesReply = formTodayMatchesReply(parsedMatches);

    ctx.reply(`Today: \n${todayMatchesReply}`);
  } else {
    ctx.reply('Sorry! I`m broken :(');
  }
}

function formTodayMatchesReply(matches) {
  return matches.map(formMatchReply).join('\n');
}

export function formMatchReply(match) {
  const homeTeamFlag = getFlag(match.home_team.code);
  const awayTeamFlag = getFlag(match.away_team.code);
  const matchGoals = getAllGoalsFromMatch(match);
  const homeTeamGoals = matchGoals.filter(goal => goal.team === 'home').length;
  const awayTeamGoals = matchGoals.filter(goal => goal.team === 'away').length;
  const resultToShow = formMatchResult(match.time, match.datetime, homeTeamGoals, awayTeamGoals);


  return `${homeTeamFlag} ${match.home_team_country} - ${awayTeamFlag} ${match.away_team_country}: ${resultToShow}`;
}
