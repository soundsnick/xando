/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FC, MouseEvent as MouseEventReact } from 'react';
import { Props } from './props';
import { DataItemTypes } from '../../types/DataItemTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { DataItem } from '../../types/DataItem';
import { Players } from '../../types/Players';
import styled from '@emotion/styled';

const CellBase: FC<Props> = ({ cellId, owner, value, onChange, active: _a, ...rest }: Props) => {
  const updateCell = (event: MouseEventReact<HTMLDivElement, MouseEvent>): void => {
    const newData: DataItem = {
      cellId,
      owner: Players.Player,
      value: DataItemTypes.Cross
    }
    onChange ? onChange(newData) : void 0;
  };

  const content = value !== DataItemTypes.Empty ? <FontAwesomeIcon className="animated bounceIn" css={{ fontSize: 100 }} icon={value === DataItemTypes.Cross ? faTimesCircle : faCircle} /> : null;

  return (
    <div onClick={updateCell} {...rest}>
      {content}
    </div>
  );
};

export const Cell = styled(CellBase)<Props>`
  ${({ active, owner }) => css`
    background: ${active ? (typeof active === "string" ? '#FFC107' : (owner === Players.Computer ? '#ff6e63' : '#72f963')) : 'rgba(0, 0, 0, .2)'};
    color: ${active ? '#fff' : (owner === Players.Computer ? '#ff6e63' : '#72f963')};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: box-shadow 0.2s;
    ${!active && css`
      &:hover {
        box-shadow: inset 0 0 65px #263177;
      }
      &:active {
        box-shadow: inset 0 0 0px 13px #12183a, inset 0 0 65px #263177;
      }
    `}
    &::after {
    content: '';
    display: block;
    padding-top: 100%;
    }
  `
  }
`;
