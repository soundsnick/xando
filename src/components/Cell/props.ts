import { HTMLAttributes } from 'react';
import { DataItem } from '../../types/DataItem';

export type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'active'> & DataItem & {
  readonly onChange?: (newData: DataItem) => void
};
