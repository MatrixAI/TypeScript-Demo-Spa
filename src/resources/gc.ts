type GCIndex = {
  module: string;
  state: string;
  identifiers: Array<string>;
};

type GCCount = {
  references: number;
  delete: Function;
};

export type {
  GCIndex,
  GCCount
};
