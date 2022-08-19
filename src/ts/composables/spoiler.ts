import { Duty } from "../../types";

export const useSpoilers = (prefs: any, duty: Duty) => {
  const spoil = () => {
    prefs.spoil(duty.name);
  };

  const isRevealed = () => {
    return prefs.isRevealed(duty.name);
  };

  return { spoil, isRevealed };
};
