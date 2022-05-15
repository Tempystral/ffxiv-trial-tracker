import XIVAPI from "@xivapi/js";

const xiv = new XIVAPI();

var trials = await xiv.data.get("ContentType", 4)
  .then(res => res.GameContentLinks.ContentFinderCondition.ContentType)
  .then(data => { return data.sort((a, b) => a - b) });

var trialdata = [];

for (const trial of trials.slice(3,10)){
  trialdata.push(await xiv.data.get("ContentFinderCondition", trial));
}

const out = JSON.stringify({trialdata})

trialdata.filter(filter_high_end).forEach(data => {
  console.log(`Trial: ${data.Name} | Item Level: ${data.ItemLevelRequired} | Roulette Duty: ${!!data.TrialRoulette} | Expansion ID: ${data.GamePatch.ExVersion}`);
});

/**
 * Filter out trial entries based on their appearance in roulettes.
 * High-end trials are excluded from the Trials roulette in addition to the first three, which are in the levelling roulette.
 */
function filter_high_end(data){
  return data.ItemLevelRequired > 0 && !!data.TrialRoulette == false;
}

//xiv.data.get("ContentFinderCondition", 56).then(res => console.log(res))
//xiv.data.get("InstanceContent", 20001).then(res => console.log(res))