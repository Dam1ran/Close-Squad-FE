import { CharacterClass, CharacterRace } from '../api.models';
import { CharacterStatus } from '../enums';

export const CharacterRaceClassesMap: { [key in CharacterRace]: CharacterClass[] } = {
  [CharacterRace.Divine]: [CharacterClass.Cupid, CharacterClass.Doctor],
  [CharacterRace.Human]: [CharacterClass.Medium, CharacterClass.Templar],
  [CharacterRace.Dwarf]: [CharacterClass.Handyman],
  [CharacterRace.Orc]: [CharacterClass.Berserk, CharacterClass.Seer],
  [CharacterRace.NightElf]: [CharacterClass.Assassin, CharacterClass.Occultist],
};

export const CharacterClassIconMap: { [key in CharacterClass]: string } = {
  [CharacterClass.Assassin]: '🗡',
  [CharacterClass.Berserk]: '💪',
  [CharacterClass.Cupid]: '🏹',
  [CharacterClass.Doctor]: '✨',
  [CharacterClass.Handyman]: '🛠',
  [CharacterClass.Medium]: '💥',
  [CharacterClass.Occultist]: '🔯',
  [CharacterClass.Seer]: '🍥',
  [CharacterClass.Templar]: '🛡',
};

export const CharacterStatusIconMap: { [key in CharacterStatus]: string } = {
  [CharacterStatus.Astray]: '💤',
  [CharacterStatus.Awake]: '🔅',
  [CharacterStatus.Traveling]: '👣',
  [CharacterStatus.Engaged]: '💢',
  [CharacterStatus.Dead]: '🖤',
};
