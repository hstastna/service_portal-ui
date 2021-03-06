import React from 'react';
import { Button, Title } from '@patternfly/react-core';
import { Main } from '@red-hat-insights/insights-frontend-components';

const PlatformDashboard = () =>(
  <Main>
    <div style={ { textAlign: 'center' } }>
      <Title size="md">
        Search Or Select a Platform
      </Title>
    </div>
    <div style={ { textAlign: 'center' } }>
      <Button variant="secondary" type="button">Take Action</Button>
    </div>
  </Main>
);

export default PlatformDashboard;

