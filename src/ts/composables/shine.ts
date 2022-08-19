import { ref } from "vue";

export function useShine(time?: number) {
  const elemToShine = ref("");

  const shimmer = (obj: string) => {
    elemToShine.value = obj;
    setTimeout(() => {
      elemToShine.value = "";
    }, time || 500);
  };

  const isShining = (str: string) => {
    return elemToShine.value === str;
  };
  return { elemToShine, shimmer, isShining };
}
