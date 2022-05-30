export type GameData = {
  expansions: Array<Expansion>;
};

export type Expansion = {
  name: string;
  image: string;
  id: string | number;
  bgimg?: string;
  collections: Array<Collection>;
};

export type Collection = {
  title: string;
  dutyType: string;
  duties: Array<Duty> | Array<RaidSet>;
};

export interface RaidSet {
  raidset: string;
  raids: Array<Duty>;
}

export interface Duty {
  name: string;
  id: number;
  type: string;
  image: string;
  objectives: Array<{ name: string; completed: boolean }>;
}

export enum Objective {
  NORMAL = "normal",
  SAVAGE = "savage",
  ROLL = "orchestrion roll",
  MOUNT = "mount",
  MINION = "minion",
  CARD = "triple triad card",
  ACHEIVEMENT = "achievement"
}
