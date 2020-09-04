import React, { FC, useCallback } from 'react';
import { Props } from './props';
import styled from '@emotion/styled';
import { Cell } from '../Cell';
import { DataItem } from '../../types/DataItem';
import { DataItemTypes } from '../../types/DataItemTypes';
import { Players } from '../../types/Players';
import { pipe } from 'fp-ts/pipeable';
import { Combination } from '../../types/Combination';

const TableBase: FC<Props> = ({ data, onChange, ...rest }: Props) => {
  const probabilities: ReadonlyArray<Combination> = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]
  const ifEmpty = (innerData: ReadonlyArray<DataItem>) => innerData.filter(n => n.value === DataItemTypes.Empty).length > 0;

  const ifFinished = (innerData: ReadonlyArray<DataItem>): ReadonlyArray<DataItem> | boolean => {
    const result = probabilities.map(n => {
      const computerChoice = innerData.filter(b => n.includes(b.cellId)).filter(m => m.owner === Players.Computer);
      const playerChoice = innerData.filter(b => n.includes(b.cellId)).filter(m => m.owner === Players.Player);
      if(computerChoice.length === n.length) return computerChoice;
      if(playerChoice.length === n.length) return playerChoice;
      return null;
    }).filter(n => n !== null);
    // @ts-ignore
    return result.length !== 0 ? result[0] : false;
  }

  const updateStep = useCallback(
    (newCell: DataItem, innerData: ReadonlyArray<DataItem>) => {
      if(ifEmpty(innerData)) {
        const newData = innerData.map(n =>
          (n.cellId === newCell.cellId) ? newCell : n
        );

        if(!ifFinished(newData) && newData.filter(n => n.value === DataItemTypes.Empty).length === 0){
          onChange ? onChange(newData.map(m => ({ cellId: m.cellId, owner: m.owner, value: m.value, active: "Mercy" }))) : void 0;
        } else {
          onChange ? onChange(newData) : void 0;
        }
        return newData;
      }
      else return innerData;
    }, [onChange]);

  const computerStep = useCallback(
    (innerData): void => {
      const randomNumber = Math.floor(Math.random() * 10)%9;
      const step = innerData[randomNumber];

      if (step.value === DataItemTypes.Empty) {
        updateStep({
          cellId: step.cellId,
          owner: Players.Computer,
          value: DataItemTypes.Zero
        }, innerData);
      } else {
        if(ifEmpty(innerData)) computerStep(innerData);
      }
    }, [updateStep]);

  const playerStep = (newCell: DataItem): void => {
    if(!ifFinished(data)) {
      data.filter(n => n.cellId === newCell.cellId)[0].value === DataItemTypes.Empty ? pipe(
        newCell,
        () => updateStep(newCell, data),
        (newData) => {
          const isFinished = newData ? ifFinished(newData) : false;
          if (isFinished && typeof isFinished !== "boolean") {
            pipe(
              isFinished,
              () => updateStep({...isFinished[0], active: true}, newData),
              (updateData) => updateStep({...isFinished[1], active: true}, updateData),
              (updateData) => updateStep({...isFinished[2], active: true}, updateData)
            )
          } else pipe(newData, () => computerStep(newData), () => newData)
        }
      ) : void 0;
    }else void 0
  }

  return (
    <div {...rest}>
      {data.map((n, i) => <Cell onChange={playerStep} key={i} cellId={n.cellId} owner={n.owner} value={n.value} active={n.active} />)}
    </div>
  );
};

export const Table = styled(TableBase)`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  gap: 2px;
  background: #222d6b;
  border: 2px solid #222d6b;
  &::before {
    content: "X and O";
    position: absolute;
    top: 0;
    font-size: 20px;
    background: #222d6b;
    transform: translateY(calc(-100% - 2px));
    color: #fff;
    padding: 10px 20px;
    box-shadow: 0px 0px 0px 2px #222d6b;
    left: 0;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
  }
`;
