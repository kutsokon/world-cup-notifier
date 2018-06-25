import _ from 'lodash';

export function calculateGoals(homeCountryEvents, awayCountryEvents) {
  const goal = 'goal';
  const penaltyGoal = 'goal-penalty';
  const homeGoalEvents = _.filter(
    homeCountryEvents,
    event => event.type_of_event === goal || event.type_of_event === penaltyGoal
  );
  const awayGoalEvents = _.filter(
    awayCountryEvents,
    event => event.type_of_event === goal || event.type_of_event === penaltyGoal
  );

  return {
    home: homeGoalEvents.length,
    away: awayGoalEvents.length
  };
}
