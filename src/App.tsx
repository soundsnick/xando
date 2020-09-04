/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { Table } from './components/Table';
import { DataItem } from './types/DataItem';
import { Players } from './types/Players';
import { DataItemTypes } from './types/DataItemTypes';
import { Container } from './components/Container';
import { Retry } from './components/Retry';

function App() {
  const [data, setData] = useState<ReadonlyArray<DataItem>>(
    Array.from(Array(9), (n, i) => ({ cellId: i, owner: Players.Empty, value: DataItemTypes.Empty }))
  );

  return (
    <div className="App" css={{ display: 'flex', height: '100%' }}>
      <Container>
        <Table onChange={setData} data={data} />
        <Retry css={{ marginTop: 10 }} onChange={setData} />
      </Container>
    </div>
  );
}

export default App;
