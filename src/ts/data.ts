import * as constants from "./constants";

const reward_img_glob = import.meta.globEager("@/assets/img/icon/reward_*.png");
function getRewardImg(reward: string) {
  return reward_img_glob[`../assets/img/icon/reward_${reward}.png`].default;
}

const duty_img_glob = import.meta.globEager(
  "@/assets/img/icon/duty_raid_*.png"
);
function getObjectiveImg(duty: string) {
  return duty_img_glob[`../assets/img/icon/duty_raid_${duty}.png`].default;
}

const duty_data_glob = import.meta.globEager("@/assets/data/data_*.json");
/**
 * Retrieves data for an expansion given by its major patch number.
 * For example, ARR data is 2, Endwalker is 6. Any value outside the range of current expansions returns null.
 * @param exp - Expansion data
 */
function getExpansionData(exp: number) {
  if (!constants.expansions.includes(exp)) {
    return null;
  }
  return duty_data_glob[`../assets/data/data_${exp}.json`].default;
}

export { getRewardImg, getObjectiveImg, getExpansionData };
