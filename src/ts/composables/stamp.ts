import { ref } from "vue";
import { Duty, Objective } from "../../types";

export function useStamp(store: any) {
  const elemToStamp = ref("");

  function stamp(obj: Duty) {
    if (store.isObjectiveComplete(obj, Objective.NORMAL)) {
      elemToStamp.value = obj.name;
      setTimeout(() => {
        elemToStamp.value = "";
      }, 500);
    }
  }

  const isStamped = (str: string) => {
    return elemToStamp.value === str;
  };
  return { elemToStamp, stamp, isStamped };
}
