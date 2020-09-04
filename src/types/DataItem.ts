import { Players } from './Players';
import { DataItemTypes } from "./DataItemTypes";

export type DataItem = {
  readonly cellId: number;
  readonly owner: Players;
  readonly value: DataItemTypes;
  readonly active?: boolean | string;
}
