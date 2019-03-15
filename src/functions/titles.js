const fighterTitles = ["Person-at-Arms", "Warrior", "Swordsperson", "Hero", "Swashbuckler", "Myrmidon", "Champion", "Superhero", "Lord"];
const muTitles = ["Prestidigitator", "Evoker", "Conjurer", "Theurgist", "Thaumaturgist", "Magician", "Enchanter", "Warlock", "Sorcerer"];
const clericTitles = ["Acolyte", "Adept", "Priest", "Curate", "???", "Canon", "Lama", "Patriarch/Matriarch", "High Priest"];
const thiefTitles = ["Rogue", "Footpad", "Cutpurse", "Robber", "Burglar", "Filcher", "Sharper", "Magsman", "Thief"];
const monkTitles = ["Novice", "Initiate", "Brother", "Disciple", "Immaculate", "Master", "Superior Master", "Master of Dragons", "Master of the North Wind"];
const assassinTitles = ["Bravo", "Rutterkin", "Waghalter", "Murderer", "Thug", "Killer", "Cutthroat", "Executioner", "Assassin"];

export function getTitle(pcClass, level) {
  let title = "";
  switch (pcClass) {
    case "Fighter":
      title = fighterTitles[level - 1];
      break;
    case "Magic-User":
      title = muTitles[level - 1];
      break;
    case "Cleric":
      title = clericTitles[level - 1];
      break;
    case "Thief":
      title = thiefTitles[level - 1];
      break;
    case "Monk":
      title = monkTitles[level - 1];
      break;
    case "Assassin":
      title = assassinTitles[level - 1];
      break;
    default:
  }
  return title;
}