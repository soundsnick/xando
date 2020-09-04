import { HTMLAttributes } from 'react';
import { DataItem } from '../../types/DataItem';

export type Props = Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  readonly onChange: (newData: ReadonlyArray<DataItem>) => void;
};
