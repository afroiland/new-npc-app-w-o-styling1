import { rollDice } from "./dice";

export function fight(incomingGroupA, incomingGroupB) {
  let log = [];

  let groupA = incomingGroupA.map(npc => ({
    "name": npc.name, "ac": npc.ac, "hp": npc.currentHP, "thac0": npc.thac0,
    "damage": getDamage(npc.weapon), "dmgBonus": getDmgBonus(npc.str, npc.ex_str), "spells": npc.memorized, "incap": false
  }));

  let groupB = incomingGroupB.map(npc => ({
    "name": npc.name, "ac": npc.ac, "hp": npc.currentHP, "thac0": npc.thac0,
    "damage": getDamage(npc.weapon), "dmgBonus": getDmgBonus(npc.str, npc.ex_str), "spells": npc.memorized, "incap": false
  }));

  let eachSideHasOnePersonStanding = true;
  let groupAHasOnePersonStanding = true;
  let groupBHasOnePersonStanding = true;

  while (eachSideHasOnePersonStanding) {
    if (!groupAHasOnePersonStanding) {
      log.push("Group B is victorious.");
      eachSideHasOnePersonStanding = false;
      console.log("log: ", log);
    }
    if (!groupBHasOnePersonStanding) {
      eachSideHasOnePersonStanding = false;
      log.push("Group A is victorious.");
      console.log("log: ", log);
    }
    if (eachSideHasOnePersonStanding) {
      doOneRound();
    }
  }

  function doOneRound() {
    let groupAInit = rollDice(1, 6);
    let groupBInit = rollDice(1, 6);

    if (groupAInit > groupBInit) {
      oneSideGoes("A");
      oneSideGoes("B");
    } else if (groupAInit < groupBInit) {
      oneSideGoes("B");
      oneSideGoes("A");
    } else if (groupAInit === groupBInit) {
      // simultaneous combat
    }
  }

  function oneSideGoes(attackingGroupId) {
    let attackingGroup = attackingGroupId === "A" ? groupA : groupB;
    let defendingGroup = attackingGroupId === "A" ? groupB : groupA;

    // loop through each npc in attacking group
    for (let i = 0; i < attackingGroup.length; i++) {
      // check that each side has one person standing
      groupAHasOnePersonStanding = false;
      for (let j = 0; j < groupA.length; j++) {
        if (groupA[j].incap === false) {
          groupAHasOnePersonStanding = true;
          break;
        }
      }
      groupBHasOnePersonStanding = false;
      for (let k = 0; k < groupB.length; k++) {
        if (groupB[k].incap === false) {
          groupBHasOnePersonStanding = true;
          break;
        }
      }
      if (groupAHasOnePersonStanding && groupBHasOnePersonStanding) {
        if (attackingGroup[i].incap) {
          //console.log("No action for fallen NPC");
        } else {
          // select target
          let target = {};
          while (Object.keys(target).length === 0) {
            let tempTarget = defendingGroup[rollDice(1, defendingGroup.length) - 1];
            if (tempTarget.incap) {
              target = {};
            } else {
              target = tempTarget;
            }
          }

          // attack
          if (attackingGroup[i].thac0 <= rollDice(1, 20) - target.ac) {
            // attack succeeds
            let minDamage = attackingGroup[i].damage[0];
            let maxDamage = attackingGroup[i].damage[2];
            let damage = 0;
            while (minDamage > damage || damage > maxDamage) {
              damage = rollDice(1, 10);
            }
            damage += attackingGroup[i].dmgBonus;

            log.push(attackingGroup[i].name + " hits " + target.name + " for " + damage + ".");

            // subtract dmg from hp and change incap status of target if necessary
            let groupAIndex = groupA.findIndex(obj => obj.name === target.name);
            let groupBIndex = groupB.findIndex(obj => obj.name === target.name);
            if (groupAIndex !== -1) {
              groupA[groupAIndex].hp -= damage;
              if (groupA[groupAIndex].hp <= 0) {
                groupA[groupAIndex].incap = true;
                log.push(groupA[groupAIndex].name + " has fallen.");
              }
            }
            if (groupBIndex !== -1) {
              groupB[groupBIndex].hp -= damage;
              if (groupB[groupBIndex].hp <= 0) {
                groupB[groupBIndex].incap = true;
                log.push(groupB[groupBIndex].name + " has fallen.");
              }
            }
          }
        }
      }
    }
  }
  return log;
}

function getDamage(weapon) {
  let damage;
  switch (weapon) {
    case "Darts":
      damage = "1-3";
      break;
    case "Dagger":
      damage = "1-4";
      break;
    case "Hammer":
      damage = "2-5";
      break;
    case "Club":
    case "Mace":
    case "Shortsword":
    case "Staff":
      damage = "1-6";
      break;
    case "Flail":
      damage = "2-7";
      break;
    case "Axe":
    case "Longsword":
      damage = "1-8";
      break;
    case "Halberd":
    case "Two-Handed Sword":
      damage = "1-10";
      break;
    default:
  }
  return damage;
}

function getDmgBonus(str, ex_str) {
  let bonus = 0;
  if (15 < str < 18) {
    bonus = 1;
  }
  if (str === 18) {
    if (ex_str === 0) {
      bonus = 2;
    } else if (1 <= ex_str <= 75) {
      bonus = 3;
    } else if (76 <= ex_str <= 90) {
      bonus = 4;
    } else if (91 <= ex_str <= 99) {
      bonus = 5;
    } else if (ex_str === 100) {
      bonus = 6;
    }
  }
  return bonus;
}
