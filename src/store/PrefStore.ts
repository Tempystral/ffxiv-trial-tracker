import { defineStore } from "pinia";

export const usePrefStore = defineStore("prefStore", {
  state: () => ({
    details: [] as Array<DetailState>,
    spoilermode: true,
    firstVisit: true
  }),
  getters: {
    isOpen: (state) => {
      return (str: string) => {
        const isopen = state.details.find((d) => {
          d.name === str;
        })?.open;
        // If there's no existing data, check whether spoiler mode is on and use that preference
        if (isopen === undefined) return !state.spoilermode;
        else return isopen; // Otherwise return the data
      };
    }
  },
  actions: {
    setDetailState(str: string, state: boolean) {
      const index: number = this.details.findIndex((d) => {
        return d.name === str;
      });
      if (index === -1) this.details.push({ name: str, open: state });
      else this.details[index].open = state;
    }
  }
});

type DetailState = {
  name: string;
  open: boolean;
};
type SpoilerState = {
  name: string;
  open: boolean;
};
