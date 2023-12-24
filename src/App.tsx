import React, { useState } from 'react';
import { sub } from 'date-fns';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import {
  JourneyTable,
  Header,
  JourneyModalDialog,
  AccessDeniedModalDialog,
  AuthModalDialog,
  StatisticsPanel,
} from './components';

import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [isAccessDenied, setIsAccessDenied] = useState<boolean>(false);
  const [isOpenJourneyModal, setIsOpenJourneyModal] = useState<boolean>(false);
  const today = new Date();
  const startCycleDate = sub(today, { years: 1 });
  const availableDays = 240;

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
          </Box>
          <StatisticsPanel
            today={today}
            startCycleDate={startCycleDate}
            availableDays={availableDays}
          />
          <JourneyTable />
          <div key="modals">
            <JourneyModalDialog
              isOpen={isOpenJourneyModal}
              onCancel={setIsOpenJourneyModal.bind(null, false)}
              onSubmit={setIsOpenJourneyModal.bind(null, false)}
            />
            <AuthModalDialog
              isOpen={isAuth}
              onCancel={() => {
                setIsAuth(false);
                setIsAccessDenied(true);
              }}
              onSubmit={setIsAuth.bind(null, false)}
            />
            <AccessDeniedModalDialog isOpen={isAccessDenied} />
          </div>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
