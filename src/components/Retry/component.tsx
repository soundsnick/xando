import React, { FC, MouseEvent as MouseEventReact } from 'react';
import { Props } from './props';
import styled from '@emotion/styled';
import { Players } from '../../types/Players';
import { DataItemTypes } from '../../types/DataItemTypes';

const RetryBase: FC<Props> = ({ onChange, onClick: _a, ...rest }: Props) => {
  const onClick = (event: MouseEventReact<HTMLButtonElement, MouseEvent>): void => {
    onChange ? onChange(
      Array.from(Array(9), (n, i) => ({ cellId: i, owner: Players.Empty, value: DataItemTypes.Empty }))
    ) : void 0;
  }
  return <button onClick={onClick} {...rest}>Restart</button>;
};

export const Retry = styled(RetryBase)<Props>`
  display: block;
  width: 100%;
  color: #fff;
  background: #222d6b;
  padding: 10px 30px;
  font-size: 16px;
  border: none;
  box-shadow: 0 3px 0 #151c42;
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.1s, transform 0.1s;
  &:active {
    box-shadow: 0 0 0 #151c42;
    transform: translateY(3px);
  }
`;
