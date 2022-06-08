import { defineStore } from "pinia";
import { getLocalForageSafe } from "../ts/util";

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
          return d.name === str;
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
    },
    loadState() {
      getLocalForageSafe("preferences").then((res) => {
        if (res.success == true) {
          const data = res.value as {
            details: Array<DetailState>;
            spoilermode: boolean;
            firstVisit: boolean;
          };
          this.details = data.details;
          this.spoilermode = data.spoilermode;
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
  open: boolean;
};
