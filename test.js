import XIVAPI from "@xivapi/js";
import fs from "fs";
import { createCollection, expansion, isAllianceRaid, isHighEndDuty, isNormalRaid } from "./util.js";
const xiv = new XIVAPI();

/**
 * Retrieve data from XIVAPI about a given duty type.
 * @param {int} contentType 
 * @returns 
 */
async function getDutyIndices(contentType){
  var out = await xiv.data.get("ContentType", contentType)
    .then(res => res.GameContentLinks.ContentFinderCondition.ContentType)
    .then(data => { return data.sort((a, b) => a - b) });
  return out;
}

async function assembleDutyList(indices){
  var dutyData = [];
  for (var i=0; i<indices.length; i++){
    dutyData.push(await xiv.data.get("ContentFinderCondition", indices[i]));
    console.log(`${i/indices.length*100}%`);
    setTimeout(() => {}, 200);
  }
  return dutyData;
}

const contentType = {
  "trial": 4,
  "raid": 5
}

const main = async function(){
  let exp = process.argv[2];
  let ctype = process.argv[3];

  let output = {
    expansion: {
      name: expansion.get(exp),
      id: exp,
      collections: []
    }
    
  };
  
  console.log(`Gathering ${ctype} data...`);
  var indices = await getDutyIndices(contentType[ctype]);
  var duty_data = await assembleDutyList(indices);

  if (ctype == "trial"){
    var duty_collection = createCollection(duty_data.filter(isHighEndDuty),"High-End Trials", "trial", exp)
    output.expansion.collections.push(duty_collection);
  }
  else if (ctype == "raid"){
    var raid_collection = createCollection(duty_data.filter(isNormalRaid), "Raids", "raid", exp)
    var alliance_raids = createCollection(duty_data.filter(isAllianceRaid), "Alliance Raids", "allianceraid", exp)
    output.expansion.collections.push(raid_collection);
    output.expansion.collections.push(alliance_raids);
  }

  fs.writeFile("./data/test.json", JSON.stringify(output), err => {if (err) console.error(err);});
}();

// console.log("Gathering trial data...")
// var trial_indices = await getDutyIndices(4);
// var trial_data = await assembleDutyList(trial_indices);

// var trial_collection = createCollection(trial_data.filter(isHighEndDuty),"High-End Trials", "trial", 0)
// output.collections.push(trial_collection);


// console.log("Gathering raid data...")
// var raid_indices = await getDutyIndices(5);
// var raid_data = await assembleDutyList(raid_indices);

// var raid_collection = createCollection(raid_data.filter(isNormalRaid), "The Coils of Bahamut", "raid", 0)
// var alliance_raids = createCollection(raid_data.filter(isAllianceRaid), "The Crystal Tower", "allianceraid", 0)
// output.collections.push(raid_collection);
// output.collections.push(alliance_raids);


