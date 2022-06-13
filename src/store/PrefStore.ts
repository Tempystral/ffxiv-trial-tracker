import { defineStore } from "pinia";
import { getLocalForageSafe } from "../ts/util";

export const usePrefStore = defineStore("prefStore", {
  state: () => ({
    details: [] as Array<DetailState>,
    spoilermode: true,
    spoiledDuties: [] as Array<SpoilerState>,
    firstVisit: true
  }),
  getters: {
    isOpen: (state) => {
      return (str: string) => {
        const isopen = state.details.find((d) => {
          return d.name === str;
        })?.open;
        // If there's no existing data, check whether spoiler mode is on and use that preference
        if (isopen === undefined) return !state.spoilermode;
        else return isopen; // Otherwise return the data
      };
    },
    isRevealed: (state) => {
      return (str: string) => {
        const isShown = state.spoiledDuties.find((d) => {
          return d.name === str;
        })?.spoiled;
        // If there's no existing data, check whether spoiler mode is on and use that preference
        if (isShown === undefined) return !state.spoilermode;
        else return isShown; // Otherwise return the data
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
    },
    spoil(str: string) {
      const index: number = this.spoiledDuties.findIndex((d) => {
        return d.name === str;
      });
      if (index === -1) this.spoiledDuties.push({ name: str, spoiled: true });
      else this.spoiledDuties[index].spoiled = true;
    },
    loadState() {
      getLocalForageSafe("preferences").then((res) => {
        if (res.success == true) {
          const data = res.value as {
            details: Array<DetailState>;
            spoilermode: boolean;
            spoiledDuties: Array<SpoilerState>;
            firstVisit: boolean;
          };
          this.details = data.details;
          this.spoilermode = data.spoilermode;
          this.spoiledDuties = data.spoiledDuties;
          this.firstVisit = data.firstVisit;
        } else {
          console.log(res.error);
        }
      });
    }
  }
});

type DetailState = {
  name: string;
  open: boolean;
};
type SpoilerState = {
  name: string;
  spoiled: boolean;
};
