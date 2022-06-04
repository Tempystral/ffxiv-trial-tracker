import localforage from "localforage";
import { Reward, type RewardType, type UserData } from "../types";

type Result =
  | { success: true; value: unknown }
  | { success: false; error: Error };

async function getLocalForageSafe(key: string): Promise<Result> {
  const item = await localforage.getItem(key);

  if (item === null) {
    // The item does not exist, thus return an error result
    return {
      success: false,
      error: new Error(`Item with key "${key}" does not exist`)
    };
  }

  let res: unknown;

  try {
    res = JSON.parse(item as string);
  } catch (error) {
    return {
      success: false,
      error: error as Error
    };
  }
  return {
    success: true,
    value: res
  };
}

const isUserData = (obj: unknown): obj is UserData => {
  return (
    Array.isArray(obj) &&
    obj.every((element) => {
      return (
        typeof element === "object" &&
        element.id !== undefined &&
        element.type !== undefined &&
        element.objectives !== undefined
      );
    })
  );
};

function getFullRewardName(reward: RewardType): string {
  let ret = "";

  switch (reward.name) {
    case Reward.ROLL:
      ret = `${reward.item} Orchestrion Roll`;
      break;
    case Reward.FADEDROLL:
      ret = `Faded Copy of ${reward.item}`;
      break;
    case Reward.CARD:
      ret = `${reward.item} Card`;
      break;
    default:
      ret = reward.item;
      break;
  }
  return ret;
}

function getRewardImg(reward: string) {
  const reward_img_glob = import.meta.globEager(
    "@/assets/img/icon/reward_*.png"
  );
  return reward_img_glob[`../assets/img/icon/reward_${reward}.png`].default;
}

export { isUserData, getFullRewardName, getLocalForageSafe, getRewardImg };
