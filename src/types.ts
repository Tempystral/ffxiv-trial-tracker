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
  raids: Array<Raid>;
}

export interface Duty {
  name: string;
  id: number;
  image: string;
}

export interface Raid extends Duty {
  completed: boolean;
  savageCompleted?: boolean;
}

export interface Trial extends Duty {
  completed: boolean;
}
