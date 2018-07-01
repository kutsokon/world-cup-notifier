import request from 'request-promise';

import { cacheGame, getCachedGame } from '../match-cache';
import { getFlag } from '../utils/flags';
import { getAllGoalsFromMatch, removePreviousGoals } from '../utils/goals';
import { formMatchReply } from '../match-notifier';

const wcCurrentDataUrl = 'https://worldcup.sfg.io/matches/current';

export async function startGoalPolling(ctx) {
  setInterval(async () => {
    const todayMatches = await request(wcCurrentDataUrl);

    if (todayMatches) {
      todayMatches.forEach((match) => {
        const cachedGame = getCachedGame(match.fifa_id);
        const previousGoals = cachedGame ? getAllGoalsFromMatch(cachedGame) : [];
        const gameGoals = getAllGoalsFromMatch(match);
        const newGoals = removePreviousGoals(gameGoals, previousGoals);

        if (newGoals.length) {
          newGoals.forEach((goal) => {
            const goalReply = formGoalReply(goal, match);
            ctx.reply(goalReply);
            const matchReply = formMatchReply(match);
            ctx.reply(matchReply);
          });
        }

        cacheGame(match);
      });
    }
  }, 30000);
}

function formGoalReply(goal, game) {
  const teamScored = goal.team === 'home' ? game.home_team.code : game.away_team.code;
  const flag = getFlag(teamScored);
  const ogGoal = goal.type_of_event === 'goal-own' ? 'OG:' : '';
  return `GOAL: ${flag} ${ogGoal} ${goal.player} ${goal.time} 🎉🎉🎉`;
}
