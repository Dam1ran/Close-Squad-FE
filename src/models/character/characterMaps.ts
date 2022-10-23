import { CsEntityClass } from '../api.models';
import { CsEntityStatus, CharacterRace } from '../enums';

export const CharacterRaceClassesMap: { [key in CharacterRace]: CsEntityClass[] } = {
  [CharacterRace.Divine]: [CsEntityClass.Cupid, CsEntityClass.Doctor],
  [CharacterRace.Human]: [CsEntityClass.Medium, CsEntityClass.Templar],
  [CharacterRace.Dwarf]: [CsEntityClass.Handyman],
  [CharacterRace.Orc]: [CsEntityClass.Berserk, CsEntityClass.Seer],
  [CharacterRace.NightElf]: [CsEntityClass.Assassin, CsEntityClass.Occultist],
};

export const CsEntityClassIconMap: { [key in CsEntityClass]: string } = {
  [CsEntityClass.Assassin]: '🗡',
  [CsEntityClass.Berserk]: '💪',
  [CsEntityClass.Cupid]: '🏹',
  [CsEntityClass.Doctor]: '✨',
  [CsEntityClass.Handyman]: '🛠',
  [CsEntityClass.Medium]: '💥',
  [CsEntityClass.Occultist]: '🔯',
  [CsEntityClass.Seer]: '🍥',
  [CsEntityClass.Templar]: '🛡',
};

export const CharacterStatusIconMap: { [key in CsEntityStatus]: string } = {
  [CsEntityStatus.Astray]: '💤',
  [CsEntityStatus.Awake]: '🔅',
  [CsEntityStatus.Sitting]: '🏵',
  [CsEntityStatus.Traveling]: '👣',
  [CsEntityStatus.Engaged]: '💢',
  [CsEntityStatus.Dead]: '🖤',
};
