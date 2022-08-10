export type GameData = {
  expansions: Array<ExpansionType>;
};

export type ExpansionType = {
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
  objectives: Array<ObjectiveType>;
  rewards: Array<RewardType>;
}

export type ObjectiveType = { name: string; completed: boolean };
export type RewardType = {
  name: string;
  item: string;
  collected: boolean;
  objective: Objective;
};

export enum Objective {
  NORMAL = "normal",
  SAVAGE = "savage"
}

export enum Reward {
  FADEDROLL = "fadedroll",
  ROLL = "orchroll",
  MOUNT = "mount",
  MINION = "minion",
  CARD = "ttcard",
  ACHEIVEMENT = "achievement",
  HAIRSTYLE = "hairstyle"
}

export type UserData = Array<
  Pick<Duty, "id" | "type" | "objectives" | "rewards">
>;
