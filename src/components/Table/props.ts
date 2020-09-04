import { DataItem } from "../../types/DataItem";
import { HTMLAttributes } from 'react';

export type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & {
  readonly data: ReadonlyArray<DataItem>;
  readonly onChange?: (newData: ReadonlyArray<DataItem>) => void
};
