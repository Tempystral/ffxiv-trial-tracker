import { defineStore } from "pinia";
import { Duty, Objective } from "../types";

export const useStore = defineStore("dutyStore", {
  state: () => ({
    duties: [] as Array<Pick<Duty, "id" | "type" | "objectives">>
  }),
  getters: {
    getDuty: (state) => {
      return (id: number) => state.duties.find((duty) => duty.id == id);
    },
    isObjectiveComplete() {
      return (duty: Duty, name: string) => {
        return this.getDuty(duty.id)?.objectives.find((o) => o.name, name)
          ?.completed;
      };
    }
  },
  actions: {
    isDone(duty: Duty, obj: Objective, state: boolean) {
      const index: number = this.duties.findIndex((d) => d.id == duty.id);
      if (index == -1) {
        // Not in index, create a new one
        this.duties.push({
          id: duty.id,
          type: duty.type,
          objectives: [{ name: obj, completed: state }]
        });
      } else {
        const objIndex = this.duties[index].objectives.findIndex(
          (o) => o.name == obj
        );
        if (index == -1) {
          this.duties[index].objectives.push({ name: obj, completed: state });
        } else this.duties[index].objectives[objIndex].completed = state;
      }
    }
  }
});
