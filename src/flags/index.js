import emojiFlags from 'emoji-flags';

import countriesMap from './countries-iso.constants';
import { getKeyByValue } from '../utils';

function getFlag(code) {
  const countryCode = getKeyByValue(countriesMap, code);

  if (code === 'ENG') {
    return '🏴󠁧󠁢󠁥󠁮󠁧󠁿';
  }
  if (countryCode) {
    return emojiFlags.countryCode(countryCode).emoji;
  }
  return '';
}

export function calculateFlags(homeCode, awayCode) {
  const homeCountryFlag = getFlag(homeCode);
  const awayCountryFlag = getFlag(awayCode);

  return {
    home: homeCountryFlag,
    away: awayCountryFlag
  };
}
