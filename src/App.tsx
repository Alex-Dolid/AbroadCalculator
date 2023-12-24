import React, { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { JourneyTable, Header, JourneyModalDialog } from './components';

import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isOpenJourneyModal, setIsOpenJourneyModal] = useState<boolean>(false);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              Journeys
            </Typography>
            <Button
              color="primary"
              startDecorator={<AddCircleOutlineIcon />}
              size="sm"
              onClick={setIsOpenJourneyModal.bind(null, true)}
            >
              Add new journey
            </Button>
            <JourneyModalDialog
              isOpen={isOpenJourneyModal}
              onClose={setIsOpenJourneyModal.bind(null, false)}
              onSubmit={setIsOpenJourneyModal.bind(null, false)}
            />
          </Box>
          <JourneyTable />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
