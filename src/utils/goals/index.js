export function getAllGoalsFromMatch(match) {
  if (!match.home_team_events && !match.away_team_events) {
    return [];
  }
  const homeGoals = goalEvents(match.home_team_events).map((goal) => {
    const team = goal.type_of_event === 'goal-own' ? 'away' : 'home';
    return Object.assign({}, goal, { team });
  });
  const awayGoals = goalEvents(match.away_team_events).map((goal) => {
    const team = goal.type_of_event === 'goal-own' ? 'home' : 'away';
    return Object.assign({}, goal, { team });
  });
  return homeGoals.concat(awayGoals).sort(timeSort);
}

export function removePreviousGoals(allGoals, previous) {
  return allGoals.filter(goal => !previous.find(previoisGoal => previoisGoal.id === goal.id));
}

export function goalEvents(events = []) {
  return events.filter(event => event.type_of_event.indexOf('goal') === 0);
}

export function timeSort(a, b) {
  return parseInt(a.time, 10) - parseInt(b.time, 10);
}
