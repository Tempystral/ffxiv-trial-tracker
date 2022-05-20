const expansion = {
  exp: ["A Realm Reborn",
        "Heavensward",
        "Stormblood",
        "Shadowbringers",
        "Endwalker"],
  indexFromLevel(lvl) {
    return lvl < 50 ? 0 : Math.floor((lvl - 1)/10) - 4;
  },  
  nameFromLevel(lvl) {
    return lvl < 50 ? this.get(0) : this.get(Math.floor((lvl - 1)/10) - 4);
  },
  get(i) { return this.exp[i]; }
}

/**
 * Filter out trial entries based on their appearance in roulettes.
 * High-end trials are excluded from the Trials roulette in addition to the first three, which are in the levelling roulette.
 */
 function isHighEndDuty(data){
  return data.ItemLevelRequired > 0 && !!data.TrialRoulette == false;
}

function isAllianceRaid(data){ return !!data.AllianceRoulette; }
function isSavageRaid(data){ return !data.NormalRaidRoulette; }
function isNormalRaid(data){ return !!data.NormalRaidRoulette; }

/**
 * Return only elements from an expansion before the passed value.
 * A Realm Reborn is expansion 1.
 * @param {*} exp 
 * @returns 
 */
function beforeExp(exp){
  return (data) => {
    return expansion.indexFromLevel(data.ClassJobLevelRequired) < exp;
  }
}

function isExp(exp){
  return (data) => {
    console.log(`Expansion tested: ${expansion.nameFromLevel(data.ClassJobLevelRequired)} | Expansion requested: ${expansion.get(exp)} | ${expansion.indexFromLevel(data.ClassJobLevelRequired) == exp}`)
    return expansion.indexFromLevel(data.ClassJobLevelRequired) == exp;
  }
}

/**
 * Creates a collection of trials.
 * @param {any[]} data 
 * @param {string} name 
 * @param {string} type 
 * @param {number} exp 
 * @returns A collection of trials
 */
 function createCollection(data, name, type, exp){
  // Init collection
  console.log("Creating collection");
  var collection = {
    title: name.concat(type == "trial" ? `(${expansion.get(exp)})` : ""),
    dutyType: type,
    duties: []
  }
  // Add duties to collection
  console.log("Structuring duties");
  data.filter(isExp(exp)).forEach( duty => {
    collection.duties.push(
      {
        name: duty.Name,
        image: `https://xivapi.com${duty.Image}`,
        completed: false,
        ...(type == "raid") && {savageCompleted: false}
      });
  });
  return collection;
}

export { createCollection, isAllianceRaid, isHighEndDuty, isNormalRaid }