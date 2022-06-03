import { defineStore } from "pinia";
import { type UserData, type Duty, RewardType } from "../types";

export const useStore = defineStore("dutyStore", {
  state: () => ({
    duties: [] as UserData
  }),
  getters: {
    getDuty: (state) => {
      return (id: number) => state.duties.find((duty) => duty.id == id);
    },
    isObjectiveComplete() {
      return (duty: Duty, name: string) => {
        return this.getDuty(duty.id)?.objectives.find((o) => o.name == name)
          ?.completed;
      };
    },
    areObjectivesComplete() {
      return (duty: Duty, ...names: Array<string>) => {
        return names.every((name) => {
          return this.isObjectiveComplete(duty, name);
        });
      };
    },
    isRewardCollected() {
      return (duty: Duty, rew: RewardType) => {
        return this.getDuty(duty.id)?.rewards.find(
          (r) => r.item == rew.item && r.name == rew.name
        )?.collected;
      };
    }
  },
  actions: {
    markDone(duty: Duty, obj: string) {
      const index: number = this.duties.findIndex((d) => d.id == duty.id);
      if (index == -1) {
        // Not in index, create a new one
        this.duties.push({
          id: duty.id,
          type: duty.type,
          objectives: [{ name: obj, completed: true }],
          rewards: duty.rewards
        });
      } else {
        const objIndex = this.duties[index].objectives.findIndex(
          (o) => o.name == obj
        );
        if (objIndex == -1) {
          this.duties[index].objectives.push({ name: obj, completed: true });
        } else
          this.duties[index].objectives[objIndex].completed =
            !this.duties[index].objectives[objIndex].completed;
      }
    },
    markCollected(duty: Duty, rew: RewardType) {
      const index: number = this.duties.findIndex((d) => d.id == duty.id);
      if (index == -1) {
        // Not in index, create a new one
        this.duties.push({
          id: duty.id,
          type: duty.type,
          rewards: [newReward(rew)],
          objectives: duty.objectives
        });
      } else {
        const rewIndex = this.duties[index].rewards.findIndex((r) => {
          return r.item == rew.item && r.name == rew.name;
        });
        if (rewIndex == -1) {
          this.duties[index].rewards.push(newReward(rew));
        } else
          this.duties[index].rewards[rewIndex].collected =
            !this.duties[index].rewards[rewIndex].collected;
      }
    }
  }
});

function newReward(reward: RewardType): RewardType {
  return {
    name: reward.name,
    collected: true,
    objective: reward?.objective,
    item: reward.item
  };
}
