type Async<D, I = any, E = Error> =
  | undefined
  | null
  | Readonly<{ type: 'Progress'; id?: I }>
  | Readonly<{ type: 'Success'; id?: I; data: D }>
  | Readonly<{ type: 'Fail'; id?: I; error: E }>;

type PageId = string;

export type {
  Async,
  PageId
}
